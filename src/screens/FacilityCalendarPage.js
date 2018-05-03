import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import FacilityCalendar from './FacilityCalendar.js';

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        // console.log("PROPS = ", props)
    }

    render() {
        var urlExt;
        // console.log("this.props.gymName = ", this.props.gymName);
        //     console.log("this.props.subgymName = ", this.props.subGymName);

        if (this.props.gymName === "Nelson"){
            if (this.props.subGymName === "Fitness"){
                urlExt = this.props.gymName;
            } else {
                console.log("POOL");
                urlExt = this.props.subGymName;
            }
        } else {
            urlExt = "basketball";
        }
        // urlExt = "fitness"
        console.log("urlExt = ", urlExt);
        return (
            <FacilityCalendar urlExt={urlExt.toLowerCase()}></FacilityCalendar>
        );
    }
}
// import React, { Component } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet
// } from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import FacilityCalendar from './FacilityCalendar.js';
//
// export default class AgendaScreen extends Component {
//     constructor(props) {
//         super(props);
//         console.log("PROPS = ", props)
//     }
//
//     render() {
//         var urlExt;
//         if (this.props.gymName === "Nelson"){
//             urlExt = this.props.subGymName;
//         } else {
//             urlExt = "basketball";
//         }
//         console.log("NELSON");
//         return (
//             <FacilityCalendar urlExt={urlExt.toLowerCase()}></FacilityCalendar>
//         );
//     }
// }