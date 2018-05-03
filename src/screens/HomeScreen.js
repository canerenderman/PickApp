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

    pushScreen(screen, props){
        if (screen === "FacilityCalendarPage"){
            this.props.navigator.push({
                screen: 'PickApp.Screens.' + screen,
                title: screen,
                passProps: props,
            });
        } else {
            this.props.navigator.push({
                screen: 'PickApp.Screens.' + screen + "Screen",
                title: screen,
            });
        }

    }

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
        backgroundColor: '#fcfcfc',//'#EFEFFA',
        // flex: 2,
        justifyContent: 'space-between',
        alignItems:'center',
    },

});



module.exports = HomeScreen;