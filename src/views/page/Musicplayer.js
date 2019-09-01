import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Video from 'react-native-video';
import ItemId from './Search';
import AntDesign from 'react-native-vector-icons/AntDesign' ;
import AsyncStorage from '@react-native-community/async-storage';
import {GET_SONGURL,GET_SONGLYR,POST_COLLECT} from './Api'

export default class Music extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: "",
            lyr: "",
            lyrArr: [],
            msg: '',
            Uid:''
        };
       
    }
    componentDidMount=()=> {
        this.fetchData(),
        this.fetchlyr(),
        this._retrieveUid()
    }
    
    _retrieveUid = async () => {   //获取 uid 使用AsyncStorage
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

    fetchData = () => {     //获取音乐播放url
        const {navigation} = this.props;
        let ItemId = navigation.getParam('ItemId');
        fetch(GET_SONGURL+`${ItemId}`)
        .then(response => response.json())
        .then(responseData => {
            console.log(" responseData ", responseData);
            console.log(" 类型", typeof responseData);
            if(responseData.code == 200){
            this.setState({
                    data: responseData.data[0].url
                })
                console.log(' this.state.data',this.state.data)
            }})    
    }
    
    fetchlyr=()=>{      //获取歌词
        const {navigation} = this.props;
        let ItemId = navigation.getParam('ItemId');
        fetch(GET_SONGLYR+`${ItemId}`)
        .then(response => response.json())
        .then(responselyr => {
            this.setState({
                lyr: responselyr.lrc.lyric,
                lyrArr: responselyr.lrc.lyric.split(/\n/)
            })
        })
    }
    
    collect=()=>{
        const {Uid} = this.state;
        const {navigation} = this.props;
        let ItemId = navigation.getParam('ItemId');
        let ItemName= navigation.getParam('ItemName');
        if(Uid !== ''){
            fetch(POST_COLLECT,{  
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                },
            body: JSON.stringify({ songid: ItemId,songname: ItemName,Uid:Uid,id: null})
                })

        .then((response) => {
            return response.json();
                })
        .then((jsonData) => {
            this.setState({
            msg: jsonData.msg,
                    })
            if(this.state.msg !== 200){
                        Alert.alert("您已收藏")
            }else{
                        Alert.alert("收藏成功")
                    }

        })
        }else{
          Alert.alert("请登录后使用")
        } 
    }
    render() {
        if ( this.state.data !== "" ){
            console.log("render1",this.state.data )
             const{  data,lyr,lyrArr} = this.state;
             const {navigation} = this.props;
             let ItemName= navigation.getParam('ItemName');
             let uid = navigation.getParam('userid');
            return (
                    <View style={styles.container}> 
                    <View style={styles.title}>
                        <TouchableOpacity style={styles.touch}
                         onPress={()=>{
                             this.collect()
                         }}
                        >
                        <Text style={{fontSize: 25}}>{ItemName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scoll1}>
                    <ScrollView  contentContainerStyle={{alignItems:'center',paddingTop: '10%',paddingBottom: '35%'}} 
                    style={styles.scoll}
                    ref={(view)=>{
                        this.myScrollView = view;
                    }}
                    >
                        { 
                          lyrArr.map((v, i) => (
                        <Text key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Text>
                                )) 
                        }
                    </ScrollView>
                    </View>
                    <Video 
                    style={styles.video}
                    repeat={true}
                    hideShutterView={true}
                    controls
                    audioOnly={true}
                    paused={false}
                    volume={1.0}
                    source={{uri: `${data}`}} 
                    /> 
                    {console.log('url',data)}
                    {console.log('URL',data)} 
                    </View>
    
            )
        }else{
            return null
        }
    }
}
    
const win = Dimensions.get('window');   
const styles = StyleSheet.create({
    container: {
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: '#F5FCFF',
                  },
         title:{    
                    flexDirection:'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: win.width-40,
                    height: 40,
                    marginTop: 15,
                    margin: 6
                },
        touch:{
                    width:win.width-40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
      welcome: {
                    fontSize: 30,
                  },
        scoll1: {
                    height:win.height-210,
                  },
        scoll:{
                    width:win.width
                  },
        video:{
               width: win.width-20,
               height: 75,
               marginTop: 45, 
        }
})