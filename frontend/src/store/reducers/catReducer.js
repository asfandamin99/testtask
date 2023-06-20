import {GET_ALL_CATEGORIES,  ALL_CATEGORIES_ERROR} from '../types'

const initialState = {
    categories:{},
    loading:true,
    error:{}
}

export default function catReducer(state = initialState, action){

    switch(action.type){

        case GET_ALL_CATEGORIES:
        return {
            ...state,
            categories:action.payload,
            loading:false

        }
        case ALL_CATEGORIES_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }
        default: return state
    }

}