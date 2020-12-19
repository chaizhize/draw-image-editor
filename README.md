<!--
 * @Author: your name
 * @Date: 2020-12-11 15:23:04
 * @LastEditTime: 2020-12-18 17:41:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /draw-image-editor/README.md
-->

### draw-image-editor

##### install

```
npm i draw-image-editor -S
import fabricCanvas from "draw-image-editor";
Vue.use(fabricCanvas);

下载卡住失败，请切换下载源到 cnpm 或 npm i draw-image-editor -S --unsafe-perm
```

##### methods

```
@name initFabricCanvas(InitFabricCanvas)
@desc 初始化canvas
@param Object 默认不传走系统默认值
                id : 画布id
	canvasData : { String| Object} 画布数据
                    String : 初次加载，传入URL即可。
                    Object : 编辑时，传入生成的Object对象
	  maxWidth : 画布最大宽度
	  canvasBg : 画布背景颜色
@usage
    const fabricEl = new InitFabricCanvas(Object)
    返回canvas实例对象
    fabricEl：
        1.fabric文档对象
        2.refreshImageCanvas 切换画布时调用
            Object : { canvasData, maxWidth, bg}
            this.fabricEl.refreshImageCanvas(Object)


```
