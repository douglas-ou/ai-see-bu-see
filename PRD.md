# bilibili监督助手（爱看不看）

## 项目背景
用户在bilibili上只能观看学习类的视频，但用户没有自制力，经常刷到其他视频，导致学习效率低下。

## 项目目标
监督用户打开bilibili，并监督用户观看学习类的视频。

## 项目功能与流程
Chrome插件：
当用户打开bilibili的视频详情页时，先获取视频的标题、视频简介、视频标签。
视频暂停播放

通过AI判断视频是否是学习类的视频，AI使用deepseek的api

如果不是学习的视频，当用户点击播放的时候，插件会弹出提示框，问用户当前的视频是否是学习类的视频：
    用户选择是，（用户撒谎），关掉当前页面。
    用户选择否，继续弹出提示框，提示用户当前的视频不是学习类的视频，是否继续观看。
        如果用户选择是，视频开始播放，并允许用户看三分钟。
        如果用户选择否，关掉当前页面。