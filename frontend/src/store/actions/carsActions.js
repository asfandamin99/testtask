import {GET_ALL_CARS,  ALL_CARS_ERROR} from '../types'
import axios from 'axios'



export const getCars = () => async dispatch => {
   
const data = JSON.parse(sessionStorage.getItem("token"));


const Headers = {
    Authorization:`Bearer ${data}`
}
    
const body = {
    page:0,
    perPage:20, 
    sort_order:-1
}
    try{
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}car/getall`, body, 
        { headers: Headers,
        })
        dispatch( {
            type: GET_ALL_CARS,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: ALL_CARS_ERROR,
            payload: error,
        })
    }

}