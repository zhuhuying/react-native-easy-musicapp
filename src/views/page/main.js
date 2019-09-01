import React, {Component} from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { createBottomTabNavigator,createStackNavigator, createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo'

import Search from './Search';
import Collect from './Collect';
import Myscrene from './Myscene';
import Detail from './Detail';
import Musicplayer from './Musicplayer';
import Mvplayer from './Mvplayer';

 


const bottomTabNavigator = createBottomTabNavigator(
    {
      Search:{ 
        screen: Search,
        navigationOptions:{
          tabBarLabel:"搜索",
        }
      },
     
      Collect:{ 
        screen: Collect,
        navigationOptions:{
          tabBarLabel:"收藏",
        }
      },
      Myscrene:{
        screen:Myscrene,
        navigationOptions:{
          tabBarLabel:"我的",
        }
      },
      
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Search') {
            iconName = 'search';
          }
          if (routeName === 'Collect') {
            iconName = "tag";
          }
          if (routeName === 'Myscrene') {
            iconName = "user";
          }
          
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Feather name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'rgb(4,127,116)',
        inactiveTintColor: 'blue',
      },
    }
  );
   
   
  //创建全局导航器createStackNavigator
  const  AppStack = createStackNavigator({
    bottomTabNavigator:{
      screen : bottomTabNavigator,
      navigationOptions:{
        header :null
      }
    },
  //全局的stack 
    Musicplayer:{
      screen : Musicplayer,
      navigationOptions:{
        header: null
      }
    },
    Mvplayer:{
      screen: Mvplayer,
      navigationOptions:{
        header: null
      }     
    },
     Detail:{
      screen: Detail,
      navigationOptions:{
        headerBackTitle: '详情'
      }

     }
    ,
    initialRouteName:'bottomTabNavigator'
  })
   
   
  const AppStackContainer =  createAppContainer(AppStack);
   
   
   
  export default class Main extends Component{
    render() {
      return (
       <AppStackContainer />
      );
    }
  }
 


     
    
  



