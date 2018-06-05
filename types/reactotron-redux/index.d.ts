declare module 'reactotron-redux' {
    import {Reactotron} from 'reactotron-react-native'


    export interface PluginConfig{
        except?:string[],
        isActionImportant?:(action:any)=>boolean
        onBackup?:()=>void,
        onRestore?:()=>void
    }
    const enhancer:(reactotron:Reactotron, enhancerOptions:any)=>void;

    export const reactotronRedux:(pluginConfig:PluginConfig)=>(reactotron:Reactotron)=>Reactotron;

    export default enhancer
}