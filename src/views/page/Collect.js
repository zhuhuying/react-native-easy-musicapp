import React, {Component} from 'react';
import { View, Text, Button,StyleSheet,Dimensions,TouchableOpacity,FlatList,Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {POST_LIST} from './Api';


export default class Collect extends Component{
    constructor(props){
        super(props);
        this.state={
           songs:'',
           songid:'',
           Uid:''
        };
        }

    componentDidMount= async ()=>{
        await this._retrieveUid();
        await this.fetchcollect();
        
    }
    fetchcollect=()=>{
        const {Uid} = this.state;
        fetch(POST_LIST,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
        body: JSON.stringify({Uid:Uid})
    })
        .then(response => response.json())
        .then(responseData => {
        this.setState({
            songs: responseData,
            songid: responseData.songid
              });
              console.log(responseData)
            })
    }
    _retrieveUid = async () => {   //获取 uid
        try {
            const uid = await AsyncStorage.getItem('@userinfo:uid');
            if (uid !== null) {
            // We have data!!
                console.log('inside', uid);
                this.setState({
                    Uid:uid
                })
            }
        } catch (error) {
            // Error retrieving data
          alert('getItem-uid fail' + error.message);
        }
        return null;
    } 

    render(){
        if(this.state.songid !== ''){
        return(
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
            <View style={styles.container}>
               <Text style={{fontSize: 20}}>收藏列表</Text>
               <TouchableOpacity
               style={styles.container_1}
               onPress={()=>{
                   this.fetchcollect();
               }}
               >
                <AntDesign 
                    name={'reload1'}
                    size={20} 
                /> 
               </TouchableOpacity>     
            </View>
            <View>
              <FlatList 
                data={this.state.songs}
                renderItem={this.rendersong}
                style={styles.list}
                keyExtractor={(item, index )=> index.toString()}   
              />
            </View>
            </View>
              );
            }else {
                return null
            }
        }
        rendersong=({item})=>{
            return (
                <View style={{flex:1,flexDirection: 'row'}}>
                <TouchableOpacity 
                style={styles.container_2}
                onPress={()=>{
                    this.props.navigation.navigate('Musicplayer',
                  {
                      ItemId: item.songid,
                      ItemName: item.songname
                  }
                  )
                    }} 
                >
                <View style={{flexDirection: 'row'}}>
                <Text  style={styles.name} >歌名: {item.songname} </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.delete}
                onPress={()=>{
                    this.props.navigation.navigate('Detail',
                        {
                            ItemId: item.songid,
                            ItemName: item.songname
                        })
                }}
                >
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
        width:win.width-70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
        margin: 5,
        marginTop:35,
        flexDirection: 'row'
    },
    container_1:{
        height: 25,
        width: 60,
        marginLeft: -5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_2:{
        backgroundColor: '#cccccc',
        height: 60,
        width: win.width-40,
        borderColor: '#cccccc',
        borderWidth: 1,
        margin: 4,
    },
    name:{
        fontSize:18,
    },
    delete:{
        width: 30,
        height: 60,
        marginLeft:-4,
        margin:4,
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    }
}) 