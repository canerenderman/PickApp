import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import {NavigationToolBarIOS} from 'react-native-navigation';

const {width} = Dimensions.get('window');
var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = (height-66) / box_count;

// permissions._alertForLocationPermission();

class trackScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent:true,
        navBarNoBorder: true,
        navBarTextColor: 'black',
        navBarButtonColor: 'black',

    };
    onNavigatorEvent(event) {
        if (event.type === 'PreviewActionPress') {
            if (event.id === 'action-cancel') {
                Alert.alert('Cancelled');
            }
            if (event.id === 'action-delete-sure') {
                Alert.alert('Deleted');
            }
        }
    }

    onPushAnother = () => {
        this.props.navigator.push({
            screen: 'example.Types.Push',
            title: `Screen ${this.props.count || 1}`,
            passProps: {
                count: this.props.count ? this.props.count + 1 : 2
            }
        });
    };

    onResetTo = () => {
        this.props.navigator.resetTo({
            //label: 'Navigation',
            screen: 'PickApp.Screens.HomeScreen',
            // icon: require('../../../img/list.png'),
            //title: 'Navigation Types'
        });
    };

    onPopToRoot = () => {
        this.props.navigator.popToRoot();
    };

    render(){
        return (
            <View
                style={styles.cellContainer}>
                <LinearGradient colors={['#212176', '#A8611A', '#11113B']}
                                style={styles.linearGradient}>

                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View
                            style={styles.container}>
                            <View style={[styles.box]}>
                                <Text style={styles.headerText}>
                                    Track @ OMAC
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.marginContainer}>
                                        <Text style={styles.textStyle}> Number of People </Text>
                                    </View>
                                    <View style={styles.marginContainer}>
                                        <Text style={styles.textStyle}> Availability </Text>
                                    </View>
                                    <View style={styles.marginContainer}>
                                        <Text style={styles.textStyle}> Trend </Text>
                                    </View>
                                </View>
                                <View style={styles.buttonCC}>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.button1]}
                                            onPress={this.onPushAnother}>
                                            {/*() => alert('Thank You')*/}
                                            <Text style={styles.textStyle}> Push another </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.button2]}
                                            onPress={this.onResetTo}>
                                            <Text style={styles.textStyle}> Reset To </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.button3]}
                                            onPress={this.onPopToRoot}>
                                            <Text style={styles.textStyle}> Pop to Root </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <NavigationToolBarIOS key='segmented' translucent={true} style={styles.toolBarStyle}>
                            {/*<Button title={"Anan, Press Me"} onPress={() => alert('Thank You')}/>*/}
                        </NavigationToolBarIOS>
                    </ScrollView>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        // flex:1,
        // paddingVertical: 0,
        // backgroundColor: '#212176',
        // opacity: 0.7,
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: width/2,
        // paddingRight: width/2,
        // paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems:'center',

        // borderRadius: 5,
    },
    cellContainer: {
        flex: 1,
        // paddingVertical: 30,
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor: '#212176',
    },
    toolBarStyle: {
        top: 0,
        width: width,
        position: 'absolute',
        borderTopWidth: 0,
        height: 0,
        backgroundColor: 'transparent'

    },
    container: {
        top:60,
        width:350,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    box: {
        height: height*.6, //set this one
        alignItems:'stretch',
        // justifyContent:'center',
        backgroundColor: '#56565C',
        opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    marginContainer: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        // borderRadius:10,
        // borderWidth: 1,
        backgroundColor: 'transparent'
        //borderColor: '#fff'
    },
    buttonCC: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
        fontSize: 30,
    },
    marginText: {
        color: 'white',
        paddingTop:20,
        textAlign: 'center',
        opacity: 1,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
    },
    button: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    button1: {
        backgroundColor: '#3B3B3B',

    },
    button2: {
        backgroundColor: '#262525',
    },
    button3: {
        backgroundColor: '#1C1C1C',

    },

});

export default trackScreen;
// import React, { Component } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//     View,
//     ScrollView,
//     Dimensions,
//     Text,
//     StyleSheet,
//     Alert,
//     TouchableOpacity,
//     PixelRatio
// } from 'react-native';
// import {NavigationToolBarIOS} from 'react-native-navigation';
//
// const {width} = Dimensions.get('window');
// var { height } = Dimensions.get('window');
//
// var box_count = 2;
// var box_height = (height-66) / box_count;
//
// // permissions._alertForLocationPermission();
//
// class trackScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
//     }
//
//     static navigatorStyle = {
//         drawUnderNavBar: true,
//         navBarTranslucent:true,
//         navBarNoBorder: true,
//         navBarTextColor: 'black',
//         navBarButtonColor: 'black',
//
//     };
//     onNavigatorEvent(event) {
//         if (event.type === 'PreviewActionPress') {
//             if (event.id === 'action-cancel') {
//                 Alert.alert('Cancelled');
//             }
//             if (event.id === 'action-delete-sure') {
//                 Alert.alert('Deleted');
//             }
//         }
//     }
//
//     onPushAnother = () => {
//         this.props.navigator.push({
//             screen: 'example.Types.Push',
//             title: `Screen ${this.props.count || 1}`,
//             passProps: {
//                 count: this.props.count ? this.props.count + 1 : 2
//             }
//         });
//     };
//
//     onResetTo = () => {
//         this.props.navigator.resetTo({
//             //label: 'Navigation',
//             screen: 'PickApp.Screens.HomeScreen',
//             // icon: require('../../../img/list.png'),
//             //title: 'Navigation Types'
//         });
//     };
//
//     onPopToRoot = () => {
//         this.props.navigator.popToRoot();
//     };
//
//     render(){
//         return (
//             <View
//                 style={styles.cellContainer}>
//                 <LinearGradient colors={['#212176', '#A8611A', '#11113B']}
//                                 style={styles.linearGradient}>
//
//                     <ScrollView contentContainerStyle={styles.contentContainer}>
//                         <View
//                             style={styles.container}>
//                             <View style={[styles.box]}>
//                                 <Text style={styles.headerText}>
//                                     Track @ OMAC
//                                 </Text>
//                                 <View style={styles.buttonContainer}>
//                                     <View style={styles.marginContainer}>
//                                         <Text style={styles.textStyle}> Number of People </Text>
//                                     </View>
//                                     <View style={styles.marginContainer}>
//                                         <Text style={styles.textStyle}> Availability </Text>
//                                     </View>
//                                     <View style={styles.marginContainer}>
//                                         <Text style={styles.textStyle}> Trend </Text>
//                                     </View>
//                                 </View>
//                                 <View style={styles.buttonCC}>
//                                     <View style={styles.buttonContainer}>
//                                         <TouchableOpacity
//                                             style={[styles.button, styles.button1]}
//                                             onPress={this.onPushAnother}>
//                                             {/*() => alert('Thank You')*/}
//                                             <Text style={styles.textStyle}> Push another </Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             style={[styles.button, styles.button2]}
//                                             onPress={this.onResetTo}>
//                                             <Text style={styles.textStyle}> Reset To </Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             style={[styles.button, styles.button3]}
//                                             onPress={this.onPopToRoot}>
//                                             <Text style={styles.textStyle}> Pop to Root </Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                         <NavigationToolBarIOS key='segmented' translucent={true} style={styles.toolBarStyle}>
//                             {/*<Button title={"Anan, Press Me"} onPress={() => alert('Thank You')}/>*/}
//                         </NavigationToolBarIOS>
//                     </ScrollView>
//                 </LinearGradient>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     contentContainer: {
//         // flex:1,
//         // paddingVertical: 0,
//         // backgroundColor: '#212176',
//         // opacity: 0.7,
//     },
//     linearGradient: {
//         flex: 1,
//         // paddingLeft: width/2,
//         // paddingRight: width/2,
//         // paddingHorizontal: 0,
//         justifyContent: 'center',
//         alignItems:'center',
//
//         // borderRadius: 5,
//     },
//     cellContainer: {
//         flex: 1,
//         // paddingVertical: 30,
//         // justifyContent: 'center',
//         // alignItems:'center',
//         // backgroundColor: '#212176',
//     },
//     toolBarStyle: {
//         top: 0,
//         width: width,
//         position: 'absolute',
//         borderTopWidth: 0,
//         height: 0,
//         backgroundColor: 'transparent'
//
//     },
//     container: {
//         top:60,
//         width:350,
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//
//     },
//     box: {
//         height: height*.6, //set this one
//         alignItems:'stretch',
//         // justifyContent:'center',
//         backgroundColor: '#56565C',
//         opacity: 0.8,
//         marginTop:10,
//         paddingTop:15,
//         paddingBottom:15,
//         marginLeft:5,
//         marginRight:5,
//         borderRadius:10,
//         borderWidth: 1,
//         borderColor: '#fff'
//     },
//     marginContainer: {
//         width: 100,
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         // opacity: 0.8,
//         marginTop:10,
//         paddingTop:15,
//         paddingBottom:15,
//         marginLeft:5,
//         marginRight:5,
//         // borderRadius:10,
//         // borderWidth: 1,
//         backgroundColor: 'transparent'
//         //borderColor: '#fff'
//     },
//     buttonCC: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerText: {
//         color: 'white',
//         textAlign: 'center',
//         opacity: 1,
//         fontSize: 30,
//     },
//     marginText: {
//         color: 'white',
//         paddingTop:20,
//         textAlign: 'center',
//         opacity: 1,
//     },
//     textStyle: {
//         color: 'white',
//         textAlign: 'center',
//         opacity: 1,
//     },
//     button: {
//         width: 100,
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         opacity: 0.8,
//         marginTop:10,
//         paddingTop:15,
//         paddingBottom:15,
//         marginLeft:5,
//         marginRight:5,
//         borderRadius:10,
//         borderWidth: 1,
//         borderColor: '#fff'
//     },
//     button1: {
//         backgroundColor: '#3B3B3B',
//
//     },
//     button2: {
//         backgroundColor: '#262525',
//     },
//     button3: {
//         backgroundColor: '#1C1C1C',
//
//     },
//
// });
//
// export default trackScreen;