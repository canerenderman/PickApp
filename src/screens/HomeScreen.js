import _ from 'lodash';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import GymContainer from './GymContainer.js';
import FacilityButtonBasketball from './FacilityButtonBasketball.js';
import FacilityButtonPool from './FacilityButtonPool.js';
import FacilityButtonTrack from './FacilityButtonTrack.js';

// import Permissions from 'react-native-permissions';
// import permissions from './permissions';
//import {_alertForLocationPermission} from './permissions';

// const {width} = Dimensions.get('window');
// var { height } = Dimensions.get('window');

// var box_count = 2;
// var box_height = (height-66) / box_count;

// permissions._alertForLocationPermission();

class HomeScreen extends Component {

    constructor(props){
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            // displayDataForm: false,
            // buttonText: 'Click to Enter Data'
            screen: ''
        };
    }

    // static navigatorStyle = {
    //     drawUnderNavBar: true,
    //     navBarTranslucent:true,
    //     navBarNoBorder: true,
    //     navBarTextColor: 'black',
    //     navBarButtonColor: 'black',
    // };

    // onNavigatorEvent(event) {
    //     if (event.type === 'PreviewActionPress') {
    //         if (event.id === 'action-cancel') {
    //             Alert.alert('Cancelled');
    //         }
    //         if (event.id === 'action-delete-sure') {
    //             Alert.alert('Deleted');
    //         }
    //     }
    // }

    // renderDataInputForm(){
    //     if (this.state.displayDataForm){
    //         return(
    //             <View style={styles.container}>
    //                 <View style={styles.form_container}>
    //                     <Text style={styles.header_1}>Click On a Facility To Add People</Text>
    //                     <Text style={styles.header_2}>OMAC</Text>
    //                     <View style={{flexDirection: 'row'}}>
    //                         <FacilityButtonBasketball></FacilityButtonBasketball>
    //                         <FacilityButtonTrack></FacilityButtonTrack>
    //                     </View>
    //                     <Text style={styles.header_2}>NELSON</Text>
    //                     <View style={{flexDirection: 'row'}}>
    //                         <FacilityButtonPool></FacilityButtonPool>
    //                     </View>
    //                 </View>
    //             </View>
    //         );
    //     }
    // }

    // changeDisplayDataForm(){
    //     console.log("YETER UYKU");
    //     this.setState({
    //         displayDataForm: !this.state.displayDataForm,
    //         buttonText: 'Click to Stop Entering Data'
    //     });
    //     if (this.state.displayDataForm){
    //         this.setState({
    //             buttonText: 'Click to Enter Data'
    //         });
    //     }
    // }

    pushScreen(screen, props){
        if (screen === "FacilityCalendarPage"){
            this.props.navigator.push({
                screen: 'PickApp.Screens.' + screen,
                title: 'Calendar',
                passProps: props,
            });
        } else {
            this.props.navigator.push({
                screen: 'PickApp.Screens.' + screen + "Screen",
                title: 'screen',
            });
        }

    }

    // OLD RENDER:
    // <ScrollView contentContainerStyle={styles.contentContainer}>
    //             <TouchableOpacity style={{marginTop: 60}} onPress={()=> this.changeDisplayDataForm()}><Text style={{fontSize: 20}}>{this.state.buttonText}</Text></TouchableOpacity>
    //             {this.renderDataInputForm()}
    //             <GymContainer gymName={'Nelson'} subGymNames={nelsonSubGymNames} subGymClicked={null} displayMainPageHeader={true} hideAll={false} availability={null} changeScreen={() => this.pushScreen()}></GymContainer>
    //             <GymContainer gymName={'OMAC'} subGymNames={omacSubGymNames} subGymClicked={null} displayMainPageHeader={true} hideAll={false} availability={null}></GymContainer>
    //         </ScrollView>

    render(){
        var nelsonSubGymNames = ['Fitness', 'Pool'];
        var omacSubGymNames = ['Basketball', 'Track'];
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <GymContainer gymName={'Nelson'} subGymNames={nelsonSubGymNames} subGymClicked={null} displayMainPageHeader={true} hideAll={false} availability={null} navigator={this.props.navigator} pushScreen={this.pushScreen.bind(this)}></GymContainer>
                <GymContainer gymName={'OMAC'} subGymNames={omacSubGymNames} subGymClicked={null} displayMainPageHeader={true} hideAll={false} availability={null} navigator={this.props.navigator} pushScreen={this.pushScreen.bind(this)}></GymContainer>
            </ScrollView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    image: {
        flex: 0.7,
        width: null,
        height: null,
        resizeMode: 'contain',

    },

    form_container: {
        backgroundColor: 'white',
        borderRadius: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: 310,
        padding: 20,

    },

    header_1: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 10
    },

    header_2: {
        textAlign: 'left',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
    },

    gym_containers: {
        flex:  1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    gym_button: {
        flex: 0.5,
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',

    },

    gym_header: {
        textAlign: 'center',
    },

    sub_gym: {
        width: 60,
        height: 60,
        backgroundColor: 'red',
        margin: 5,
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10

    },

    sub_gym2: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        margin: 5,
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10

    },
    contentContainer: {
        backgroundColor: '#EFEFFA',//'#F8F8F4',
        // flex: 2,
        justifyContent: 'space-between',
        alignItems:'center',
    },

});



module.exports = HomeScreen;