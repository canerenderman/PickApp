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
    }

    render(){

        if (this.props.count){
            if (this.props.minutesAway){
                return(
                    <View style={{backgroundColor: 'red', width: 200, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginRight: 5, fontSize: 25}}>{this.props.count}</Text>
                        <Text style={{marginRight: 5, fontSize: 15}}>events in</Text>
                        <Text style={{marginRight: 5, fontSize: 25}}>{this.props.minutesAway}</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>minutes</Text>
                    </View>
                );
            }
            return(
                <View style={{backgroundColor: 'red', width: 200, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{marginRight: 5, fontSize: 25}}>{this.props.count}</Text>
                    <Text style={{marginRight: 5, fontSize: 15}}>events currently happening</Text>
                </View>
            );
        }
        return null;
    }
}
const Dimensions = require('Dimensions');
var _window = Dimensions.get('window');
const styles = StyleSheet.create({
});