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

export default class FacilityButtonPool extends Component {

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

        // if (this.state.sport === 'Basketball'){
        //     console.log("Annen");
        //     this.populateSubGymArr(
        //         <TouchableOpacity style={styles.sub_sub_gym} key={1} onPress={() => this.toggleRatingViewVisibility()}>
        //             <ImageBackground style={styles.image} source={require('./Icons/basketball_court.png')}>
        //                 <Text style={{textAlign: 'center', fontSize: 25, color: 'white', opacity: 1, padding: 0}}>1</Text>
        //             </ImageBackground>
        //         </TouchableOpacity>
        //     );
        //     this.populateSubGymArr(
        //         <TouchableOpacity style={styles.sub_sub_gym} key={2} onPress={() => this.toggleRatingViewVisibility()}>
        //             <ImageBackground style={styles.image} source={require('./Icons/basketball_court.png')}>
        //                 <Text style={{textAlign: 'center', fontSize: 25, color: 'white', opacity: 1, padding: 0}}>2</Text>
        //             </ImageBackground>
        //         </TouchableOpacity>
        //     );
        //     this.populateSubGymArr(
        //         <TouchableOpacity style={styles.sub_sub_gym} key={3} onPress={() => this.toggleRatingViewVisibility()}>
        //             <ImageBackground style={styles.image} source={require('./Icons/basketball_court.png')}>
        //                 <Text style={{textAlign: 'center', fontSize: 25, color: 'white', opacity: 1, padding: 0}}>3</Text>
        //             </ImageBackground>
        //         </TouchableOpacity>
        //     );
        // }


    }

    // populateSubGymArr(view){
    //     this.setState({
    //         sub_gym_arr: this.state.sub_gym_arr.push(view),
    //     });
    //     console.log("ARR = ", this.state.sub_gym_arr.length);
    // }

    // toggleRatingViewVisibility(){
    //     this.setState({
    //         isRatingViewVisible: true,
    //     });
    // }

    // toggleSubGymVisibility(){
    //     console.log("ANNEN")
    // 	this.setState({
    //         areSubGymsVisible: !this.state.areSubGymsVisible,
    //         isRatingViewVisible: false,
    //     });
    // }

    // _renderRatingView(){
    //     if (this.state.isRatingViewVisible){
    //         console.log("is visible");
    //         return (
    //             <View style={styles.rating_view}>
    //                 <Text style={styles.sub_gym_header}>Enter Occupancy</Text>
    //                 <TextInput
    //                     style={styles.input}
    //                     placeholder={this.state.text}
    //                     onChangeText={(text) => this.setState({text})}/>
    //                 <Button title="Submit"></Button>
    //             </View>
    //         );
    //     } else {
    //         console.log("is invisible");
    //         return null;
    //     }
    // }

    // _renderSubGymHeader(){
    //     if (!this.state.isRatingViewVisible){
    //         return(
    //             <Text style={styles.sub_gym_header}>Pick a Court</Text>
    //         );
    //     }
    // }

    postRequest() {
        var url = "https://pickapp-test.herokuapp.com/api/users/1/pool";
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
                        <Image style={styles.image} source={require('./Icons/pool.png')}/>
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
        width: 200,
        height: 200,
        backgroundColor: 'red',
        marginBottom: 5,
        justifyContent: 'center',
        borderRadius: 100,
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