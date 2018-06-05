import {PinLocation} from "../store/CurrentUserState";
import {AsyncStorage} from 'react-native'



export class LocationHelper {

    static currentLocation:PinLocation = {name:"", address:"", lat:0, lng:0, city:""}

    static locationName:string = '定位中...'

    static updateLocation = (location:PinLocation)=>{

        AsyncStorage.setItem('location_key',JSON.stringify(location),(error:any)=>{

            console.log('locatiotnitint + ' + JSON.stringify(location))

            // LocationHelper.currentLocation = location

            console.log('currentLocation = ' + JSON.stringify(LocationHelper.currentLocation))

            console.log('error = ' + error)
        })
    }

    static getLocation = (location:any)=>{

        AsyncStorage.getItem('location_key',(error:any,result:any)=>{

            const re = JSON.parse(result)

            location(re)

        })
    }

    static updateCurrentLocation = (location:PinLocation)=>{

        AsyncStorage.setItem('location_user_key',JSON.stringify(location),(error:any)=>{

            console.log('updateCurrentLocation + ' + JSON.stringify(location))

            LocationHelper.currentLocation = location

            console.log('error = ' + error)
        })
    }

    static getCurrentLocation = (location:any)=>{

        console.log('getCurrentLocation')

        AsyncStorage.getItem('location_user_key',(error:any,result:any)=>{

            console.log('getCurrentLocation = > result + ' + result, 'error + ' + error)

            const re = JSON.parse(result)


            console.log('getCurrentLocation = > re + ' + re)

            location(re)

        })
    }
}