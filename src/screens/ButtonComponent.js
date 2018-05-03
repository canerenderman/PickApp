import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class ButtonComponent extends React.Component {

    constructor(props){
        super(props);
        if (this.props.gym === "Nelson"){ this.gym_number = 1 }
        else { this.gym_number = 2 }
        this.state = { disabled: this.props.disabled, number_users: 0};
        this.url = "https://pickapp-test.herokuapp.com/api/users/" + this.gym_number + "/" + this.props.facility;

    }

    // componentWillMount(){
    //     // this.fetchAvailabilityData()
    //     console.log("DISABLED CHILD? = ", this.state.disabled)
    // }

    postRequest() {
        if (!this.props.disabled){
            this.refs.button.setOpacityTo(0.1);
            var options = {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            var myThis = this;
            this.props.setProps(this.props.gym, this.props.facility, true);
            if (this.props.facility === "other"){
                this.url = "https://pickapp-test.herokuapp.com/api/locations/" + this.gym_number + "/facility";
                options = {
                    'method': 'POST',
                    'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sportType: "other"})
                };
            }
            fetch(this.url, options);
            setTimeout(function(){
                myThis.props.setProps(null, null, false);
                myThis.refs.button.setOpacityTo(1);

            }, 2500);
        }
        if (this.props.disabled) {
            this.refs.button.setOpacityTo(0.1);
        }
    }

    fetchAvailabilityData(){
        var myThis = this;
        var avail;
        fetch(this.url)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.availability === undefined){ avail = myJson.count }
                else { avail = myJson.availability }
                return;
            });
    }

    // showCount(){
    //     console.log("this.number_users = ", this.state.number_users)
    //     if (this.state.disabled){
    //         return(
    // <View style={{width: 200, height: 250, position: 'absolute', padding: 20, justifyContent: 'space-around'}}>
    //     <Text style={{textAlign: 'center', fontSize: 20}}>Currently</Text>
    //     <Text style={{textAlign: 'center', fontSize: 50}}>{this.state.number_users}</Text>
    //     <Text style={{textAlign: 'center', fontSize: 20}}>people</Text>
    //     <Text style={{textAlign: 'center', fontSize: 20}}>@ </Text>
    //     <Text style={{textAlign: 'center', fontSize: 20}}>{this.props.gym} {this.capitalize(this.props.facility)}</Text>
    // </View>
    //         );
    //     }
    // }

    _onPress(){
        this.postRequest();
    }

    componentDidUpdate(){
        // console.log("YARRAM");
        if (this.props.disabled) {  this.refs.button.setOpacityTo(0.2); }
        else { this.refs.button.setOpacityTo(1); }
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity ref="button" style={[styles.sub_gym, {backgroundColor: this.props.buttonColor}]} onPress={() => {this._onPress()}}>
                    <Image style={styles.image} source={this.props.img}/>
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.capitalize(this.props.facility)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    sub_gym: {
        backgroundColor: 'red',
        marginBottom: 5,
        justifyContent: 'center',
        padding: 20,
        // alignSelf: 'flex-start',
        borderRadius: 70,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
    },
});