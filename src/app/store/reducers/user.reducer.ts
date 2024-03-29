import *  as userAction from '../actions/user.actions';
import { userModel } from 'src/app/model/user.model';
import { act } from '@ngrx/effects';

export interface UserState{
    users: userModel[];
    loading : boolean;
    loaded : boolean;
    errorMsg?: string;
}
export const initialUserState:UserState={
    users : [],
    loading : false,
    loaded : false,
    errorMsg : ''
}
export function userReducer(state = initialUserState, action : userAction.allUserActions) : UserState{

    switch(action.type){
        case userAction.UserActions.USER_ADD : {
            return {
                ...state,
                loading:true,
                loaded : false,
                errorMsg : ''
            }
        }
        case userAction.UserActions.USER_ADD_FAIL : {
            return {
                ...state,
                loading : false,
                loaded : false,
                errorMsg : action.payload
                }
        }
        case userAction.UserActions.USER_ADD_SUCCESS : {
            //const data= Object.values(action.payload);
            return {
                ...state,
                loading:false,
                errorMsg : '',
                loaded : true,
                users : [...state.users,action.payload]
            }
        }
        case userAction.UserActions.GET_USERS : {

            
                return {
                    ...state,
                    loading:true,
                    loaded : false,
                    errorMsg : ''
                }
            
        }
        case userAction.UserActions.GET_USERS_FAIL : {

            
            return {
                ...state,
                loading: false,
                loaded : false,
                errorMsg : action.payload
            }
        
    }
    case userAction.UserActions.GET_USERS_SUCCESS : {
        if(action.payload == null || action.payload ==undefined){
            return {
                ...state,
                loading: false,
                loaded : true,
                errorMsg : '',
                users : []
            }
        }
        else{

        
        const data= Object.values(action.payload);
        
        return {
            ...state,
            loading: false,
            loaded : true,
            errorMsg : '',
            users : [...data]
        }
        }
    }
    case userAction.UserActions.UPDATE_USER : {
        return {
            ...state,
            loading : true,
            loaded : false,
            errorMsg : ''
        }
    }
    case userAction.UserActions.UPDATE_USER_SUCCESS : {
        const updatedUsers : userModel[]=state.users.map(
            (user) => {
                if(user.id===action.payload.id){
                    return action.payload;
                }
                else{
                    return user;
                }
            }
        )
        return{
            ...state,
            loaded : true,
            loading : false,
            users : [...updatedUsers],
            
        }
    }
    case userAction.UserActions.UPDATE_USER_FAIL : {
        return {
            ...state,
            loaded : false,
            loading : false,
            errorMsg : action.payload
        }
    }
   
       
    }
    return state;
}


export const getUsers = (userState : UserState) => userState.users;
export const getLoading =  (userState : UserState) => userState.loading;
export const getLoaded =  (userState : UserState) => userState.loaded;
export const getErrorMsg =  (userState : UserState) => userState.errorMsg;