// create a context
// provider
// consumer => useContext Hook

import axios from "axios";
import { useReducer } from "react";
import { useContext, createContext, useEffect, useState } from "react";
// import reducer from "../reducrer/productReducer";

const AirportContext = createContext();

const AirportContextProvider = ({ children }) => {
    const data = JSON.parse(localStorage.getItem('personalInfo'))

    const [airportList, setAirportList] = useState([])
    const [paginationData, setPaginationData] = useState('')

    const getAirportData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}admin/airport/list`, {
            headers: {
                _id: data?.personalInfo?._id,
                access_token: data?.personalInfo?.access_token,
                cid: data?.personalInfo?.cid?._id,
                x_access_token: data?.personalInfo?.xaccesstoken,
                cityId: "",
            }
        })
        console.log("🚀 ~ file: DriversData.js:37 ~ getairportData ~ res:", res?.data?.data?.rows)
        setAirportList(res?.data?.data?.rows)
        setPaginationData(res?.data?.data?.pagination)
    }

    useEffect(() => {
        getAirportData()
    }, [])

    return (
        <AirportContext.Provider
            value={{
                getAirportData,
                airportList,
                paginationData,
            }}
        >
            {children}
        </AirportContext.Provider>
    );
};

// custom hooks

const useAirportContext = () => {
    return useContext(AirportContext);
};

export { AirportContextProvider, AirportContext, useAirportContext };