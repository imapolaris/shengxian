declare module "react-native-audio"{

    export interface AudioRecorderOptions{
        SampleRate: number,
        Channels: number,
        AudioQuality: 'High'|'Low',
        AudioEncoding: string,
        OutputFormat: string,
        MeteringEnabled: boolean,
        MeasurementMode: boolean,
        AudioEncodingBitRate: number
    }
    export interface onProgressEventData{
        currentTime:number
    }
    export interface onFinishedEventData{
        status?:"OK" | "ERROR",
        audioFileURL?:string,
    }

    export interface AudioRecorderType{
        prepareRecordingAtPath:(path:string,options:AudioRecorderOptions)=>any,
        startRecording:()=>any,
        pauseRecording:()=>any,
        stopRecording:()=>any,
        onProgress:(data:onProgressEventData)=>any,
        onFinished:(data:onFinishedEventData)=>any,
    }

    export interface AudioUtilsType{
        MainBundlePath:string,
        DocumentDirectoryPath:string,
        CachesDirectoryPath:string,
        LibraryDirectoryPath:string,

        //@platform android
        PicturesDirectoryPath:string,
        MusicDirectoryPath:string,
        DownloadsDirectoryPath:string,
    }
    export let AudioRecorder:AudioRecorderType;
    export let AudioUtils:AudioRecorderType;
}