/*
 * @Author: your name
 * @Date: 2020-12-16 14:09:19
 * @LastEditTime: 2020-12-18 23:30:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/src/components/fabricCanvas/drawBomb.js
 */
(function(global) {
	// var fabric = global.fabric || (global.fabric = {}),
	// extend = fabric.util.object.extend,
	var clone = fabric.util.object.clone;
	// coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 },
	// supportsLineDash = fabric.StaticCanvas.supports("setLineDash");
	if (fabric.DrawBomb) {
		fabric.warn("fabric.DrawBomb is already defined.");

		return;
	}
	fabric.DrawBomb = fabric.util.createClass(fabric.Line, {
		type: "DrawBomb",

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
			this.DrawBomb(ctx, p.x1, p.y1, p.x2, p.y2, config);
		},
		DrawBomb(ctx, startx, starty, endx, endy, config) {
			let { color = "#E34F51", lineWidth = 3, radius = 3 } = config;
			if (startx > endx) {
				var pointX = startx - Math.abs(startx - endx) / 2;
			} else {
				var pointX = Math.abs(startx - endx) / 2 + startx;
			}
			if (starty > endy) {
				var pointY = starty - Math.abs(starty - endy) / 2;
			} else {
				var pointY = Math.abs(starty - endy) / 2 + starty;
			}
			var lineX = Math.abs(startx - endx) / 2;
			var lineY = Math.abs(starty - endy) / 2;

			ctx.beginPath();
			ctx.closePath();
			ctx.lineWidth = lineWidth;
			ctx.fillStyle = "rgba(0,0,0,0)";
			ctx.strokeStyle = color;
			ctx.ellipse(pointX, pointY, lineX, lineY, 0, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			ctx.fillStyle = "rgba(0,0,0,0)";
			ctx.strokeStyle = color;
			var ellipseX1 = startx + (endx - startx) / 2;
			var ellipseY1 = starty;
			// 第一条竖线
			ctx.moveTo(ellipseX1 + 2, ellipseY1);
			ctx.quadraticCurveTo(
				Math.abs(ellipseX1),
				ellipseY1 - 7,

				ellipseX1 + 2,
				ellipseY1 - 6
			);
			ctx.stroke();
			//第一个圆
			ctx.beginPath();
			ctx.arc(ellipseX1 + 5, ellipseY1 - 6, radius, 0, 2 * Math.PI);
			ctx.stroke();
			// 第一个圆的圆边
			ctx.beginPath();
			ctx.moveTo(ellipseX1 + 2, ellipseY1 - 4);
			ctx.quadraticCurveTo(
				ellipseX1 - 3,
				ellipseY1 - 8,
				ellipseX1 + 3,
				ellipseY1 - 15
			);
			ctx.stroke();
			//承接线
			ctx.beginPath();
			ctx.moveTo(ellipseX1 + 4, ellipseY1 - 13.5);
			ctx.quadraticCurveTo(
				ellipseX1 + 3,
				ellipseY1 - 18,
				ellipseX1 + 10,
				ellipseY1 - 17
			);
			ctx.stroke();
			//第二个圆
			ctx.beginPath();
			ctx.arc(
				Math.abs(ellipseX1 + 11),
				ellipseY1 - 13,
				radius,
				0,
				2 * Math.PI
			);
			ctx.stroke();
			ctx.beginPath();
			//第二个圆角
			ctx.moveTo(Math.abs(ellipseX1 + 8), ellipseY1 - 15);
			ctx.quadraticCurveTo(
				Math.abs(ellipseX1 + 8),
				ellipseY1 - 23,
				Math.abs(ellipseX1 + 16),
				ellipseY1 - 19
			);
			ctx.stroke();
			ctx.beginPath();
			ctx.stroke();
		},
	});
	fabric.DrawBomb.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(
		"x1 y1 x2 y2".split(" ")
	);
	fabric.DrawBomb.fromElement = function(element, callback) {
		var parsedAttributes = fabric.parseAttributes(
			element,
			fabric.DrawBomb.ATTRIBUTE_NAMES
		);

		parsedAttributes.left =
			(parsedAttributes.left || 0) - parsedAttributes.rx;
		parsedAttributes.top =
			(parsedAttributes.top || 0) - parsedAttributes.ry;
		callback(new fabric.DrawBomb(parsedAttributes));
	};
	/* _FROM_SVG_END_ */

	/**
	 * Returns {@link fabric.DrawBomb} instance from an object representation
	 * @static
	 * @memberOf fabric.Ellipse
	 * @param {Object} object Object to create an instance from
	 * @param {function} [callback] invoked with new instance as first argument
	 * @return {fabric.Ellipse}
	 */
	fabric.DrawBomb.fromObject = function(object, callback) {
		function _callback(instance) {
			delete instance.points;
			callback && callback(instance);
		}
		var options = clone(object, true);
		options.points = [object.x1, object.y1, object.x2, object.y2];
		fabric.Object._fromObject("DrawBomb", options, _callback, "points");
	};
})(typeof exports !== "undefined" ? exports : this);
