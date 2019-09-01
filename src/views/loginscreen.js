import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Button,
    Dimensions,
    ImageBackground,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {POST_LOGIN} from './page/Api'

export default class LoginScene extends Component {
    constructor(props){
    super(props);
    this.state={
        msg:'',
        uid:''
    }
    this.username = null;
    this.userpassword = null;
    }
    /**
     * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
     */
    
     login = () => {
        if (this.username != '' && this.password != '') {
         fetch(POST_LOGIN,{ 
         method: 'POST',
         headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
         body:JSON.stringify({ username: `${this.username}`,userpassword: `${this.password}`,Uid:null })

         }) 
         .then((response) => {
            return response.json();
            })
         .then((jsonData) => {
            this.setState({
              msg: jsonData.msg,
              uid: jsonData.uid
              })
            console.log('123',this.state.msg);
            console.log(typeof this.state.msg)
            if(this.state.msg == 150){
                Alert.alert("用户名不存在")
                console.log('124',this.state.msg);
              }else{
                  if(this.state.msg == 200){
                    Alert.alert("登录成功","到主页面",[{text: '确定', onPress: () => { this.props.navigation.navigate("Main")}}]) //给弹出的提示框添加事件
                    console.log('125',this.state.uid);
                    this._storeUid(jsonData.uid);
                  }else{
                    Alert.alert("密码错误")
                    console.log('126',this.state.msg);
                  }
        }
              })
            .catch((error) => {
             console.warn('456',error);
        }).done();
        }else {
            Alert.alert("用户名或密码不能为空")
        }
    }
    

    /**
     * 注册按钮，点击进入注册界面
     */
    register = () => {
        const { navigate } = this.props.navigation;  //获取navigation的navigate方法
        navigate('Register',);  //跳转到注册过的Register界面
    }

    // 存储uid
    _storeUid = async (uid) => {
        try {
          await AsyncStorage.setItem('@userinfo:uid', uid.toString());
        } catch (error) {
          // Error saving data
          alert('setItem-uid fail' + error.message);
        }
      }; v

    /**
     * 渲染图形界面
     * @return {[type]} [返回所渲染的界面]
     */
    render() {
        return (
                <ImageBackground style={styles.img} source={require('./img/flower.jpg')}>
                <TouchableOpacity  //用可点击的组件作为背景
                    activeOpacity={1.0}  //设置背景被点击时的透明度改变值
                    onPress={this.blurTextInput}  //添加点击事件
                    style={styles.container}>
                    <View
                        style={styles.inputBox}>
                        <FontAwesome name='user' size={40} color={'#CCD2DE'}  style={{justifyContent: 'center'}}/>
                        <TextInput
                            ref="username"  //设置描述
                            onChangeText={(text)=>{
                                this.username=text
                            }}  //添加值改变事件
                            style={styles.input}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            placeholderTextColor={'#EEEEF5'}  //设置占位符颜色
                            placeholder={'请输入用户名'}  //设置占位符
                        />
                    </View>
                    <View
                        style={styles.inputBox}>
                        <FontAwesome name='unlock-alt' size={40} color={'#CCD2DE'} style={{justifyContent: 'center'}} />
                        <TextInput
                            ref="password"  //设置描述
                            onChangeText={(text)=>
                            this.password = text 
                            }  //添加值改变事件
                            style={styles.input}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            secureTextEntry={true}  //设置为密码输入框
                            placeholderTextColor={'#EEEEF5'}  //设置占位符颜色
                            placeholder={'请输入密码'}  //设置占位符
                        />
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.login();
                            }} //添加点击事件
                        style={styles.button}>
                        <Text
                            style={styles.btText}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.register}  //添加点击事件
                        style={styles.button}>
                        <Text
                            style={styles.btText}>注册</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                </ImageBackground>
        );
    }
}


/**
 * 设置界面的布局样式
 * @type {[StyleSheet]}
 */
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    img:{
        width: win.width,
        height: win.height,
        resizeMode:'stretch', 

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 220,
        height: 40,
        fontSize: 18,
        color: '#fff',
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FF3333',
        marginBottom: 6,
    },
    button: {
        height: 50,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#FF3333',  
        marginTop: 20,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
    }
});