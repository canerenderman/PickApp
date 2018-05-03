import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';

import { NavigationToolBarIOS } from 'react-native-navigation';

export default class Alert extends Component{
    constructor(props){
        super(props);
        console.log("this.props.happeningEvents = ", this.props.happeningEvents)
        console.log("this.props.upcomingEvents = ", this.props.upcomingEvents)
    }

    renderUpcomingMinutes(){
        if (this.props.upcomingEvents.length){
            return(
                <View>
                    <Text style={{textAlign: 'center', fontSize: 15}}>in</Text>
                    <Text style={{textAlign: 'center', fontSize: 24}}>{this.props.upcomingEvents[0]}</Text>
                    <Text style={{textAlign: 'center', fontSize: 15}}>minutes</Text>
                </View>
            );
        }
    }

    render(){
        var happeningStr;
        var upcomingStr;
        var happeningCount;
        var upcomingCount;
        var upcomingMinutes;
        var upcomingEventsString;
        if (this.props.upcomingEvents.length){
            if (this.props.upcomingEvents[1] === 1){
                upcomingMinutes = this.props.upcomingEvents[0]
                upcomingEventsString = "event"
            } else {
                upcomingEventsString = "events"
            }
            upcomingCount = this.props.upcomingEvents[1];
            upcomingMinutes = this.props.upcomingEvents[0]
        } else {
            upcomingCount = 0;
            upcomingMinutes = "";
            upcomingEventsString = "upcoming events"
        }
        return(
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.subGymTab, {margin: 5}]}>
                    <Text style={{textAlign: 'center', fontSize: 40, marginTop: 5}}>{this.props.happeningEvents}</Text>
                    <Text style={{textAlign: 'center', fontSize: 15}}>current events</Text>
                </View>
                <View style={[styles.subGymTab, {margin: 5}]}>
                    <Text style={{textAlign: 'center', fontSize: 40, marginTop: 5}}>{upcomingCount}</Text>
                    <Text style={{textAlign: 'center', fontSize: 15}}>{upcomingEventsString}</Text>
                    {this.renderUpcomingMinutes()}
                </View>
            </View>
        );
    }
}
const Dimensions = require('Dimensions');
var _window = Dimensions.get('window');
const styles = StyleSheet.create({
    upcomingEventsContainer: {
        alignSelf: 'flex-start',
        marginTop: 10,
        paddingRight: 2,
        paddingLeft: 2,
    },
    gymContainer: {
        borderRadius: 10,
        padding: 10,
    },
    subGymTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        // height: 100,
        width: 250,
        marginBottom: 20,
        padding: 2,

    },
    image: {
        // flex: 0.3,
        width: 35,
        height: 35,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent:'center',
        opacity: 0.8,
    },
    subGym: {
        backgroundColor: '#f6f6f6',//'#ECECF7',
        opacity: 0.8,
        // borderColor: '#C7CBD1',
        borderWidth: 2,
        // height: 250,
        // width: 320,
        padding: 5,
        margin: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 20,
        // shadowColor: '#808080',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    subGymTab: {
        // backgroundColor: 'blue',
        // height: 120,
        alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: 120,
    },
    subGymTab1: {
        // backgroundColor: 'blue',
        // height: 120,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    availabilityHeader: {
        textAlign: 'left',
        fontSize: 25,
        fontWeight: 'bold',
    },

    availabilityValue: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 40,
    },

    subGymSubHeader: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#E6ECF0',
        // paddingRight:
        // paddingBottom: 2,
        // borderBottomWidth: 1,
        // marginTop: 7

    },
    subGymSubHeader1: {
        // backgroundColor: 'orange',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E6ECF0',
        paddingBottom: 2,
        borderBottomWidth: 1,
        marginTop: 7,
        width: 300,
    },
    buttonCC: {
        // backgroundColor: 'black',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        height: 200,
        width: 175,
        backgroundColor: 'yellow',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerContainer: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    headerText: {
        color: '#14171A',
        textAlign: 'left',
        fontSize: 30,

    },
    marginText: {
        fontSize: 25,
        // color: '#DE8100',//'#14171A',
        textAlign: 'left',
    },

    textStyle: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
    },
    button: {
        width: 230,
        backgroundColor: 'green',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 100,
    },


    subGymHeader: {
        margin: 7,
        // width: 50,
        // backgroundColor: 'purple',
        // shadowColor: '#000',
        //    shadowOffset: { width: 0.4, height: 0 },
        //    shadowOpacity: 0.8,
        //    shadowRadius: 2,
        borderWidth: 0.8,
        borderColor: '#657786',
        borderRadius: 50,
        padding: 8,
    },
    subGymBody: {
        // flex: 1,
        backgroundColor: 'blue',
        margin: 5,
    },

});