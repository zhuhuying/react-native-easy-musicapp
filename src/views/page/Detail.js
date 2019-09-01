import React, {Component} from 'react';
import { View, Text, Button,StyleSheet,Image ,Dimensions} from 'react-native';
import {GET_SONGDETAAIL} from './Api';



export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            pic: '',
            ar: '',
            al:''
            
        };
    }
    componentDidMount=()=> {
        this.fetchDetail()
    }

    fetchDetail=()=>{
        const { navigation } = this.props;
        let ItemId = navigation.getParam('ItemId');
        console.log(ItemId)
        fetch(GET_SONGDETAAIL+`${ItemId}`)
        .then(response => response.json())
        .then(responseData=>{
            this.setState({
                pic:  responseData.songs[0].al.picUrl,
                ar:  responseData.songs[0].ar[0].name,
                al:  responseData.songs[0].al.name

            })
            
        })
    }
           render(){
               if(this.state.pic !== ''){
               const {pic,ar,al} = this.state;
               const { navigation } = this.props;
               let  ItemName = navigation.getParam('ItemName');
               let ItemId = navigation.getParam('ItemId');
               return(
                   <View style={styles.container}>
                       <Text style={styles.name}>歌名：{ItemName}</Text>
                       <Text style={styles.name} >作者：{ar}</Text>
                       <Text style={styles.name} >专辑名：{al}</Text>
                       <Text style={styles.name} >作品ID：{ItemId}</Text>
                       <Image source={{uri:`${pic}`}} style={styles.pic}/> 
                   </View>
               );
           }else{
               return null
           }
        }

}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    name: {
        flexDirection: 'row',
        fontSize: 20,
        width: win.width-30 ,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor:'#cccccc'
    },
    pic:{
        marginTop: 10,
        marginLeft: 30,
        width:300,
        height: 300,

    }
}) 