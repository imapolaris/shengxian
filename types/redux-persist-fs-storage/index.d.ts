declare module 'redux-persist-fs-storage' {
    export const DocumentDir:string;
    export const CacheDir:string;
    export default function FSStorage(location?:string,folder?:string):Object;
}