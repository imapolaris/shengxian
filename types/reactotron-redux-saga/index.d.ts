declare module 'reactotron-redux-saga' {
    import {Reactotron} from 'reactotron-react-native'

    interface PluginConfig{
    }
    const reactotronReduxSaga:(pluginConfig:PluginConfig)=>(reactotron:Reactotron)=>Reactotron;
    export = reactotronReduxSaga
}