 import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Dimensions,
    ImageBackground
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {POST_REGISTER} from './page/Api';

export default class RegisterScene extends Component {
    constructor(props){
        super(props)
        this.state={
           msg:'',
           confirmPassword : '',  //保存确认密码
     }
        this.Uid = null;
        this.username = null;
        this.userpassword = null;
    }
    onConfirmPasswordChanged = (newConfirmPassword) => {
        console.log(newConfirmPassword);       //运行后可以在输入框随意输入内容并且查看log验证！
        this.confirmPassword = newConfirmPassword;
    }


    /**
     * 注册按钮，根据输入的内容判断注册是否成功
     */
    register = () => {
        if (this.username != '' && this.password != '') {
                if (this.password === this.confirmPassword) {
                    fetch(POST_REGISTER,{ 
                        method: 'POST',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                            body: JSON.stringify({ username: `${this.username}`,userpassword: `${this.password}`,Uid:null })
                         })

                              .then((response) => {
                               return response.json();
                             }).then((jsonData) => {
                                  this.setState({
                                   msg: jsonData.msg,
                                  })
                                  console.log('123',this.state.msg);
                        if(this.state.msg !== 200){
                            Alert.alert("账号已存在")
                            console.log('125',this.state.msg);
                       }else{
                           Alert.alert("注册成功","返回登陆",[{text: '确定', onPress: () => { this.props.navigation.navigate('Login')}}])  //给弹出的提示框添加事件
                       }
                                })
                                .catch((error) => {
                                  console.warn('456',error);
                                }).done();
                       
                } else {
                    Alert.alert("注册失败","密码与确认密码不同");
                }
        } else {
            Alert.alert("注册失败","用户名或密码不能为空");
        }
    };

    /**
     * 渲染图形界面
     * @return {[type]} [返回所渲染的界面]
     */
    render() {
        return (
            <ImageBackground style={styles.img} source={require('./img/flower.jpg')}>
            <TouchableOpacity
                activeOpacity={1.0}  //设置背景被点击时，透明度不变
                onPress={this.blurTextInput}  //添加点击事件
                style={styles.container}>
                <View
                    style={styles.inputBox}>
                    <FontAwesome name='user' size={40} color={'#CCD2DE'}  style={{justifyContent: 'center'}}/>
                    <TextInput
                        ref="username"  //添加描述
                        onChangeText={(text)=>{
                            this.username=text
                        }}  //添加值改变事件
                        style={styles.input}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#EEEEF5'}  //设置占位符颜色
                        placeholder={'4-8位数字字母'}  //设置占位符
                        maxLength = {8}
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <FontAwesome name='unlock-alt' size={40} color={'#CCD2DE'} style={{justifyContent: 'center'}} />
                    <TextInput
                        ref="password" 
                        onChangeText={(text)=>
                        this.password = text 
                        } 
                        style={styles.input}
                        secureTextEntry={true}  
                        autoCapitalize='none'  
                        underlineColorAndroid={'transparent'} 
                        placeholderTextColor={'#EEEEF5'}  
                        placeholder={'4-6位数字字母'}  
                        maxLength = {6}
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <FontAwesome name='unlock-alt' size={40} color={'#CCD2DE'} style={{justifyContent: 'center'}} />
                    <TextInput
                        ref="confirmPassword"  
                        onChangeText={this.onConfirmPasswordChanged}  
                        style={styles.input}
                        secureTextEntry={true}  
                        autoCapitalize='none'  
                        underlineColorAndroid={'transparent'}  
                        placeholderTextColor={'#EEEEF5'}  
                        placeholder={'确认密码'}  
                        maxLength = {6}
                    />
                </View>
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
        backgroundColor: '#19C057',
        marginBottom: 6,
    },
    button: {
        height: 50,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#19C057',
        marginTop: 20,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
    }
});