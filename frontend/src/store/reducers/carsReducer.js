import {GET_ALL_CARS,  ALL_CARS_ERROR} from '../types'

const initialState = {
    cars:{},
    cars_loading:true,
    cars_error:{}
}

export default function citiesReducer(state = initialState, action){

    switch(action.type){

        case GET_ALL_CARS:
        return {
            ...state,
            cars:action.payload,
            cars_loading:false

        }
        case ALL_CARS_ERROR:
            return{
                cars_loading: false, 
                cars_error: action.payload 
            }
        default: return state
    }

}