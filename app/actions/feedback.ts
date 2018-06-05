import {createAction, createAsyncRequestAction} from "../common/utils/action";
import * as ActionTypes from "../constants/ActionTypes";
import {HttpMethod} from "../http/api";
import {Url} from "../constants/http";


export interface FeedbackData{
    feed_text:string    
    images:Array<string>
    phone:string
}

export const feedback =(args:FeedbackData)=>(createAsyncRequestAction(ActionTypes.START_FEED_BACK,{
    returnAction:ActionTypes.FINISH_FEED_BACK,
    method:HttpMethod.POST,
    url:Url.FEEDBACK,
    data:args,
    timeout:false,
    loading:true,
    handleError:false
}));
