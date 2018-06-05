declare module "react-native-smart-amap-location"{
   export interface AMapLocationOptions{
       locationMode?:string,
       gpsFirst?:boolean
       httpTimeout?:number
       interval?:number
       needAddress?:boolean
       onceLocation?:boolean
       locationCacheEnable?:boolean
       onceLocationLatest?:boolean
       locationProtocol?:string
       sensorEnable?:boolean
       allowsBackgroundLocationUpdates?:boolean
   }
   export interface AMapLocation {
       init:(options:AMapLocationOptions|null)=>void,
       setOptions:(options:AMapLocationOptions)=>void,
       getReGeocode:()=>void,
       getLocation:()=>void,
       startUpdatingLocation:()=>void,
       stopUpdatingLocation:()=>void,
       cleanUp:()=>void
   }
   let aMap:AMapLocation;
   export default aMap;
}


