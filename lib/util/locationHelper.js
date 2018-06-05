"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class LocationHelper {
}
LocationHelper.currentLocation = { name: "", address: "", lat: 0, lng: 0, city: "" };
LocationHelper.locationName = '定位中...';
LocationHelper.updateLocation = (location) => {
    react_native_1.AsyncStorage.setItem('location_key', JSON.stringify(location), (error) => {
        console.log('locatiotnitint + ' + JSON.stringify(location));
        // LocationHelper.currentLocation = location
        console.log('currentLocation = ' + JSON.stringify(LocationHelper.currentLocation));
        console.log('error = ' + error);
    });
};
LocationHelper.getLocation = (location) => {
    react_native_1.AsyncStorage.getItem('location_key', (error, result) => {
        const re = JSON.parse(result);
        location(re);
    });
};
LocationHelper.updateCurrentLocation = (location) => {
    react_native_1.AsyncStorage.setItem('location_user_key', JSON.stringify(location), (error) => {
        console.log('updateCurrentLocation + ' + JSON.stringify(location));
        LocationHelper.currentLocation = location;
        console.log('error = ' + error);
    });
};
LocationHelper.getCurrentLocation = (location) => {
    console.log('getCurrentLocation');
    react_native_1.AsyncStorage.getItem('location_user_key', (error, result) => {
        console.log('getCurrentLocation = > result + ' + result, 'error + ' + error);
        const re = JSON.parse(result);
        console.log('getCurrentLocation = > re + ' + re);
        location(re);
    });
};
exports.LocationHelper = LocationHelper;
//# sourceMappingURL=locationHelper.js.map