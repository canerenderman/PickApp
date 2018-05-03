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

        var curr = new Date("2018-05-01T23:30:00");
        console.log("curr = ", curr)
        var currString = curr.toISOString().split("T")[0]
        // console.log("currString = ", currString);
        var maxDate = new Date(curr.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
        // console.log("maxDate = ", maxDate)
        console.log("rendering... = ", curr);

        if (this.state.render){
            var myThis = this;
            return (
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this, curr)}
                    selected={currString}
                    // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    minDate={currString}
                    maxDate={'2018-04-30'}
                    renderItem={this.renderItem.bind(this)}
                    renderDay={(day, item) => {return (<View style={{backgroundColor: 'blue'}}/>);}}
                    renderEmptyDate={() => console.log("MURAT")}
                    // renderEmptyDate={() => {return null;}}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    theme={{
                        agendaDayTextColor: 'yellow',
                        agendaDayNumColor: 'green',
                        agendaTodayColor: 'red',
                        agendaKnobColor: 'blue'
                    }}
                    hideKnob={false}
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
                    var event_params = event[1].substring(26, event[1].length).split("-");
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
        // console.log("day = ", day)
        var _day = new Date("2018-05-01T23:30:00");
        var strTime = new Date(_day.getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0]
        console.log("strTime = ", strTime);
        if (!this.state.items[strTime]) {
            console.log("BABANIN ", strTime)
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
            this.idx = new Date(new Date("2018-05-01T23:30:00").getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0];
            // var strTime = new Date(day.getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0]
            // console.log("initializing idx = ", this.idx)
        }
        var lastKey = Object.keys(this.state.items).reverse()[0];
        var lastValue = this.state.items[lastKey];
        // console.log("LAST = ", lastValue);
        // console.log(this.state.items);
        // console.log("new Date(lastValue.date).getTime() = ", new Date(lastValue[0].date).getTime(), ", new Date(this.idx).getTime() = ", new Date(this.idx).getTime())
        if (new Date(lastValue[0].date).getTime() < new Date(this.idx).getTime()){
            return;
        }
        console.log("this.idx = ", this.idx)
        item = this.state.items[this.idx]
        console.log("item = ", item)
        // var i = 0
        // var toRender = item.map((event) => {
        // console.log("event  = ", event)
        //         i++;
        //         return(
        //           <View style={styles.item_nelson} key={i}>
        //             <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
        //             <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
        //             <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
        //           </View>
        //         );
        //       });

        // console.log("AMK = ", this.idx, ", YARRAM = ", item);
        // console.log("this.idx = ", this.idx);
        var curr = new Date(this.idx);
        // console.log(curr)
        // this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        // console.log("next_idx = ", next_idx);




        // if (this.idx === 0) {
        //   this.idx = new Date(new Date().getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0];
        //   // var strTime = new Date(day.getTime() - 4 * 60 * 60 * 1000).toISOString().split("T")[0]
        //   // console.log("initializing idx = ", this.idx)
        // }
        // var lastKey = Object.keys(this.state.items).reverse()[0];
        // var lastValue = this.state.items[lastKey];
        // // console.log("LAST = ", lastValue);
        // // console.log(this.state.items);
        // // console.log("new Date(lastValue.date).getTime() = ", new Date(lastValue[0].date).getTime(), ", new Date(this.idx).getTime() = ", new Date(this.idx).getTime())
        // if (new Date(lastValue[0].date).getTime() < new Date(this.idx).getTime()){
        //   return;
        // }
        // // console.log("this.idx = ", this.idx)
        // item = this.state.items[this.idx]
        //     console.log("item = ", item)

        // // console.log("AMK = ", this.idx, ", YARRAM = ", item);
        // // console.log("this.idx = ", this.idx);
        // var curr = new Date(this.idx);
        // // console.log(curr)
        // var next_idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        // // console.log("next_idx = ", next_idx);

        // // if (this.nested_idx === this.state.items[this.idx].length - 1){
        // //   this.nested_idx = 0;
        // //   this.idx = next_idx;
        // // } else {
        // //   this.nested_idx++;
        // // }
        // // console.log("currentDay = ", this.currDay);

        // // console.log("item = ", this.state.items);
        // // console.log("this.idx = ", this.idx, ", next_idx = ", next_idx)
        // // console.log("this.state.items[this.idx].date) = ", this.state.items[this.idx]);
        // // console.log("this.state.items[next_idx].date) = ", this.state.items[next_idx]);
        // // console.log("this.idx = ", this.idx);
        // // console.log("this.state.items = ", this.state.items);
        // // console.log("this.state.items = ", this.state.items[this.idx]);

        // // console.log("this.idx = ", this.idx, ", this.nested_idx = ", this.nested_idx, "");

        // var toRender = [];
        var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
        // console.log("item.index = ", item.index, ", item.index+1 = ", item.index.substring(0, item.index.length - 2) + (parseInt(item.index.substring(item.index.length - 2, item.index.length)) + 1).toString());
        // console.log("this.state.items = ", this.state.items[item.index]);
        // console.log("CURRENT DAY = ", this.currDay);
        // // console.log("item to be rendered = ", item);
        // // if (this.currDay.length === 0){
        //   // console.log("this.currentDay.length === 0 ");
        //   // console.log("item gonna be pushed ", item, " , this.currentDay = ", this.currDay);
        //   this.currDay.push(item);
        //   for (var i = 0; i < this.currDay.length; i++){
        //     console.log("pushing object into currDay 1 = ", this.currDay[i])
        //   }
        // if (this.currDay[0].date !== this.getNextEvent(this, this.nested_idx, this.idx).date){
        //   var singleEvent = this.currDay[0];
        //   this.currDay.length = 0;
        //   this.nested_idx = 0;
        //   // if (next_idx != lastValue.date){
        //   this.idx = next_idx;
        //   // } else { return }
        //   // if (this.nested_idx === this.state.items[this.idx].length - 1){
        //   //   console.log("nested_idx before change 1 = ", this.nested_idx, ", this.state.items[this.idx].length - 1 = ", this.state.items[this.idx].length - 1);
        //   //   this.nested_idx = 0;
        //   //   this.idx = next_idx;
        //   //   console.log("nested_idx after change 1 = ", this.nested_idx, ", this.idx = ", this.idx);
        //   // } else {
        //   //   console.log("ELSE 1 ");
        //   //   this.nested_idx++;
        //   //   // console.log("nested_idx after change = ", this.nested_idx, ", this.idx = ", this.idx);
        //   // }
        //   console.log("RETURN 1");
        //   return(
        //     <View style={styles.dayContainer}>
        //       <View style={{paddingLeft: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
        //         <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{curr.getDate()}</Text>
        //         <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[curr.getMonth()]}</Text>
        //       </View>
        //       <View style={styles.item_nelson} key={i}>
        //         <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{singleEvent.eventTitle}</Text>
        //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {singleEvent.startTime}</Text></Text>
        //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {singleEvent.endTime}</Text></Text>
        //       </View>
        //     </View>
        //     );
        // }
        // } else {
        // console.log("this.currentDay.length !== 0 ");
        // var last_idx = Object.keys(this.state.items).length;
        // this.currDay.push(item);
        // for (var i = 0; i < this.currDay.length; i++){
        //   // console.log("pushing object into currDay 2 = ", this.currDay[i])
        // }
        // console.log("this.currDay[0].date !== Object.keys(this.state.items)[Object.keys(this.state.items).length - 1] = ", this.currDay[0].date !== Object.keys(this.state.items)[Object.keys(this.state.items).length - 1])
        // console.log("this.state.items[this.state.items.length - 1] =  ", Object.keys(this.state.items)[Object.keys(this.state.items).length - 1]);
        // for (var i = 0; i < this.currDay.length)
        // console.log("next event = ", this.getNextEvent(this, this.nested_idx, this.idx));
        // if (this.currDay[this.currDay.length - 1].date !== this.getNextEvent(this, this.nested_idx, this.idx).date){

        // console.log("START this.nested_idx = ", this.nested_idx, ", this.idx = ", this.idx);
        // console.log("END events of the day being rendered = ", this.currDay);
        // console.log("this.currDay about to be emptied = ", this.currDay[this.currDay.length]);
        // if (this.currDay[0].courts === undefined){
        //   court_1 = court_2 = court_3 = court_4 = null;
        //   // console.log("court_1 = ", court_1, ", court_2 = ", court_2, ", court_3 = ", court_3, ", court_4 = ", court_4);
        //   var i = 0;
        //   // console.log("events of the day being rendered = ", this.currDay);
        //   var toRender = this.currDay.map((event) => {
        //     // console.log("rendering 1")
        //     // console.log(event.eventTitle, ", ", event.startTime, ", ", event.endTime);
        //     i++;
        //     return(
        //       <View style={styles.item_nelson} key={i}>
        //         <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
        //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
        //         <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
        //       </View>

        //     );
        //   });
        // } else if (this.currDay[0].courts.length === 0){
        //   // console.log("EMPTY COURTHOUSE");
        // }

        // else {

        for (var i = 0; i < item.length; i++){
            // console.log("rendering 2 = ", i, " - ", this.currDay.length)
            // console.log(this.currDay[i].eventTitle, ", ", this.currDay[i].date, ", ", this.currDay[i].startTime, ", ", this.currDay[i].endTime, ", ", this.currDay[i].courts);
            if (item[i].courts.includes(1)){
                // console.log("court 1 closed = ", this.currDay[i])
                court_1.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(2)){
                // console.log("court 2 closed = ", this.currDay[i])
                court_2.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(3)){
                // console.log("court 3 closed = ", this.currDay[i])
                court_3.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            if (item[i].courts.includes(4)){
                // console.log("court 4 closed = ", this.currDay[i])
                court_4.push(
                    <View style={styles.item_omac} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{item[i].eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {item[i].startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {item[i].endTime}</Text></Text>
                    </View>
                );
            }
            // console.log("COURT 1 = ", court_1);
        }
        // this.currDay.length = 0
        // }
        // this.currDay.length = 0;
        // console.log("Clearing currDay = ", this.currDay);
        // this.idx = next_idx
        // }
        // console.log("PUSH BABEE ", item);
        // this.currDay.push(item);
        // }
        // if (this.nested_idx === this.state.items[this.idx].length - 1){
        //   console.log("nested_idx before change = ", this.nested_idx, ", this.state.items[this.idx].length - 1 = ", this.state.items[this.idx].length - 1);
        //   this.nested_idx = 0;
        //   this.idx = next_idx;
        //   console.log("nested_idx after change = ", this.nested_idx, ", this.idx = ", this.idx);
        // } else {
        //   console.log("ELSE");
        //   this.nested_idx++;
        //   // console.log("nested_idx after change = ", this.nested_idx, ", this.idx = ", this.idx);
        // }
        // console.log("current day events at idx ", this.idx, " is ", this.currDay)
        // this.idx++;
        // var curr_idx_date = new Date(this.idx).getTime();
        // console.log("curr_idx_date = ", curr_idx_date);
        // var next_idx = new Date(curr_idx_date + 24 * 60 * 60 * 1000);
        // console.log("currentDate = ", currentDate.toISOString().split("T")[0])
        // this.idx =  this.idx.substring(0, strTime.length - 2) + (parseInt(strTime.substring(strTime.length - 2, strTime.length)) - 1).toString();
        // var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        // if (court_1 !== null){
        var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
        if (sum_len === 0){
            var i = 0
            var toRender = item.map((event) => {
                console.log("event  = ", event)
                i++;
                return(
                    <View style={styles.item_nelson} key={i}>
                        <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
                    </View>
                );
            });
            // console.log("RETURN 2");
            // return null;
            return (
                <View style={{marginTop: 0}}>
                    {toRender}
                </View>
            );
        }
        if (court_1.length === 0){ court_1.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_2.length === 0){ court_2.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_3.length === 0){ court_3.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
        if (court_4.length === 0){ court_4.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
        // console.log("Courts filled in");
        // console.log("Court 1 = ", court_1);
        // console.log("Court 2 = ", court_2);
        // console.log("Court 3 = ", court_3);
        // console.log("Court 1 = ", court_4);
        // console.log("RETURN 3 =");
        // console.log("Day = ", new Date(this.idx));
        // console.log("new Date(this.idx).getMonth() = ", new Date(this.idx).getMonth());
        // console.log("new Date(this.idx).getDay() = ", new Date(this.idx).getDate());
        // console.log("RETURN 3")
        var curr = new Date(this.idx);
        console.log("this.idx ANNNE = ", this.idx)
        this.idx = new Date(curr.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        return (
            <View>
                <View style={{paddingLeft: 10, marginTop: 10, marginBottom: 5, display: 'flex', flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{marginLeft: 5, fontSize: 30, textAlign: 'left', opacity: .8, alignSelf: 'flex-start'}}>{curr.getDate()}</Text>
                    <Text style={{marginLeft: 2, marginTop: 5, fontSize: 15, textAlign: 'left', opacity: .7, alignSelf: 'flex-start'}}>{months[curr.getMonth()]}</Text>
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
        // } else {
        console.log("RETURN 4");
        // }
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
        backgroundColor: 'white',
        width: 80,
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
    },
    item_nelson: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
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
        backgroundColor: 'green',
        // marginRight: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        marginBottom: 100,
    },
    columnTitleContainer: {
        fontSize: 20,
        marginBottom: 10,
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'blue',
        top: 0,
    },
    dayEventsContainer: {
        backgroundColor: 'grey',
        marginTop: 40,
    }
});
// import React, { Component } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet
// } from 'react-native';
// import {Agenda} from 'react-native-calendars';
//
// export default class FacilityCalendar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: {},
//             render: false,
//             repeatLoading: true,
//         };
//         this.events = [];
//         this.currDay = [];
//         console.log("URL EXT = ", this.props.urlExt)
//     }
//
//     componentWillMount(){
//         if (this.state.repeatLoading){
//             this.fetchCalendarData(this, this.props.urlExt);
//         }
//     }
//     getToday(){
//         var today = new Date();
//         var dd = today.getDate();
//         var mm = today.getMonth()+1; //January is 0!
//         var yyyy = today.getFullYear();
//
//         if(dd<10) {
//             dd = '0'+dd
//         }
//
//         if(mm<10) {
//             mm = '0'+mm
//         }
//
//         today = yyyy + '-' + mm + '-' + dd;
//         return today;
//     }
//
//     render() {
//         console.log("rendering...");
//         if (this.state.render){
//             var myThis = this;
//             return (
//                 <Agenda
//                     current={this.getToday()}
//                     minDate={this.getToday()}
//                     items={this.state.items}
//                     loadItemsForMonth={this.loadItems(myThis.events)}
//                     selected={this.getToday()}
//                     // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//                     // maxDate={'2012-05-30'}
//                     renderItem={this.renderItem.bind(this)}
//                     renderEmptyDate={this.renderEmptyDate.bind(this)}
//                     rowHasChanged={this.rowHasChanged.bind(this)}
//                     // pastScrollRange={0}
//                     // futureScrollRange={0}
//                     // onDayChange={console.log('day changed')}
//                 />
//             );
//         }
//         return null;
//     }
//
//
//     fetchCalendarData(myThis, urlExt){
//         console.log("Still fetching...");
//         fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
//             .then(function(response) {
//                 return response.json();
//             })
//             .then(function(myJson) {
//                 console.log("myJson = ", myJson);
//                 var date, startTime, endTime, eventTitle, court;
//                 myThis.events = myJson.map((event) => {
//                     event = event.split(" - ");
//                     event[0] = (event[0].replace("T", "X")).split("X");
//                     date = event[0][0];
//                     startTime = event[0][1].split("-")[0];
//                     endTime = ((event[1].replace("T", "X")).split("X"))[1].split('-')[0];
//                     eventTitle = event[2];
//                     // console.log("event = ", event);
//                     if (event.length === 4){ court = event[3]; }
//                     else {
//                         eventTitle = event[2].split("-")[0];
//                         if (event[2].split("-")[1] !== undefined ) { court = event[2].split("-")[1]; }
//                         // console.log("COURT = ", court); console.log("eventTitle = ", eventTitle);
//                         // if (event.length === 3){ eventTitle = }
//                     }
//                     // console.log("YARRAK");
//
//                     // console.log("eventTitle = ", eventTitle);
//
//                     if (court !== undefined){
//                         var courts = [];
//                         if (court.includes('1')){ courts.push(1); }
//                         if (court.includes('2')){ courts.push(2); }
//                         if (court.includes('3')){ courts.push(3); }
//                         if (court.includes('4')){ courts.push(4); }
//                         if (courts.length == 0){
//                             if (court.includes('ower')){
//                                 courts.push(1);
//                                 courts.push(2);
//                                 courts.push(3);
//                                 courts.push(4);
//                             } else if (court.includes('olleyball')){
//                                 courts.push(4)
//                             }
//                         }
//                     }
//
//                     // console.log("AMJIK");
//                     return(
//                         {
//                             date: date,
//                             startTime: startTime,
//                             endTime: endTime,
//                             eventTitle: eventTitle,
//                             courts: courts
//                         }
//                     );
//                 });
//                 myThis.setState({
//                     render: true,
//                 });
//             });
//     }
//
//
//     loadItems(events) {
//         // console.log("events = ", events)
//         // setTimeout(() => {
//         if (this.state.repeatLoading){
//             // console.log("LOADING");
//             this.state.items = []
//             for (let i = 0; i < events.length; i++) {
//                 var strTime = events[i].date;
//                 // console.log("strTime = ", strTime);
//                 // console.log("indexOneLess = ", indexOneLess);
//                 // strTime = strTime.substring(0, strTime.length - 2) + indexOneLess;
//                 // console.log("strTime after = ", strTime);
//                 var indexOneLess = strTime.substring(0, strTime.length - 2) + (parseInt(strTime.substring(strTime.length - 2, strTime.length)) - 1).toString();
//                 // console.log("indexOneLess = ", indexOneLess);
//                 if (!this.state.items[indexOneLess]) { this.state.items[indexOneLess] = []; }
//                 this.state.items[indexOneLess].push({
//                     index: indexOneLess,
//                     date: events[i].date,
//                     startTime: events[i].startTime.substring(0, 5),
//                     endTime: events[i].endTime.substring(0, 5),
//                     eventTitle: events[i].eventTitle,
//                     courts: events[i].courts,
//                     height: ((parseInt(events[i].endTime.substring(0, 3)) * 60 + parseInt(events[i].endTime.substring(3, 5))) - (parseInt(events[i].startTime.substring(0, 3)) * 60 + parseInt(events[i].startTime.substring(3, 5)))) / 60,
//                 });
//             }
//
//             const newItems = {};
//             Object.keys(this.state.items).forEach(key => {
//                 // console.log("KEY = ", key)
//                 var indexOneLess = key.substring(0, key.length - 2) + (parseInt(key.substring(key.length - 2, key.length)) - 1).toString();
//                 newItems[indexOneLess] = this.state.items[indexOneLess];
//                 // console.log("key = ", key, ", indexOneLess = ", indexOneLess, ", newItems[indexOneLess] = ", newItems[indexOneLess]);
//             });
//             this.setState({
//                 items: newItems,
//                 repeatLoading: false,
//             });
//         }
//
//         // }, 1000);
//     }
//
//     renderItem(item) {
//         console.log("this.state.items = ", this.state.items);
//         var toRender = [];
//         var court_1 = []; var court_2 = []; var court_3 = []; var court_4 = [];
//         // console.log("item.index = ", item.index, ", item.index+1 = ", item.index.substring(0, item.index.length - 2) + (parseInt(item.index.substring(item.index.length - 2, item.index.length)) + 1).toString());
//         // console.log("this.state.items = ", this.state.items[item.index]);
//         // console.log("initial length = ", this.currDay.length);
//         // console.log("item to be rendered = ", item);
//         if (this.currDay.length === 0){
//             // console.log("this.currentDay.length === 0 ", this.currDay.length);
//             // console.log("item gonna be pushed ", item, " , this.currentDay = ", this.currDay);
//             this.currDay.push(item);
//         } else {
//             // console.log("this.currentDay.length !== 0 ", this.currDay.length);
//             // console.log("this.currentDay[0] =  ", this.currDay[0]);
//             if (this.currDay[0].date !== item.date){
//                 if (this.currDay[0].courts === undefined){
//                     court_1 = court_2 = court_3 = court_4 = null;
//                     // console.log("court_1 = ", court_1, ", court_2 = ", court_2, ", court_3 = ", court_3, ", court_4 = ", court_4);
//                     var i = 0;
//                     var toRender = this.currDay.map((event) => {
//                         i++;
//                         return(
//                             <View style={styles.item_nelson} key={i}>
//                                 <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{event.eventTitle}</Text>
//                                 <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {event.startTime}</Text></Text>
//                                 <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {event.endTime}</Text></Text>
//                             </View>
//
//                         );
//                     });
//                 } else {
//                     for (var i = 0; i < this.currDay.length; i++){
//                         if (this.currDay[i].courts.includes(1)){
//                             court_1.push(
//                                 <View style={styles.item_omac} key={i}>
//                                     <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
//                                 </View>
//                             );
//                         }
//                         if (this.currDay[i].courts.includes(2)){
//                             court_2.push(
//                                 <View style={styles.item_omac} key={i}>
//                                     <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
//                                 </View>
//                             );
//                         }
//                         if (this.currDay[i].courts.includes(3)){
//                             court_3.push(
//                                 <View style={styles.item_omac} key={i}>
//                                     <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
//                                 </View>
//                             );
//                         }
//                         if (this.currDay[i].courts.includes(4)){
//                             court_4.push(
//                                 <View style={styles.item_omac} key={i}>
//                                     <Text style={{fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{this.currDay[i].eventTitle}</Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>S:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].startTime}</Text></Text>
//                                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>E:<Text style={{fontWeight: 'normal'}}> {this.currDay[i].endTime}</Text></Text>
//                                 </View>
//                             );
//                         }
//                     }
//                 }
//                 this.currDay.length = 0;
//             }
//             this.currDay.push(item);
//         }
//
//         if (court_1 !== null){
//             var sum_len = court_1.length + court_2.length + court_3.length + court_4.length;
//             if (sum_len === 0){
//                 return null
//             }
//             if (court_1.length === 0){ court_1.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
//             if (court_2.length === 0){ court_2.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
//             if (court_3.length === 0){ court_3.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
//             if (court_4.length === 0){ court_4.push( <Text style={{fontStyle: 'italic'}}>No Events</Text> ); }
//             return (
//                 <View style={styles.dayContainer}>
//                     <View style={styles.basketballCourt}>
//                         <Text style={styles.columnTitleContainer}>Court 1</Text>
//                         <View style={styles.dayEventsContainer}>
//                             {court_1}
//                         </View>
//                     </View>
//                     <View style={styles.basketballCourt}>
//                         <Text style={styles.columnTitleContainer}>Court 2</Text>
//                         <View style={styles.dayEventsContainer}>
//                             {court_2}
//                         </View>
//                     </View>
//                     <View style={styles.basketballCourt}>
//                         <Text style={styles.columnTitleContainer}>Court 3</Text>
//                         <View style={styles.dayEventsContainer}>
//                             {court_3}
//                         </View>
//                     </View>
//                     <View style={styles.basketballCourt}>
//                         <Text style={styles.columnTitleContainer}>Court 4</Text>
//                         <View style={styles.dayEventsContainer}>
//                             {court_4}
//                         </View>
//                     </View>
//                 </View>
//             );
//         } else {
//             return (
//                 <View style={{marginTop: 30}}>
//                     {toRender}
//                 </View>
//             );
//         }
//
//
//
//     }
//
//     renderEmptyDate() {
//         return (
//             <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//         );
//     }
//
//     rowHasChanged(r1, r2) {
//         return false;
//     }
//
//     timeToString(time) {
//         const date = new Date(time);
//         return date.toISOString().split('T')[0];
//     }
// }
//
// const styles = StyleSheet.create({
//     item_omac: {
//         backgroundColor: 'white',
//         width: 70,
//         flexWrap: 'wrap',
//         alignSelf: 'flex-start',
//         borderRadius: 5,
//         padding: 2,
//         marginBottom: 5,
//     },
//     item_nelson: {
//         backgroundColor: 'white',
//         flex: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginRight: 10,
//         marginTop: 5,
//     },
//     emptyDate: {
//         height: 15,
//         flex:1,
//         paddingTop: 30,
//     },
//     basketballCourt: {
//         flex: 1,
//         // backgroundColor: 'red',
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     dayContainer: {
//         height: 300,
//         flexDirection: 'row',
//         justifyContent:'space-between',
//         alignSelf: 'flex-start',
//         backgroundColor: 'green',
//         marginRight: 10,
//         marginTop: 35,
//         alignSelf: 'stretch',
//     },
//     columnTitleContainer: {
//         fontSize: 20,
//         marginBottom: 10,
//         position: 'absolute',
//         textAlign: 'center',
//         backgroundColor: 'blue',
//         top: 0,
//     },
//     dayEventsContainer: {
//         backgroundColor: 'grey',
//         marginTop: 40,
//     }
// });