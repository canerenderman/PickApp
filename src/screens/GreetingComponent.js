import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class GreetingComponent extends React.Component {

    constructor(props){
        super(props);
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){
        return (
            <View style={{width: 300, position: 'absolute', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 2, height: 200, flexDirection:'column', justifyContent: 'space-around', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4, shadowRadius: 2}}>
                <Text style={{textAlign: 'center', fontSize: 30}}>Welcome to {this.props.clickedGym} {this.capitalize(this.props.clickedFacility)}</Text>
                <Text style={{textAlign: 'center'}}>This data will be used to built the PickApp</Text>
                <Text style={{textAlign: 'center'}}>Thank You!</Text>
            </View>
        );
    }
}