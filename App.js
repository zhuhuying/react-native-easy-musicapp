/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity,ImageBackground,Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Register from './src/views/registerscreen';
import Login from './src/views/loginscreen';
import Main from './src/views/page/main';



class HomeScreen extends React.Component {
  render() { 
    return (
      <View style={{ flex: 1,alignItems: 'center' }}>
        <ImageBackground style={styles.img} source={require('./src/views/img/1.jpg')}>
        
        </ImageBackground>
        
        {/* <Text style={{fontSize: 24}}>This is music!</Text> */}
        
        <TouchableOpacity
        style={styles.clickButtonStyle}
          onPress={() => {
            this.props.navigation.navigate("Login");}}
        >
        <FontAwesome name='music' size={24} color={'#F84545'} />
        <Text style={styles.text}>
          请登录
        </Text>

        </TouchableOpacity>
        
        <View style={{flexDirection: 'row'}}>
        <Text style={{ fontSize: 14 ,marginLeft: -20,color: '#EF517A' }}
        onPress={()=>{
          this.props.navigation.navigate("Register");
        }}
        >未有账号请注册</Text>
        <Text style={{marginLeft: 30,color: '#EF517A'}}
        onPress={()=>{
          this.props.navigation.navigate("Main")
        }}
        >跳过</Text>
        </View>
      </View>
    );
  }  
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
           img: {
              width: win.width,
              height: win.height-220,
           },
           clickButtonStyle:{
             flexDirection : 'row',
             marginTop : 20,
             marginBottom: 10,
             width: 200,
             alignItems: 'center',
             justifyContent: 'center',
             backgroundColor: '#E6E6FA',
             borderRadius: 15,
             borderWidth: 1,
             borderColor: '#F84545',      
           },
           text:{
              fontSize: 24,
              color: "#FF3333"
           }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
       headerTitle: 'This is music!',
    }
  },
  Login: {
    screen: Login,
    navigationOptions: { // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
       headerTitle: '登录', }//设置导航栏标题
  },
  Register: {
    screen: Register,
    navigationOptions: { // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
       headerTitle: '注册', //设置导航栏标题
      }
    },
  Main:{
    screen: Main ,
    navigationOptions:{
      header: null,
    }
  }

}, {  
    initialRouteName: 'Home',
});


export default createAppContainer(AppNavigator);