# react-native-easy-musicapp
学习react-native后，看到[github](https://github.com)上的[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，尝试着用该Api做一个简易音乐app，音乐搜索，音乐播放等。为添加更多功能，本地搭建一个node服务器，供app登录注册，收藏等功能的实现。

实现功能  
### `1.登录注册`  
基于本地搭建的服务器实现登录注册收藏歌单  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/mainscreen.jpg)  
主页面  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/login.jpg)  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/register.jpg)  
登录注册页面  

### `2.搜索音乐`  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/search.jpg)  
该功能基于[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)接口提供的搜索功能，需保证该Api在本地开启才可使用。  

### `3.收藏歌曲`  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/collect.jpg)  
用户登录后可收藏歌曲至收藏列表中。  

### `4.播放歌曲`  
![image](https://github.com/zhuhuying/my_resource/blob/master/images/musicplayer.jpg)  
点击歌名可收藏该歌曲。 

### 使用到的主要技术栈和依赖第三方库：  

* [react@16.8.3](https://github.com/facebook/react)  
* [react-native@0.59.3](https://github.com/facebook/react-native)  
* [react-native-gesture-handler@1.1.0](https://github.com/kmagiera/react-native-gesture-handler)  
* [react-native-screens@^1.0.0-alpha.22](https://github.com/kmagiera/react-native-screens)  
* [@react-native-community/async-storage](https://github.com/react-native-community/async-storage)  
* [react-native-vector-icons@^6.4.2](https://github.com/oblador/react-native-vector-icons)  
* [react-native-video@^4.4.1](https://github.com/react-native-community/react-native-video)  
* [react-navigation@^3.6.0](https://github.com/react-navigation/react-navigation)  

因为是看到[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)之后，正好学习了[react-native](https://github.com/facebook/react-native)，于是有了这个想法，非常感谢这个Api，不然找音乐资源是个很头疼的事。我学习前端知识并不长，学习[react](https://github.com/facebook/react)，[react-native](https://github.com/facebook/react-native)等框架的时间也不长，这个demo做的的确很粗糙，且简陋，功能并不多，后续希望能够改进，在学习前端的路途上前行。






