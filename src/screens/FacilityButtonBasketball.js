import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    Button,
    ImageBackground
} from 'react-native';

export default class FacilityButtonBasketball extends Component {

    constructor(props){
        super(props);
        this.state = {
            sport: this.props.sport,
            imgUrl: this.props.imgUrl,
            onPress: this.props.onPress,
            text: 'Number of people',
            areSubGymsVisible: false,
            isRatingViewVisible: false,
            sub_gym_arr: [],
        }
    }

    postRequest() {
        var url = "https://pickapp-test.herokuapp.com/api/users/2/basketball";
        var options = {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        fetch(url, options);
    }

    _renderSubGym(){
        if (this.state.areSubGymsVisible){
            return(
                <View style={styles.sub_container}>
                    <View style={styles.sub_gym_container}>
                        {this.state.sub_gym_arr}
                    </View>
                </View>
            );
        }
    }


    render(){
        return(
            <View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.sub_gym} onPress={() => this.postRequest()}>
                        <Image style={styles.image} source={require('./Icons/basketball_court.png')}/>
                    </TouchableOpacity>
                    {this._renderSubGym()}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginRight: 10
    },

    sub_container: {
        backgroundColor: 'green',
        borderRadius: 2,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
    },

    sub_gym_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'blue'
    },

    rating_view: {
        marginTop: 10,
        backgroundColor: 'white',

    },

    sub_gym_header: {
        fontSize: 12,
        paddingBottom: 5,
    },

    image: {
        flex: 0.8,
        width: null,
        height: null,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent:'center',
        opacity: 0.8,
    },

    sub_gym: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        marginBottom: 5,
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },

    sub_sub_gym: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },

    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
        fontSize: 7,
        padding: 5,
    },

    header_3: {
        padding: 0,
        margin: 2,
        textAlign: 'left',
        fontSize: 10,
        marginBottom: 10
    },
});