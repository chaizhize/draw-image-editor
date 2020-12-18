(function(global) {
	// var fabric = global.fabric || (global.fabric = {}),
	// extend = fabric.util.object.extend,
	var clone = fabric.util.object.clone;
	// coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 },
	// supportsLineDash = fabric.StaticCanvas.supports("setLineDash");
	if (fabric.ArrowLine) {
		fabric.warn("fabric.ArrowLine is already defined.");

		return;
	}
	fabric.ArrowLine = fabric.util.createClass(fabric.Line, {
		type: "ArrowLine",

		initialize(element, options) {
			options || (options = {});
			this.callSuper("initialize", element, options);

			// Set default options
			this.set({
				// hasBorders: false,
				// hasControls: false,
			});
		},

		_render(ctx) {
			// this.callSuper('_render', ctx);
			// ctx.save();
			console.log(
				this.x1,
				this.y1,
				this.x2,
				this.y2,
				this,
				"this.x1, this.y1, this.x2, this.y2"
			);

			const p = this.calcLinePoints();
			const config = {
				color: this.stroke,
				lineWidth: this.strokeWidth,
				radius: this.radius,
			};
			console.log(p.x1, p.y1, p.x2, p.y2, "p.x1, p.y1, p.x2, p.y2");
			this.ArrowLine(ctx, p.x1, p.y1, p.x2, p.y2, config);
		},
		ArrowLine(ctx, startx, starty, endx, endy, config) {
			let { color = "#E34F51", lineWidth = 2 } = config;
			ctx.beginPath();
			const sizes = {
				"2": {
					edgeLen: 20,
					angle: 20,
				},
				"3": {
					edgeLen: 25,
					angle: 25,
				},
				"5": {
					edgeLen: 30,
					angle: 30,
				},
			};
			var CONST = sizes["" + lineWidth];
			let beginPoint = {
					x: startx,
					y: starty,
				},
				stopPoint = {
					x: endx,
					y: endy,
				};
			let polygonVertex = [];
			polygonVertex[0] = beginPoint.x;
			polygonVertex[1] = beginPoint.y;
			polygonVertex[6] = stopPoint.x;
			polygonVertex[7] = stopPoint.y;
			let angle =
				(Math.atan2(
					stopPoint.y - beginPoint.y,
					stopPoint.x - beginPoint.x
				) /
					Math.PI) *
				180;
			polygonVertex[8] =
				stopPoint.x -
				CONST.edgeLen *
					Math.cos((Math.PI / 180) * (angle + CONST.angle));
			polygonVertex[9] =
				stopPoint.y -
				CONST.edgeLen *
					Math.sin((Math.PI / 180) * (angle + CONST.angle));
			polygonVertex[4] =
				stopPoint.x -
				CONST.edgeLen *
					Math.cos((Math.PI / 180) * (angle - CONST.angle));
			polygonVertex[5] =
				stopPoint.y -
				CONST.edgeLen *
					Math.sin((Math.PI / 180) * (angle - CONST.angle));

			let midpoint = {};
			midpoint.x = (polygonVertex[4] + polygonVertex[8]) / 2;
			midpoint.y = (polygonVertex[5] + polygonVertex[9]) / 2;
			polygonVertex[2] = (polygonVertex[4] + midpoint.x) / 2;
			polygonVertex[3] = (polygonVertex[5] + midpoint.y) / 2;
			polygonVertex[10] = (polygonVertex[8] + midpoint.x) / 2;
			polygonVertex[11] = (polygonVertex[9] + midpoint.y) / 2;
			ctx.fillStyle = color;
			ctx.moveTo(polygonVertex[0], polygonVertex[1]);
			ctx.lineTo(polygonVertex[2], polygonVertex[3]);
			ctx.lineTo(polygonVertex[4], polygonVertex[5]);
			ctx.lineTo(polygonVertex[6], polygonVertex[7]);
			ctx.lineTo(polygonVertex[8], polygonVertex[9]);
			ctx.lineTo(polygonVertex[10], polygonVertex[11]);
			ctx.fill();
			ctx.stroke();
		},
	});
	fabric.ArrowLine.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(
		"x1 y1 x2 y2".split(" ")
	);
	fabric.ArrowLine.fromElement = function(element, callback) {
		var parsedAttributes = fabric.parseAttributes(
			element,
			fabric.ArrowLine.ATTRIBUTE_NAMES
		);

		parsedAttributes.left =
			(parsedAttributes.left || 0) - parsedAttributes.rx;
		parsedAttributes.top =
			(parsedAttributes.top || 0) - parsedAttributes.ry;
		callback(new fabric.ArrowLine(parsedAttributes));
	};
	/* _FROM_SVG_END_ */

	/**
	 * Returns {@link fabric.ArrowLine} instance from an object representation
	 * @static
	 * @memberOf fabric.Ellipse
	 * @param {Object} object Object to create an instance from
	 * @param {function} [callback] invoked with new instance as first argument
	 * @return {fabric.Ellipse}
	 */
	fabric.ArrowLine.fromObject = function(object, callback) {
		function _callback(instance) {
			delete instance.points;
			callback && callback(instance);
		}
		var options = clone(object, true);
		options.points = [object.x1, object.y1, object.x2, object.y2];
		fabric.Object._fromObject("ArrowLine", options, _callback, "points");
	};
})(typeof exports !== "undefined" ? exports : this);
