import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

// import Types from './NavigationTypes';
// import Actions from './Actions';
// import Transitions from './Transitions';

import FitnessScreen from './nelson_screens/fitnessScreen';
import PoolScreen from './nelson_screens/poolScreen';

import BasketballScreen from './omac_screens/basketballScreen';
import TrackScreen from './omac_screens/trackScreen';
import VolleyballScreen from './omac_screens/volleyballScreen';
import BadmintonScreen from './omac_screens/badmintonScreen';
import FacilityButtonBasketball from './FacilityButtonBasketball';
import FacilityButtonPool from './FacilityButtonPool';
import FacilityButtonTrack from './FacilityButtonTrack';

import FacilityCalendarPage from './FacilityCalendarPage';
// import Drawer from './types/Drawer';
// import ListScreen from './types/ListScreen';
import HomeScreen from './HomeScreen';
import permissions from './permissions';
// import LightBox from './types/LightBox';
// import Notification from './types/Notification';
// import Modal from './types/Modal';
// import CustomTopBarScreen from './types/CustomTopBarScreen';
// import CustomButtonScreen from './types/CustomButtonScreen';
// import TopTabs from './types/TopTabs';
// import TabOne from './types/tabs/TabOne';
// import TabTwo from './types/tabs/TabTwo';

// import CollapsingHeader from './transitions/CollapsingHeader';
// import SharedElementTransitions from './transitions/SharedElementTransitions';
//
// import Cards from './transitions/sharedElementTransitions/Cards/Cards';
// import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';
//
// import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
// import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';

export function registerScreens() {
    // Navigation.registerComponent('example.Types', () => Types);
    // Navigation.registerComponent('example.Actions', () => Actions);
    // Navigation.registerComponent('example.Transitions', () => Transitions);
    //
    Navigation.registerComponent('PickApp.Screens.FitnessScreen', () => FitnessScreen);
    Navigation.registerComponent('PickApp.Screens.PoolScreen', () => PoolScreen);
    Navigation.registerComponent('PickApp.Screens.BasketballScreen', () => BasketballScreen);
    Navigation.registerComponent('PickApp.Screens.TrackScreen', () => TrackScreen);
    Navigation.registerComponent('PickApp.Screens.VolleyballScreen', () => VolleyballScreen);
    Navigation.registerComponent('PickApp.Screens.BadmintonScreen', () => BadmintonScreen);

    Navigation.registerComponent('PickApp.Screens.FacilityCalendarPage', () => FacilityCalendarPage);

    Navigation.registerComponent('PickApp.Screens.FacilityButtonBasketball', () => FacilityButtonBasketball);
    Navigation.registerComponent('PickApp.Screens.FacilityButtonPool', () => FacilityButtonPool);
    Navigation.registerComponent('PickApp.Screens.FacilityButtonTrack', () => FacilityButtonTrack);

    // Navigation.registerComponent('example.Types.Drawer', () => Drawer);
    // Navigation.registerComponent('example.Types.Screen', () => Drawer);
    // Navigation.registerComponent('example.Types.ListScreen', () => ListScreen);
    Navigation.registerComponent('PickApp.Screens.HomeScreen', () => HomeScreen);
    Navigation.registerComponent('PickApp.Screens.permissions', () => permissions);
    // Navigation.registerComponent('example.Types.Modal', () => Modal);
    // Navigation.registerComponent('example.Types.LightBox', () => LightBox);
    // Navigation.registerComponent('example.Types.Notification', () => Notification);
    // Navigation.registerComponent('example.Types.CustomTopBarScreen', () => CustomTopBarScreen);
    // Navigation.registerComponent('example.Types.CustomButtonScreen', () => CustomButtonScreen);
    // Navigation.registerComponent('example.Types.TopTabs', () => TopTabs);
    // Navigation.registerComponent('example.Types.TopTabs.TabOne', () => TabOne);
    // Navigation.registerComponent('example.Types.TopTabs.TabTwo', () => TabTwo);
    //
    // Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
    // Navigation.registerComponent('example.Transitions.SharedElementTransitions', () => SharedElementTransitions);
    // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
    // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
    // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry', () => Masonry);
    // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}

// import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
//
// // import Types from './NavigationTypes';


// // import Actions from './Actions';
// // import Transitions from './Transitions';
//
// // import FitnessScreen from './nelson_screens/FitnessScreen';
// // import PoolScreen from './nelson_screens/PoolScreen';
// //
// // import BasketballScreen from './omac_screens/BasketballScreen';
// // import TrackScreen from './omac_screens/TrackScreen';
// // import VolleyballScreen from './omac_screens/VolleyballScreen';
// // import BadmintonScreen from './omac_screens/BadmintonScreen';
// import FacilityButtonBasketball from './FacilityButtonBasketball';
// import FacilityButtonPool from './FacilityButtonPool';
// import FacilityButtonTrack from './FacilityButtonTrack';
//
// // import Drawer from './types/Drawer';
// // import ListScreen from './types/ListScreen';
// import HomeScreen from './HomeScreen';
// import permissions from './permissions';
// // import LightBox from './types/LightBox';
// // import Notification from './types/Notification';
// // import Modal from './types/Modal';
// // import CustomTopBarScreen from './types/CustomTopBarScreen';
// // import CustomButtonScreen from './types/CustomButtonScreen';
// // import TopTabs from './types/TopTabs';
// // import TabOne from './types/tabs/TabOne';
// // import TabTwo from './types/tabs/TabTwo';
//
// // import CollapsingHeader from './transitions/CollapsingHeader';
// // import SharedElementTransitions from './transitions/SharedElementTransitions';
// //
// // import Cards from './transitions/sharedElementTransitions/Cards/Cards';
// // import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';
// //
// // import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
// // import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';
//
// export function registerScreens() {
//     // Navigation.registerComponent('example.Types', () => Types);
//     // Navigation.registerComponent('example.Actions', () => Actions);
//     // Navigation.registerComponent('example.Transitions', () => Transitions);
//     //
//     // Navigation.registerComponent('PickApp.Screens.FitnessScreen', () => FitnessScreen);
//     // Navigation.registerComponent('PickApp.Screens.PoolScreen', () => PoolScreen);
//     // Navigation.registerComponent('PickApp.Screens.BasketballScreen', () => BasketballScreen);
//     // Navigation.registerComponent('PickApp.Screens.TrackScreen', () => TrackScreen);
//     // Navigation.registerComponent('PickApp.Screens.VolleyballScreen', () => VolleyballScreen);
//     // Navigation.registerComponent('PickApp.Screens.BadmintonScreen', () => BadmintonScreen);
//
//
//     Navigation.registerComponent('PickApp.Screens.FacilityButtonBasketball', () => FacilityButtonBasketball);
//     Navigation.registerComponent('PickApp.Screens.FacilityButtonPool', () => FacilityButtonPool);
//     Navigation.registerComponent('PickApp.Screens.FacilityButtonTrack', () => FacilityButtonTrack);
//
//     // Navigation.registerComponent('example.Types.Drawer', () => Drawer);
//     // Navigation.registerComponent('example.Types.Screen', () => Drawer);
//     // Navigation.registerComponent('example.Types.ListScreen', () => ListScreen);
//     Navigation.registerComponent('PickApp.Screens.HomeScreen', () => HomeScreen);
//     Navigation.registerComponent('PickApp.Screens.permissions', () => permissions);
//     // Navigation.registerComponent('example.Types.Modal', () => Modal);
//     // Navigation.registerComponent('example.Types.LightBox', () => LightBox);
//     // Navigation.registerComponent('example.Types.Notification', () => Notification);
//     // Navigation.registerComponent('example.Types.CustomTopBarScreen', () => CustomTopBarScreen);
//     // Navigation.registerComponent('example.Types.CustomButtonScreen', () => CustomButtonScreen);
//     // Navigation.registerComponent('example.Types.TopTabs', () => TopTabs);
//     // Navigation.registerComponent('example.Types.TopTabs.TabOne', () => TabOne);
//     // Navigation.registerComponent('example.Types.TopTabs.TabTwo', () => TabTwo);
//     //
//     // Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
//     // Navigation.registerComponent('example.Transitions.SharedElementTransitions', () => SharedElementTransitions);
//     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
//     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
//     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry', () => Masonry);
//     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
// }
//
// export function registerScreenVisibilityListener() {
//     new ScreenVisibilityListener({
//         willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
//         didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
//         willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
//         didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
//     }).register();
// }
// // import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
// //
// // // import Types from './NavigationTypes';
// // // import Actions from './Actions';
// // // import Transitions from './Transitions';
// //
// // import fitnessScreen from './nelson_screens/fitnessScreen';
// // import poolScreen from './nelson_screens/poolScreen';
// //
// // import basketballScreen from './omac_screens/basketballScreen';
// // import trackScreen from './omac_screens/trackScreen';
// // import volleyballScreen from './omac_screens/volleyballScreen';
// // import badmintonScreen from './omac_screens/badmintonScreen';
// // // import Drawer from './types/Drawer';
// // // import ListScreen from './types/ListScreen';
// // import HomeScreen from './HomeScreen';
// // import permissions from './permissions';
// // // import LightBox from './types/LightBox';
// // // import Notification from './types/Notification';
// // // import Modal from './types/Modal';
// // // import CustomTopBarScreen from './types/CustomTopBarScreen';
// // // import CustomButtonScreen from './types/CustomButtonScreen';
// // // import TopTabs from './types/TopTabs';
// // // import TabOne from './types/tabs/TabOne';
// // // import TabTwo from './types/tabs/TabTwo';
// //
// // // import CollapsingHeader from './transitions/CollapsingHeader';
// // // import SharedElementTransitions from './transitions/SharedElementTransitions';
// // //
// // // import Cards from './transitions/sharedElementTransitions/Cards/Cards';
// // // import CardsInfo from './transitions/sharedElementTransitions/Cards/Info';
// // //
// // // import Masonry from './transitions/sharedElementTransitions/Masonry/Masonry';
// // // import MasonryItem from './transitions/sharedElementTransitions/Masonry/Item';
// //
// // export function registerScreens() {
// //     // Navigation.registerComponent('example.Types', () => Types);
// //     // Navigation.registerComponent('example.Actions', () => Actions);
// //     // Navigation.registerComponent('example.Transitions', () => Transitions);
// //     //
// //     Navigation.registerComponent('PickApp.Screens.fitnessScreen', () => fitnessScreen);
// //     Navigation.registerComponent('PickApp.Screens.poolScreen', () => poolScreen);
// //
// //     Navigation.registerComponent('PickApp.Screens.basketballScreen', () => basketballScreen);
// //     Navigation.registerComponent('PickApp.Screens.trackScreen', () => trackScreen);
// //     Navigation.registerComponent('PickApp.Screens.volleyballScreen', () => volleyballScreen);
// //     Navigation.registerComponent('PickApp.Screens.badmintonScreen', () => badmintonScreen);
// //
// //     // Navigation.registerComponent('example.Types.Drawer', () => Drawer);
// //     // Navigation.registerComponent('example.Types.Screen', () => Drawer);
// //     // Navigation.registerComponent('example.Types.ListScreen', () => ListScreen);
// //     Navigation.registerComponent('PickApp.Screens.HomeScreen', () => HomeScreen);
// //     Navigation.registerComponent('PickApp.Screens.permissions', () => permissions);
// //     // Navigation.registerComponent('example.Types.Modal', () => Modal);
// //     // Navigation.registerComponent('example.Types.LightBox', () => LightBox);
// //     // Navigation.registerComponent('example.Types.Notification', () => Notification);
// //     // Navigation.registerComponent('example.Types.CustomTopBarScreen', () => CustomTopBarScreen);
// //     // Navigation.registerComponent('example.Types.CustomButtonScreen', () => CustomButtonScreen);
// //     // Navigation.registerComponent('example.Types.TopTabs', () => TopTabs);
// //     // Navigation.registerComponent('example.Types.TopTabs.TabOne', () => TabOne);
// //     // Navigation.registerComponent('example.Types.TopTabs.TabTwo', () => TabTwo);
// //     //
// //     // Navigation.registerComponent('example.Transitions.CollapsingHeader', () => CollapsingHeader);
// //     // Navigation.registerComponent('example.Transitions.SharedElementTransitions', () => SharedElementTransitions);
// //     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards', () => Cards);
// //     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Cards.Info', () => CardsInfo);
// //     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry', () => Masonry);
// //     // Navigation.registerComponent('example.Transitions.SharedElementTransitions.Masonry.Item', () => MasonryItem);
// // }
// //
// // export function registerScreenVisibilityListener() {
// //     new ScreenVisibilityListener({
// //         willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
// //         didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
// //         willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
// //         didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
// //     }).register();
// // }
