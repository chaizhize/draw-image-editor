(function(global) {
	// var fabric = global.fabric || (global.fabric = {}),
	// extend = fabric.util.object.extend,
	var clone = fabric.util.object.clone;
	// coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 },
	supportsLineDash = fabric.StaticCanvas.supports("setLineDash");
	if (fabric.WaveLine) {
		fabric.warn("fabric.WaveLine is already defined.");

		return;
	}
	fabric.WaveLine = fabric.util.createClass(fabric.Line, {
		type: "WaveLine",

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
			ctx.save();
			const xDiff = this.x2 - this.x1;
			const yDiff = this.y2 - this.y1;
			const angle = Math.atan2(yDiff, xDiff);
			ctx.translate(xDiff / 2, yDiff / 2);
			ctx.rotate(angle);
			ctx.beginPath();
			ctx.closePath();
			ctx.fillStyle = this.stroke;
			ctx.strokeStyle = this.stroke;
			ctx.lineWidth = this.strokeWidth;
			ctx.fill();
			ctx.restore();
			const p = this.calcLinePoints();
			const point = this.pointOnLine(
				this.point(p.x2, p.y2),
				this.point(p.x1, p.y1),
				10
			);
			this.wavy(
				this.point(p.x1, p.y1),
				point,
				this.point(p.x2, p.y2),
				ctx
			);
			ctx.stroke();
		},

		point(x, y) {
			return {
				x,
				y,
			};
		},

		wavy(from, to, endPoint, ctx) {
			let cx = 0,
				cy = 0,
				fx = from.x,
				fy = from.y,
				tx = to.x,
				ty = to.y,
				i = 0,
				step = 4,
				waveOffsetLength = 0,
				ang = Math.atan2(ty - fy, tx - fx),
				distance = Math.sqrt(
					(fx - tx) * (fx - tx) + (fy - ty) * (fy - ty)
				),
				amplitude = -4,
				f = (Math.PI * distance) / 10;

			for (i; i <= distance; i += step) {
				waveOffsetLength = Math.sin((i / distance) * f) * amplitude;
				cx =
					from.x +
					Math.cos(ang) * i +
					Math.cos(ang - Math.PI / 2) * waveOffsetLength;
				cy =
					from.y +
					Math.sin(ang) * i +
					Math.sin(ang - Math.PI / 2) * waveOffsetLength;
				i > 0 ? ctx.lineTo(cx, cy) : ctx.moveTo(cx, cy);
			}
			ctx.lineTo(to.x, to.y);
			// ctx.lineTo(endPoint.x, endPoint.y);
		},

		pointOnLine(point1, point2, dist) {
			const len = Math.sqrt(
				(point2.x - point1.x) * (point2.x - point1.x) +
					(point2.y - point1.y) * (point2.y - point1.y)
			);
			const t = dist / len;
			let x3 = (1 - t) * point1.x + t * point2.x,
				y3 = (1 - t) * point1.y + t * point2.y;

			return new fabric.Point(x3, y3);
		},

		toObject() {
			return fabric.util.object.extend(this.callSuper("toObject"), {
				customProps: this.customProps,
			});
		},
	});
	fabric.WaveLine.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(
		"x1 y1 x2 y2".split(" ")
	);
	fabric.WaveLine.fromElement = function(element, callback) {
		var parsedAttributes = fabric.parseAttributes(
			element,
			fabric.WaveLine.ATTRIBUTE_NAMES
		);

		parsedAttributes.left =
			(parsedAttributes.left || 0) - parsedAttributes.rx;
		parsedAttributes.top =
			(parsedAttributes.top || 0) - parsedAttributes.ry;
		callback(new fabric.WaveLine(parsedAttributes));
	};
	/* _FROM_SVG_END_ */

	/**
	 * Returns {@link fabric.Ellipse} instance from an object representation
	 * @static
	 * @memberOf fabric.Ellipse
	 * @param {Object} object Object to create an instance from
	 * @param {function} [callback] invoked with new instance as first argument
	 * @return {fabric.Ellipse}
	 */
	// fabric.WaveLine.fromObject = function(object, callback) {
	// 	return fabric.WaveLine._fromObject("WaveLine", object, callback);
	// };

	fabric.WaveLine.fromObject = function(object, callback) {
		function _callback(instance) {
			delete instance.points;
			callback && callback(instance);
		}
		var options = clone(object, true);
		options.points = [object.x1, object.y1, object.x2, object.y2];
		fabric.Object._fromObject("WaveLine", options, _callback, "points");
	};
})(typeof exports !== "undefined" ? exports : this);
// const { color = "#E34F51", lineWidth = 3, radius = 10 } = config;
// 		y2 - y1 < 4 * radius && (y2 = y1 + 4 * radius);
// 		var z1 = (y2 - y1 - 4 * radius) / 2;
// 		ctx.beginPath(),
// 			ctx.closePath(),
// 			(ctx.lineWidth = lineWidth),
// 			(ctx.strokeStyle = color),
// 			ctx.arc(x1, y1 + radius, radius, 1.5 * Math.PI, 2 * Math.PI),
// 			ctx.stroke();
// 		(ctx.strokeStyle = color),
// 			(ctx.lineWidth = lineWidth),
// 			ctx.beginPath(),
// 			ctx.moveTo(x1 + radius, y1 + radius),
// 			ctx.lineTo(x1 + radius, y1 + radius + z1),
// 			ctx.stroke(),
// 			ctx.beginPath(),
// 			(ctx.lineWidth = lineWidth),
// 			(ctx.strokeStyle = color),
// 			ctx.arc(
// 				x1 + 2 * radius,
// 				y1 + z1 + radius,
// 				radius,
// 				0.5 * Math.PI,
// 				1 * Math.PI
// 			),
// 			ctx.stroke(),
// 			ctx.beginPath(),
// 			(ctx.lineWidth = lineWidth),
// 			(ctx.strokeStyle = color),
// 			ctx.arc(
// 				x1 + 2 * radius,
// 				y1 + z1 + 3 * radius,
// 				radius,
// 				1 * Math.PI,
// 				1.5 * Math.PI
// 			),
// 			ctx.stroke(),
// 			(ctx.strokeStyle = color),
// 			(ctx.lineWidth = lineWidth),
// 			ctx.beginPath(),
// 			ctx.moveTo(x1 + radius, y1 + z1 + 3 * radius),
// 			ctx.lineTo(x1 + radius, y1 + 2 * z1 + 3 * radius),
// 			ctx.stroke(),
// 			ctx.beginPath(),
// 			(ctx.lineWidth = lineWidth),
// 			(ctx.strokeStyle = color),
// 			ctx.arc(
// 				x1,
// 				y1 + 2 * z1 + 3 * radius,
// 				radius,
// 				0 * Math.PI,
// 				0.5 * Math.PI
// 			),
// 			ctx.stroke();

// if (y2 >= y1) {
// topArc = [1.5 * Math.PI, 2 * Math.PI];
// topArrow = [0.5 * Math.PI, 1 * Math.PI];
// botArrow = [1 * Math.PI, 1.5 * Math.PI];
// botArc = [0 * Math.PI, 0.5 * Math.PI];
// } else {
// topArc = [0 * Math.PI, 0.5 * Math.PI];
// botArc = [1.5 * Math.PI, 2 * Math.PI];
// topArrow = [1 * Math.PI, 1.5 * Math.PI];
// botArrow = [0.5 * Math.PI, 1 * Math.PI];
// }

// radius = (y2 - y1) / radius > radius ? 10 : Math.abs((y2 - y1) / radius);
