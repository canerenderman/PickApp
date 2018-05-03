import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image
    // Dimensions,
} from 'react-native';

import GymButtonContainer from './GymButtonContainer.js';
import { NavigationToolBarIOS } from 'react-native-navigation';

export default class GymContainer extends Component{
    constructor(props){
        super(props);
        // console.log("MURAT = ", this.props.navigator);
        this.state = {
            gymName: this.props.gymName,
            subGymNames: this.props.subGymNames,
            subGymClicked: this.props.subGymClicked,
            displayMainPageHeader: this.props.displayMainPageHeader,
            hideAll: this.props.hideAll,
            availability: this.props.availability,
            openHours: '',
            hourString: '',
            alert: false,
        };
        this.header = this.state.gymName;
        this.fetchHours();
        // this.checkIfOpen();
        // this.checkIfOpen();
        // console.log("screenWidth = ", _window.);
        // this.subHeader = 'Choose a Sport';
        // console.log("CONStRUC")
    }

    checkIfOpen(myThis){
        var curr = new Date();
        var start = new Date(new Date(myThis.state.openHours.startTime).getTime() + 4 * 60 * 60 * 1000);
        var end = new Date(new Date(myThis.state.openHours.endTime).getTime() + 4 * 60 * 60 * 1000);
        var minsFromEnd;
        var minsFromStart;
        curr = new Date(new Date("2018-05-01T03:30:00").getTime() + 4 * 60 * 60 * 1000);
        if (curr >= start && curr <= end){
            minsFromEnd = (end.getTime() - curr.getTime()) / (60 * 1000);
            if (minsFromEnd <= 60){
                myThis.setState({
                    hourString: 'Closing in ' + minsFromEnd + ' minutes',
                    alert: true,
                });
            } else {
                myThis.setState({
                    hourString: 'Open',
                    alert: false,
                });
            }

        } else if (curr < start) {
            minsFromStart = (start.getTime() - curr.getTime()) / (60 * 1000);
            if (minsFromStart <= 60){
                myThis.setState({
                    hourString: 'Opening in ' + minsFromStart + ' minutes',
                    alert: true,
                });
            } else {
                myThis.setState({
                    hourString: 'Closed',
                    alert: false,
                });
            }
        } else {
            myThis.setState({
                hourString: 'Closed',
                alert: false,
            });
        }
        console.log("checking")
    }

    replaceAt(str, indexStart, indexEnd, replacement) {
        return str.substr(0, indexStart) + replacement + str.substr(indexEnd + replacement.length);
    }

    fetchHours(){
        var myThis = this;
        fetch('https://pickapp-test.herokuapp.com/api/calendar/' + this.state.gymName.toLowerCase())
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                var today = myJson[0].split(" - ");
                myThis.setState({
                    openHours: { startTime: today[0].substring(0, 19), endTime: today[1].substring(0, 19)},
                }, function(){
                    myThis.checkIfOpen(myThis);
                    setInterval(function(){
                        myThis.checkIfOpen(myThis)
                    }, 30000);
                });
            });

    }

    time(date) {
        var date = new Date(date);
        var hours = date.getHours() + 4;
        var minutes = date.getMinutes();
        var ampm = hours >= 12 && hours < 24 ? 'pm' : 'am';
        var strMin = (minutes < 10) ? (minutes === 0 ? "": "0" + minutes): minutes;
        var strTime = (hours === 12 && minutes === 0) ? "noon": (hours === 24 && minutes === 0) ? "midnight": ((hours % 12) + (strMin == "" ? '': ':') + strMin + ampm); // the hour '0' should be '12'
        return strTime;
    }

    createFunctionalityDivs(){
        var funcDivs = [];
        var names = ['Availability', 'Schedule'];
        for (var i = 0; i < names.length; i++){
            funcDivs.push(
                <GymButtonContainer
                    key={i}
                    gymName={this.state.gymName}
                    subGymName={names[i]}
                    changeTitle={this.changeTitle.bind(this)}
                    changeToSubGym={this.changeToSubGym.bind(this)}
                    subGymClicked={this.state.subGymClicked}
                    hideAll={this.state.hideAll}
                    hideAllDivs={this.hideAllDivs.bind(this)}
                    displayMainPageHeader={this.state.displayMainPageHeader}
                    availability={this.state.availability}
                    changeAvailability={this.changeAvailability.bind(this)}>
                </GymButtonContainer>
            );
        }
        return funcDivs;
    }

    createSubGyms(){
        var subGyms = [];
        for (var i = 0; i < this.state.subGymNames.length; i++){
            subGyms.push(
                <GymButtonContainer
                    key={i}
                    gymName={this.state.gymName}
                    subGymName={this.state.subGymNames[i]}
                    changeTitle={this.changeTitle.bind(this)}
                    changeToSubGym={this.changeToSubGym.bind(this)}
                    subGymClicked={this.state.subGymClicked}
                    hideAll={this.state.hideAll}
                    hideAllDivs={this.hideAllDivs}
                    displayMainPageHeader={this.state.displayMainPageHeader}
                    availability={this.state.availability}
                    changeAvailability={this.changeAvailability.bind(this)}
                    navigator={this.props.navigator}
                    pushScreen={this.props.pushScreen.bind(this)}>
                </GymButtonContainer>
            );
        }
        return subGyms;
    }

    changeTitle(titleFromButton){
        this.setState({
            subGymClicked: titleFromButton,
        });
    }

    changeAvailability(availabilityData){
        // console.log("availabilityData = ", availabilityData);
        this.setState({
            availability: availabilityData,
        });
    }
    displayAlert(){
        if (this.state.alert){
            return(
                <Image source={require('./Icons/clock.png')} style={{width: 20, height: 20, alignSelf: 'flex-start', marginRight: 5}}/>
            );
        }
    }


    changeToSubGym(){
        this.setState({
            displayMainPageHeader: false,
        });
    }

    displayHeader(){
        // console.log("C = ", this.state.openHours);
        // console.log("this.state.openHours.startTime = ", this.state.openHours)
        var isOpen = "Currently Open"
        var date = new Date();
        // console.log("date = ", date.getHours() % 12);
        return(
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{this.header}</Text>
                    <Text>{this.time(this.state.openHours.startTime)} - {this.time(this.state.openHours.endTime)}</Text>
                </View>
                <View style={{flexDirection: 'row', opacity: 0.6, marginRight:20}}>
                    {this.displayAlert()}
                    <Text style={{fontSize: 17}}>{this.state.hourString}</Text>
                </View>
            </View>

        );
    }

    render(){
        // console.log('render biatch = ', Object.keys(this.state.openHours).length);
        if (Object.keys(this.state.openHours).length > 0){
            // console.log("ANNEN")
            return(
                <View style={styles.gymContainer}>
                    {this.displayHeader()}
                    <View style={styles.buttonCC}>
                        {this.createSubGyms()}
                    </View>
                </View>
            );
        }
        return null;

    }
}
const Dimensions = require('Dimensions');
var _window = Dimensions.get('window');
const styles = StyleSheet.create({

    navigation: {
        opacity: 0.6,
        color: '#f0f0f0',
    },

    headerTextContainer: {
        // backgroundColor: 'green',
    },

    gymContainer: {
        backgroundColor: '#fcfcfc',//'transparent',//'white',
        marginTop: 0,
        marginBottom: 0,
        // borderRadius: 1,
        // borderWidth: 2,
        // borderColor: '#E6ECF0',
        padding: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        width: _window.width,
    },

    buttonCC: {
        // backgroundColor: 'black',
        borderTopWidth: 1,
        borderColor: '#E6ECF0',
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
        // backgroundColor: 'blue',
        width: _window.width,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        color: '#14171A',
        textAlign: 'left',
        fontSize: 30,
    },
    marginText: {
        color: '#14171A',
        textAlign: 'left',
        marginBottom: 10,
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
        width: 200,
        backgroundColor: 'purple',
        textAlign: 'center',
        padding: 7,
    },
    subGymBody: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
    },
});