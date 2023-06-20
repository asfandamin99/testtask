import {GET_ALL_CATEGORIES,  ALL_CATEGORIES_ERROR , ADD_CATEGORY, ADD_CATEGORY_ERROR, UD_CATEGORY, UD_CATEGORY_ERROR} from '../types'
import axios from 'axios'



export const getCategories = () => async dispatch => {
   
const data = JSON.parse(sessionStorage.getItem("token"));


const Headers = {
    Authorization:`Bearer ${data}`
}
    
const body = {
    page:0,
    perPage:5, 
    sort_order:-1
}
    try{
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}category/getall`, body, 
        { headers: Headers,
        })
        dispatch( {
            type: GET_ALL_CATEGORIES,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: ALL_CATEGORIES_ERROR,
            payload: error,
        })
    }

}



