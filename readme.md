# 爱看不看 (Bilibili学习监督助手)

一个帮助你专注于学习视频的Chrome扩展程序。当你在哔哩哔哩（bilibili.com）浏览非学习类视频时，它会及时提醒你。

## 欢迎加群交流
![alt text](mmqrcode.png)

## 关于AI的API,配置说明

- 🤖 使用AI自动识别视频是否为学习类内容
使用前需要在`content.js`中配置DeepSeek API：
```
const apiKey = ''; // 在此处填入您的DeepSeek API密钥
```

## 安装方法

1. 下载本项目代码并解压
2. 打开Chrome浏览器，进入扩展程序页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择解压后的项目文件夹

## 使用方法

1. 安装完成后，在Chrome浏览器右上角会出现扩展图标
2. 访问bilibili视频页面时，扩展会自动运行

## 关于这个项目
这个项目是cursor + claude帮忙写的，实际上我只写了PRD