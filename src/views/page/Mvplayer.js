import React, {Component} from 'react';
import {View,StyleSheet,Dimensions,Text} from 'react-native';
import Video from 'react-native-video';
import {GET_SONGMV} from './Api';



export default class Music extends Component {
  constructor(Props){
      super(Props);
      this.state={
        mvurl: ""
      }

  }

  componentDidMount=()=>{
      this.fetchmvurl()
  }
  
  fetchmvurl=()=>{
    const {navigation} = this.props;
    let MvId = navigation.getParam('ItemMv');
    fetch(GET_SONGMV+`${MvId}`)  //wifi
    .then(response => response.json())
        .then(responseData => {
          this.setState({
            mvurl: responseData.data.url
           
          });
        });
  } 

    render(){
    if( this.state.mvurl !== ""){
        const { mvurl } = this.state;
        const {navigation} = this.props;
         let ItemName = navigation.getParam('ItemName');
        return(
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
             <View style={{width:300,height:30,justifyContent: 'center',alignItems: 'center'}}>
                 <Text style={{fontSize:24,flexDirection:'row',}}>{ItemName}</Text>
             </View>
              <Video 
                  source={{uri:`${mvurl}`}}
                  style={styles.mv}
                  paused={false}
                  volume={1.0}
                  controls
                  repeat={false}
              />
         </View>
        );
    }else{
        return null
    }}
    
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
       mv:{
           width:win.width,
           height:350,
       },
})