import React, {Component} from 'react';
import { View, 
    Text,
    Button, 
    StyleSheet, 
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions, 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {GET_SONGLIST } from './Api'


export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            data: [] ,
            mvid: ''
        };
        this.loadData = this.loadData.bind(this);
        this.renderSong = this.renderSong.bind(this);
        
        }
         
    loadData=()=>{  //搜索功能
        fetch(GET_SONGLIST+`${this.value}`)
        .then(response => response.json())
        .then(responseData => {
             // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
          this.setState({
            data: responseData.result.songs,
            isRefresh : false,
          });
        });

    }

    
           render(){
            
               return(
                   <View style={styles.container}>
                   <View style={styles.input_container}>
                   <TextInput 
                       style={styles.input}
                       onChangeText ={text=>{
                           this.value = text;
                       }}

                       />
                       <Button
                           title = '搜索'
                           onPress={()=>{
                               this.loadData();
                               
                           }}
                       />
                   </View> 
                       <FlatList 
                            data={this.state.data}
                            renderItem={this.renderSong}
                            style={styles.list}
                            keyExtractor={(item, index )=> index.toString()} 
                       />
                   </View>
               );
           }
           renderSong({item}){
                    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
                    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
                const {navigation} = this.props;
                let uid = navigation.getParam('userid');
                return (
                   <View style={{flex:1,flexDirection: 'row'}}>
                   <TouchableOpacity 
                   style={styles.container_1}
                   onPress={()=>{
                       this.props.navigation.navigate('Musicplayer',
                     {
                         ItemId: item.id,
                         ItemName: item.name,
                         userid: uid
                     }
                     )
                       }}
                    
                   >
                   <View style={{flexDirection: 'row'}}>
                   <Text  style={styles.name} >歌名: {item.name} </Text>
                   </View>
                   <View style={{flexDirection: 'row'}}>
                   {item.artists.map((artist,name) => (
                       <Text key={name} style={{ fontSize: 13}}>作者：{artist.name}</Text>))}
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity
                   style={styles.container_2}
                   onPress={()=>{
                       this.props.navigation.navigate('Mvplayer',
                       {
                           ItemMv:item.mvid,
                           ItemName:item.name
                       }
                       )
                   }}
                   >
                       {(item.mvid!== 0)?
                            <Foundation
                                name={'play-video'}
                                size={20}
                            />:null
                       }
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.container_3}
                   onPress={()=>{
                        this.props.navigation.navigate('Detail',
                        {
                            ItemId: item.id,
                            ItemName: item.name
                        })
                    }}>
                       <Feather
                         name={'list'}
                         size={20}
                        />
                   </TouchableOpacity>
                   </View>
         
      );

           }
}


const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    input_container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        margin: 8,
    },
    container_1: {
        backgroundColor: '#cccccc',
        height: 60,
        width: win.width-70,
        borderColor: '#cccccc',
        borderWidth: 1,
        margin: 4,
        
    },
    name:{
        fontSize: 15,
    },
    list: {
        backgroundColor: "#F5FCFF"
    },
    container_2:{
        backgroundColor: '#cccccc',
        height: 60,
        width: 30,
        borderColor: '#cccccc',
        borderWidth: 1,
        marginLeft: -4,
        margin:4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_3:{
        backgroundColor: '#cccccc',
        height: 60,
        width: 30,
        borderColor: '#cccccc',
        borderWidth: 1,
        marginLeft: -4,
        margin:4,
        alignItems: 'center',
        justifyContent: 'center',
    }
}) 


