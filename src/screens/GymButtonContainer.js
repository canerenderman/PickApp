import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';

import FacilityCalendar from './FacilityCalendar.js';
import Alert from './Alert.js';

export default class GymButtonContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            gymName: this.props.gymName,
            subGymClicked: this.props.subGymClicked,
            subGymName: this.props.subGymName,
            changeToSubGym: this.props.changeToSubGym,
            displayMainPageHeader: this.props.displayMainPageHeader,
            hideAllDivs: this.props.hideAllDivs,
            hideAll: this.props.hideAll,
            availability: '',
            users: '',
            openHours: '',
            availability2: '',
            availabilityText: '',
            upcomingEvents: [],
            happeningEvents: [],
        };
        var gymNumber;
        switch (this.state.gymName){
            case 'Nelson':
                gymNumber = 1;
                break;
            case 'OMAC':
                gymNumber = 2;
                break;
        }
        // if (this.state.subGymName.toLowerCase() == 'fitness') {this.setState({subGymName: 'fitness1',});
        this.fetchAvailabilityData(this, 'users/' + gymNumber + '/' + this.state.subGymName.toLowerCase());
        // if (this.state.subGymName.toLowerCase() == 'fitness1') {this.setState({subGymName: 'Fitness',});
        var urlExt;
        if (this.state.subGymName !== "Fitness"){
            if (this.state.subGymName === "Pool"){
                urlExt = this.state.subGymName.toLowerCase();
            } else { urlExt = "basketball"}
            console.log('urlExt ananin amini siktiminin orrrospu cocugu: ',urlExt);
            this.fetchCalendarData(this, urlExt);
        }
        var myThis = this;
        setInterval(function(){ myThis.fetchAvailabilityData(myThis, 'users/' + gymNumber + '/' + myThis.state.subGymName.toLowerCase())}, 2000);

    }

    fetchAvailabilityData(myThis, urlExt){
        fetch('https://pickapp-test.herokuapp.com/api/' + urlExt)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                var avail;
                switch(myJson.availability){
                    case undefined:
                        avail = myJson.count;
                        break;
                    default:
                        avail = myJson.availability
                }
                var value;
                var txt;
                if (myThis.state.subGymName == 'Fitness') {
                    value = Math.round(Number(avail*(100/181))) + "%";
                    txt = 'of Max\nCapacity';
                } else if (myThis.state.subGymName == 'Pool'){
                    value = Math.round(Number(avail/8));
                    txt = 'People per\nLane';
                } else if(myThis.state.subGymName == 'Basketball') {
                    value = Math.round(Number(avail/4));
                    txt = 'People per\nCourt';
                } else if (myThis.state.subGymName == 'Track'){
                    value = Math.round(Number(avail/6));
                    txt = 'People per\nLane';
                }
                if (avail !== 0 && value === 0){ value++; }
                myThis.setState({
                    availability: avail,
                    availability2: value,
                    availabilityText: txt
                });
            });
    }

    fetchCalendarData(myThis, urlExt){
        fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                var closestUpcoming;
                upcomingEventsCount = 0;
                happeningEventsCount = 0;
                var todayStartHour = new Date(new Date(new Date().toISOString().split("T")[0] + "T00:00:00").getTime() + 4 * 60 * 60 * 1000);
                var todayEndHour = new Date(new Date(todayStartHour).getTime() + 24 * 60 * 60 * 1000);
                var i;
                var curr = new Date();
                for (i = 0; i < myJson.length; i++){
                    var firstUpcomingStart = new Date(new Date(myJson[i].split(" - ")[0].substring(0, 19)).getTime() + 4 * 60 * 60 * 1000);
                    if (firstUpcomingStart >= curr && firstUpcomingStart <= todayEndHour){
                        closestUpcoming = firstUpcomingStart;
                        upcomingEventsCount++;
                        break;
                    } else if (firstUpcomingStart >= todayStartHour && firstUpcomingStart <= todayEndHour){
                        happeningEventsCount++
                    }
                }
                if (upcomingEventsCount){
                    var minutesAway;
                    for (var j = i; j < myJson.length; j++){
                        var events = myJson[j].split(" - ")
                        var eventStrStart = events[0].substring(0, 19);
                        var eventDateStart = new Date(new Date(eventStrStart).getTime() + 4 * 60 * 60 * 1000);
                        var eventStrEnd = events[1].substring(0, 19);
                        var eventDateEnd = new Date(new Date(eventStrEnd).getTime() + 4 * 60 * 60 * 1000);
                        var diffFromStart = eventDateStart - curr;
                        if (diffFromStart >= 0 && eventDateStart.getTime() === closestUpcoming.getTime()){
                            closestUpcoming = eventDateStart;
                            upcomingEventsCount++;
                            minutesAway = diffFromStart;
                        } else if (curr >= eventDateStart && curr <= eventDateEnd){
                            happeningEventsCount++;
                        }
                    }
                    myThis.setState({
                        upcomingEvents: [Math.ceil(minutesAway/(60*1000)), upcomingEventsCount],
                        happeningEvents: happeningEventsCount,
                    });
                }
            });
    }

    render(){
        return(
            <View style={styles.subGym}>
                <View style={styles.subGymSubHeader}>
                    <Text style={styles.marginText}>
                        {this.state.subGymName}
                    </Text>
                </View>
                <View style={styles.subGymTabContainer}>
                    <View style={styles.subGymTab}>
                        {/*<Text style={styles.availabilityHeader}>Occupation</Text>*/}
                        <Text style={{fontSize: 25}}># of People</Text>
                        <Text style={styles.availabilityValue}>{this.state.availability}</Text>
                    </View>
                    <View style={styles.subGymTab}>
                        {/*<Text style={styles.availabilityHeader}>Availability</Text>*/}
                        <Text style={{fontSize: 25, textAlign: 'center', marginTop: 2}}>{this.state.availabilityText}</Text>
                        <Text style={styles.availabilityValue}>{this.state.availability2}</Text>
                    </View>
                    <View style={styles.subGymTab}>
                        {/*<Text style={styles.availabilityHeader}>Coming Up</Text>*/}
                        <View style={styles.upcomingEventsContainer}>
                            <Alert count={this.state.upcomingEvents[1]} minutesAway={this.state.upcomingEvents[0]}></Alert>
                            <Alert count={this.state.happeningEvents[1]} minutesAway={null}></Alert>
                        </View>
                        <TouchableOpacity style={styles.subGymHeader} onPress={() => this.props.pushScreen("FacilityCalendarPage", {gymName: this.state.gymName, subGymName: this.state.subGymName})}><Text style={{fontSize: 7, color: '#657786', textAlign: 'center'}}>See more</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    upcomingEventsContainer: {
        alignSelf: 'flex-start',
        marginTop: 10,
        height: 60,
        paddingRight: 2,
        paddingLeft: 2,
    },
    gymContainer: {
        borderRadius: 10,
        padding: 10,
    },
    subGymTabContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 10,
        width: 300,
        // marginLeft: 10,
        padding: 2,

    },

    subGym: {
        backgroundColor: '#f6f6f6',//'#ECECF7',
        opacity: 0.8,
        // borderColor: '#C7CBD1',
        // borderWidth: 1,
        height: 350,
        padding: 5,
        margin: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 20,
        shadowColor: '#808080',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    subGymTab: {
        // backgroundColor: 'blue',
        height: 120,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 250,
    },

    availabilityHeader: {
        textAlign: 'left',
        fontSize: 20,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E6ECF0',
        paddingBottom: 2,
        borderBottomWidth: 1,
        marginTop: 7

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
        color: '#DE8100',//'#14171A',
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
        width: 50,
        // backgroundColor: 'purple',
        // shadowColor: '#000',
        //    shadowOffset: { width: 0.4, height: 0 },
        //    shadowOpacity: 0.8,
        //    shadowRadius: 2,
        borderWidth: 0.8,
        borderColor: '#657786',
        borderRadius: 50,
        position: 'absolute',
        bottom: 4,
        padding: 4,
    },
    subGymBody: {
        // flex: 1,
        backgroundColor: 'blue',
        margin: 5,
    },
});