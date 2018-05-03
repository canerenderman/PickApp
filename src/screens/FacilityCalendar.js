import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {Agenda} from 'react-native-calendars';
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class FacilityCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            render: false,
            repeatLoading: true,
        };
        this.events = [];
        this.currDay = [];
        this.idx = 0;
        this.nested_idx = 0;
        // console.log("URL EXT = ", this.props.urlExt)
    }

    componentWillMount(){
        if (this.state.repeatLoading){
            this.fetchCalendarData(this, this.props.urlExt);
        }
    }

    render() {
        // new Date(curr_idx_date - 4 * 60 * 60 * 1000).toISOString().split("T")[0];
        // var curr = parseInt(new Date().toISOString().substring(11,13) - 4);
        // if (curr > 0){ console.log("ANNEN"); curr + 12 };
        // var currInFour = new Date().getTime()
        // var _day = new Date("2018-05-01T23:30:00");

        var curr = new Date();
        // console.log("curr = ", curr)
        var currString = curr.toISOString().split("T")[0]
        // console.log("currString = ", currString);
        var maxDate = new Date(curr.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
        // console.log("maxDate = ", maxDate)
        // console.log("rendering... = ", curr);

        if (this.state.render){
            var myThis = this;
            return (
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this, curr)}
                    selected={currString}
                    // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    minDate={currString}
                    maxDate={maxDate}
                    futureScrollRange={1}
                    renderItem={this.renderItem.bind(this)}
                    renderDay={(day, item) => {return (<View style={{backgroundColor: 'blue'}}/>);}}
                    renderEmptyDate={() => console.log("MURAT")}
                    // renderEmptyDate={() => {return null;}}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // theme={{
                    //   agendaDayTextColor: 'yellow',
                    //   agendaDayNumColor: 'green',
                    //   agendaTodayColor: 'red',
                    //   agendaKnobColor: 'blue'
                    // }}
                    // hideKnob={false}
                    // renderDay={(day, item) => {console.log("ITMZZZ = ", item); return (<View style={{height: height * .5, width: width, flex: 1, flexDirection: 'column', backgroundColor: 'blue', padding: 10, margin: 20}}><Text>A</Text></View>);}}
                    // dayComponent={(date) => {
                    //   return (<View style={{flex: 1}}><Text style={{textAlign: 'center', color: 'black'}}>{date.day}</Text></View>);
                    // }}
                    // style={{backgroundColor: 'red'}}
                    // pastScrollRange={0}
                    // futureScrollRange={0}
                    // onDayChange={console.log('day changed')}
                />
            );
        }
        return null;
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


    fetchCalendarData(myThis, urlExt){
        var myThis = this;
        // console.log('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt);
        fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log("myJson = ", myJson);
                // console.log("myJson = ", myJson);
                var date, startTime, endTime, eventTitle, court;
                myThis.events = myJson.map((event) => {

                    event = event.split(" - ");

                    // console.log("event = ", event)
                    // console.log("event = ", event[0].substring(0, 19));
                    // console.log("date = ", date);
                    startTime = myThis.time(event[0].substring(0, 19));
                    endTime = myThis.time(event[1].substring(0, 19));
                    // console.log("event = ", endTime)
                    // event[0] = (event[0].replace("T", "X")).split("X");
                    date = event[0].split("T")[0]

                    // ((event[1].replace("T", "X")).split("X"))[1].split('-')[0];
                    // if (event)
                    var event_params = event[1].substring(26, event[1].length).split("-");
                    // console.log("PARAM - ", event_params)

                    eventTitle = event_params[0];
                    // console.log("eventTitle = ", eventTitle)
                    court = event_params[1].split(",");
                    // console.log("court = ", court)
                    // console.log("court = ", court)
                    // console.log("event = ", event);
                    // if (event.length === 4){ court = event[3]; }
                    // else {
                    //   eventTitle = event[2].split("-")[0];
                    //   if (event[2].split("-")[1] !== undefined ) { court = event[2].split("-")[1]; }
                    //   // console.log("COURT = ", court); console.log("eventTitle = ", eventTitle);
                    //   // if (event.length === 3){ eventTitle = }
                    // }
                    // console.log("YARRAK");

                    // console.log("eventTitle = ", eventTitle);

                    if (court !== undefined){
                        var courts = [];
                        if (court.includes('1')){ courts.push(1); }
                        if (court.includes('2')){ courts.push(2); }
                        if (court.includes('3')){ courts.push(3); }
                        if (court.includes('4')){ courts.push(4); }
                        if (courts.length == 0){
                            if (court.includes('ower')){
                                courts.push(1);
                                courts.push(2);
                                courts.push(3);
                                courts.push(4);
                            } else if (court.includes('olleyball')){
                                courts.push(4)
                            }
                        }
                    }
                    // console.log("date = ", date);
                    // console.log("startTime = ", startTime);
                    // console.log("endTime = ", endTime);
                    // console.log("eventTitle = ", eventTitle);
                    // console.log("courts = ", courts);

                    return(
                        {
                            date: date,
                            startTime: startTime,
                            endTime: endTime,
                            eventTitle: eventTitle,
                            courts: courts
                        }
                    );
                });
                // console.log("my events = ", myThis.events)
                myThis.setState({
                    render: true,
                });
            });
    }


    loadItems(day) {
        this.state.items = [];
        // console.log("day = ", day.toISOString().split("T")[0])
        var _day = new Date();
        var strTime = new Date(_day.getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0]
        // console.log("strTime = ", strTime);
        if (!this.state.items[strTime] && strTime != day.toISOString().split("T")[0]) {
            // console.log("BABANIN ", strTime)
            this.state.items[strTime] = [];
            this.state.items[strTime].push({
                index: 0,
                date: strTime,
                startTime: "9am",
                endTime: "10am",
                eventTitle: "ANNENIN AMI",
                courts: [1,2],
                height: 10,
            });
        }
        // setTimeout(() => {
        if (this.state.repeatLoading){
            // console.log("LOADING");

            var idx = 0;
            for (let i = 0; i < this.events.length; i++) {
                strTime = this.events[i].date;
                // console.log("strTime, events[i+1].date = ", strTime,", ", events[i+1].date);
                // console.log("strTime = ", strTime);
                // console.log("indexOneLess = ", indexOneLess);
                // strTime = strTime.substring(0, strTime.length - 2) + indexOneLess;
                // console.log("strTime after = ", strTime);
                // var indexOneLess = strTime.substring(0, strTime.length - 2) + (parseInt(strTime.substring(strTime.length - 2, strTime.length)) - 1).toString();
                // console.log("strTime = ", strTime)
                // console.log("indexOneLess = ", indexOneLess);
                if (!this.state.items[strTime]) { this.state.items[strTime] = []; }
                this.state.items[strTime].push({
                    index: idx,
                    date: this.events[i].date,
                    startTime: this.events[i].startTime,
                    endTime: this.events[i].endTime,
                    eventTitle: this.events[i].eventTitle,
                    courts: this.events[i].courts,
                    height: ((parseInt(this.events[i].endTime.substring(0, 3)) * 60 + parseInt(this.events[i].endTime.substring(3, 5))) - (parseInt(this.events[i].startTime.substring(0, 3)) * 60 + parseInt(this.events[i].startTime.substring(3, 5)))) / 60,
                });
                // console.log("events[i] = ", events[i])
                // console.log("events[i + 1] = ", events[i + 1]);
                if (this.events[i + 1] === undefined){
                    idx = 0
                } else if (strTime !== this.events[i + 1].date){
                    idx = 0
                } else { idx++; }
            }
            // console.log("done w loop")
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                // console.log("key = ", this.state.items[key])
                // console.log("KEY = ", key)
                // var indexOneLess = key.substring(0, key.length - 2) + (parseInt(key.substring(key.length - 2, key.length)) - 1).toString();
                newItems[key] = this.state.items[key];
                // console.log("key = ", key, ", indexOneLess = ", indexOneLess, ", newItems[indexOneLess] = ", newItems[indexOneLess]);
            });
            // console.log("newItems = ", newItems)
            this.setState({
                items: newItems,
                repeatLoading: false,
            });
            // console.log("ITEMZ = ", this.state.items);
        }
        // }, 1000);
    }

    getNextEvent(myThis, nested_idx, idx){
        // if ()
        var curr_idx_date = new Date(this.idx).getTime();
        var next_idx = new Date(curr_idx_date + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        // console.log("getting next event ,,,")
        if (nested_idx === myThis.state.items[idx].length){
            // console.log("1")
            nested_idx = 0;
            idx = next_idx;
        } else {
            // console.log("2")
            nested_idx++;
        }
        // console.log("this.state.items[idx][nested_idx] = ", this.state.items[idx][nested_idx])
        // console.log("this.nested_idx ANNEN = ", myThis.state.items[idx]);
        // console.log("ANNENIN SUCUKLU AMI = ");
        // console.log("BUMU = ", idx, ", ", nested_idx);
        if (myThis.state.items[idx][nested_idx] === undefined) { return { date: null } }
        // this.currDay[0].date === Object.keys(this.state.items)[Object.keys(this.state.items).length - 1].date ||

        return myThis.state.items[idx][nested_idx];
    }

    renderItem(item) {

        if (this.idx === 0) {
            this.idx = new Date(new Date().getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0];
            console.log("idx = ", this.idx)
            // var strTime = new Date(day.getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0]
            // console.log("initializing idx = ", this.idx)
        }
        // console.log("this.idx = ", this.idx);
        // console.log("this.state.items = ", this.state.items)
        var lastKey = Object.keys(this.state.items).reverse()[0];
        if (lastKey === undefined){
            return
        }
        // console.log("lastKey = ", lastKey)
        var lastValue = this.state.items[lastKey];
        // console.log("LAST = ", lastValue);

        // console.log(this.state.items);
        // console.log("new Date(lastValue.date).getTime() = ", new Date(lastValue[0].date).getTime(), ", new Date(this.idx).getTime() = ", new Date(this.idx).getTime())
        if (new Date(lastValue[0].date).getTime() < new Date(this.idx).getTime()){
            return;
        }
        // console.log("this.idx = ", this.idx)
        item = this.state.items[this.idx]
        console.log("item = ", item)
        var curr = new Date(this.idx);
        var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
        for (var i = 0; i < item.length; i++){
            if (item[i].courts.includes(1)){
                court_1.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(2)){
                court_2.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(3)){
                court_3.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(4)){
                court_4.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
        }
        var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
        var toRender;
        console.log("item[0].eventTitle = ", item[0].eventTitle)
        if (sum_len === 0 || item[0].eventTitle === "ANNENIN AMI"){
            if (item[0].eventTitle === "ANNENIN AMI"){
                var i = 0
                toRender = item.map((event) => {
                    i++;
                    return(
                        <View style={styles.item_nelson} key={i}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>No Upcoming Events</Text>
                        </View>
                    );
                });
            } else {
                var i = 0
                toRender = item.map((event) => {
                    i++;
                    return(
                        <View style={styles.item_nelson} key={i}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
                        </View>
                    );
                });
            }
            this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
            var curr = new Date(item[0].date + "T12:00:00");
            var day = curr.getDate();
            var month = curr.getMonth();
            return (
                <View style={{marginTop: 0}}>
                    <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
                        <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
                    </View>
                    {toRender}
                </View>
            );
        }
        if (court_1.length === 0){ court_1.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_2.length === 0){ court_2.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_3.length === 0){ court_3.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_4.length === 0){ court_4.push( <Text key={0} style={{fontStyle: 'italic'}}>No Events</Text> ); }
        var curr = new Date(item[0].date + "T12:00:00");
        var day = curr.getDate();
        var month = curr.getMonth();
        console.log("idx = ", this.idx)
        this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        return (
            <View>
                <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{day}</Text>
                    <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[month]}</Text>
                </View>
                <View style={styles.dayContainer}>
                    <View style={styles.basketballCourt}>
                        <Text style={styles.columnTitleContainer}>Court 1</Text>
                        <View style={styles.dayEventsContainer}>
                            {court_1}
                        </View>
                    </View>
                    <View style={styles.basketballCourt}>
                        <Text style={styles.columnTitleContainer}>Court 2</Text>
                        <View style={styles.dayEventsContainer}>
                            {court_2}
                        </View>
                    </View>
                    <View style={styles.basketballCourt}>
                        <Text style={styles.columnTitleContainer}>Court 3</Text>
                        <View style={styles.dayEventsContainer}>
                            {court_3}
                        </View>
                    </View>
                    <View style={styles.basketballCourt}>
                        <Text style={styles.columnTitleContainer}>Court 4</Text>
                        <View style={styles.dayEventsContainer}>
                            {court_4}
                        </View>
                    </View>
                </View>
            </View>
        );

    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return false;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item_omac: {
        backgroundColor: '#fcfcfc',
        width: 80,
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        borderRadius: 5,
        // borderWidth: 2,
        // borderColor: '#DE8100',
        padding: 5,
        marginBottom: 5,
    },
    item_nelson: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30,
    },
    basketballCourt: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dayContainer: {
        // position: 'absolute',
        // top: -50,
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignSelf: 'flex-start',
        backgroundColor: '#F4F4F4',//'#fcfcfc',
        // marginRight: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        marginBottom: 100,
        // borderRadius: 10,
        // borderWidth: 2,
        // borderColor: '#DE8100',
    },
    columnTitleContainer: {
        fontSize: 20,
        marginBottom: 10,
        position: 'absolute',
        textAlign: 'center',
        // color: '#DE8100',
        backgroundColor: '#fcfcfc',
        width: 80,
        borderRadius: 5,
        top: 0,
    },
    dayEventsContainer: {
        backgroundColor: '#F4F4F4',//'#fcfcfc',
        marginTop: 40,
    }
});