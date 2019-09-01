import React, {Component} from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {POST_USER} from './Api';


export default class Myscene extends Component {
        constructor(props){
            super(props);
            this.state={
                 username:'',
                 Uid:''
            }
            }

        componentDidMount=async ()=>{
            await this._retrieveUid();
            await this.fetchuser();
                
            }

        fetchuser=()=>{
            const {Uid} = this.state;
            fetch(POST_USER,
            {method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({Uid:Uid})
        })
            .then(response => response.json())
            .then(responseData => {
            console.log('0',responseData)
             this.setState({
                 username: responseData,
             
              });
              console.log('1',)
            })

        }
          _retrieveUid = async () => {
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
        remove = async () => {
               try{
                   await AsyncStorage.removeItem('@userinfo:uid',(err)=>{
                       if(!err){
                       }else{
                           throw err
                       }
                   });
               }
               catch(error){
                alert('removeItem-uid fail' + error.message);
               }
           }
        
    
        render(){ 
            if(this.state.username !== ''){
               return(
                   <View style={styles.container}>
                    <View style={styles.img}></View>
                    <View style={styles.container1}>
                    <Text style={styles.font}>
                    <AntDesign
                        name={'idcard'}
                        size={22}
                        color={'#ff6f6f'}
                    />
                    &emsp;{this.state.Uid==''?"请登录":this.state.Uid}
                    </Text>
                    {this.state.username.map((u,z)=>(
                    <Text key={z} style={styles.font}><AntDesign
                        name={'user'}
                        size={22}
                        color={'#ff6f6f'}/>&emsp;{u.username}</Text>
                    ))}
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                    style={styles.remove}
                    onPress={()=>{
                        this.remove()
                    }}
                    >
                     <Text style={{fontSize: 20}}>退出登录</Text>
                    </TouchableOpacity>
                    </View>
                   </View>
               );
           }else
           {
               return null
           }
        }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    img:{
        height:120,
        width:120,
        marginLeft:20,
        marginTop:20,
        borderRadius:60,
        borderWidth:2,
        borderColor: '#ff6f6f',
        borderStyle:'solid'
    },
    container1:{
        marginLeft:60 ,
        marginTop:20,
    },
    font:{
        fontSize: 18,
        margin:10,
        flexDirection: 'row'
    },
    remove:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#cccccc',
        borderRadius: 20,
        width: 100,
        height: 60,
        marginTop: 10
    }
}) 