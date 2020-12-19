(function(global) {
	// var fabric = global.fabric || (global.fabric = {}),
	// extend = fabric.util.object.extend,
	var clone = fabric.util.object.clone;
	// coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 },
	// supportsLineDash = fabric.StaticCanvas.supports("setLineDash");
	if (fabric.BracketLine) {
		fabric.warn("fabric.BracketLine is already defined.");

		return;
	}
	fabric.BracketLine = fabric.util.createClass(fabric.Line, {
		type: "BracketLine",

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

			const p = this.calcLinePoints();
			const config = {
				color: this.stroke,
				lineWidth: this.strokeWidth,
				radius: this.radius,
			};
			this.bracketLine(ctx, p.x1, p.y1, p.x2, p.y2, config);
			// this.bracketLine(ctx, this.x1, this.y1, this.x2, this.y2, config);
		},
		bracketLine(ctx, x1, y1, x2, y2, config) {
			let { color = "#E34F51", lineWidth = 3, radius = 10 } = config;
			radius = (y2 - y1) / 5 > radius ? 10 : Math.abs((y2 - y1) / 5);
			var z1 = (y2 - y1 - 4 * radius) / 2; //> 0 ? (y2 - y1 - 4 * radius) / 2 : 0;
			ctx.beginPath();
			ctx.closePath();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.arc(x1, y1 + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
			ctx.stroke();
			if (y2 > y1 + radius) {
				ctx.strokeStyle = color;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.moveTo(x1 + radius, y1 + radius);
				var topLineTo = z1 > 0 ? z1 : 0;
				ctx.lineTo(x1 + radius, y1 + radius + topLineTo);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.arc(
					x1 + 2 * radius,
					y1 + topLineTo + radius,
					radius,
					0.5 * Math.PI,
					1 * Math.PI
				);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.arc(
					x1 + 2 * radius,
					y1 + topLineTo + 3 * radius,
					radius,
					1 * Math.PI,
					1.5 * Math.PI
				);
				ctx.stroke();
				ctx.strokeStyle = color;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.moveTo(x1 + radius, y1 + topLineTo + 3 * radius);
				ctx.lineTo(x1 + radius, y1 + 2 * topLineTo + 3 * radius);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.arc(
					x1,
					y1 + 2 * topLineTo + 3 * radius,
					radius,
					0 * Math.PI,
					0.5 * Math.PI
				);
				ctx.stroke();
			}
		},
	});
	fabric.BracketLine.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(
		"x1 y1 x2 y2".split(" ")
	);
	fabric.BracketLine.fromElement = function(element, callback) {
		var parsedAttributes = fabric.parseAttributes(
			element,
			fabric.BracketLine.ATTRIBUTE_NAMES
		);

		parsedAttributes.left =
			(parsedAttributes.left || 0) - parsedAttributes.rx;
		parsedAttributes.top =
			(parsedAttributes.top || 0) - parsedAttributes.ry;
		callback(new fabric.BracketLine(parsedAttributes));
	};
	/* _FROM_SVG_END_ */

	/**
	 * Returns {@link fabric.BracketLine} instance from an object representation
	 * @static
	 * @memberOf fabric.Ellipse
	 * @param {Object} object Object to create an instance from
	 * @param {function} [callback] invoked with new instance as first argument
	 * @return {fabric.Ellipse}
	 */
	fabric.BracketLine.fromObject = function(object, callback) {
		function _callback(instance) {
			delete instance.points;
			callback && callback(instance);
		}
		var options = clone(object, true);
		options.points = [object.x1, object.y1, object.x2, object.y2];
		fabric.Object._fromObject("BracketLine", options, _callback, "points");
	};
})(typeof exports !== "undefined" ? exports : this);
