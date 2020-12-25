### draw-image-editor

##### describe

    1.基于vue+fabric开发的canvas图片编辑，绘图功能。
    2.画布根据传入图片生成自适应宽高，可调节最大宽度。
    2.支持多种类型图案绘制
    3.支持调节颜色，画笔粗细。
    3.生成json对象，随时编辑存储，不用每次生成新图，浪费资源。
    4.右侧编辑区可拖动。（支持自定义）

##### preview

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34c636ea0b2b439b8c91182ae2d69eb9~tplv-k3u1fbpfcp-watermark.image)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a881923e908489f8f71a93d83cc40ca~tplv-k3u1fbpfcp-watermark.image)

##### install

---

```
npm i draw-image-editor -S
import FabricCanvas from "draw-image-editor";
import 'draw-image-editor/lib/FabricCanvas.css';
Vue.use(FabricCanvas);

下载卡住失败，请切换下载源到 cnpm 或 npm i draw-image-editor -S --unsafe-perm
```

##### methods

---

```
@name initFabricCanvas(InitFabricCanvas)
@desc 初始化canvas
@usage
    <FabricCanvas @initFabricCanvas="InitFabricCanvas"/>
    methods:{
        InitFabricCanvas(InitFabricCanvas){
            const Object = {
                canvasData : { String| Object} 画布数据
                            String : 初次加载，传入 URL 即可。
                            Object : 编辑时，传入生成的 Object 对象
                  maxWidth : 画布最大宽度
                            default 1000
                        bg : 画布背景颜色
                            default "rgba(0,0,0,0.1)"
            }
            const fabricEl = new InitFabricCanvas(Object) //返回canvas实例对象
            fabricEl {Object}：
                1.fabric文档对象
                2.toCanvasJSON 画笔json对象
                    this.fabricEl.toCanvasJSON()
                3.refreshImageCanvas 切换画布时调用
                    Object : { canvasData, maxWidth, bg}
                    this.fabricEl.refreshImageCanvas(Object)



        }
    }
```

```
@name savesuccess
@desc 保存画布json数据
@usage
    <FabricCanvas  @savesuccess="savesuccess" />
    methods:{
        savesuccess(json){
            ...
        }
    }

```

##### Attributes

---

##### 1. currentType

(注：内置画笔工具栏，需自定义调用时使用)

<html>
@name currentType    <br/>
@desc 自定义画笔 <br/>
@type Object <br/>
</html>

@usage

```
currentType = {
    name,color,size
}
<FabricCanvas :currentType="currentType"/>
```

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| name  | 画笔名称 | String | @name  | arrow  |
| color | 画笔颜色 | String | @color | red    |
| size  | 画笔大小 | String | @size  | normal |

@name

    "square", //矩形
    "circle", //圆形
    "brush", //画笔
    "line", //直线
    "arrow", // 箭头
    "wave", //波浪线
    "text", //文字
    "bomb", // bomb
    "lucencyLine", //透明线
    "bracket", //括号

@color

    "red", "yellow", "blue", "green", "black", 其他色值(例：#000 )

@size

    "small", "normal", "big"
