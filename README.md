工具程式
======

放指定圖片到指定目錄下的所有PDF檔案，此工具程式用來放公司章圖片到報價單內

#### 安裝方式
npm i pdf-lib

### 設定方式
指定目錄下有參數檔 cfg.json ，結構如下
{
	"filename":"wa.png",  ## 在指定目錄下的圖片檔名
	"scale":0.9,		   ## 圖片比例
	"x":200,"y":80		   ## x,y座標
}

#### 執行方式
node waPDF.js [指定目錄]
例如
node waPDF.js ./scan
