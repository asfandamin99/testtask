// create a context
// provider
// consumer => useContext Hook

import axios from "axios";
import { useReducer } from "react";
import { useContext, createContext, useEffect, useState } from "react";
// import reducer from "../reducrer/productReducer";

const VehicleContext = createContext();

const VehicleContextProvider = ({ children }) => {
    const data = JSON.parse(localStorage.getItem('personalInfo'))

    const [vehicleList, setVehicleList] = useState([])
    const [paginationData, setPaginationData] = useState('')
    const [selectedValue, setSelectedValue] = useState('all')
    // const [selectedVerificationStatusValue, setSelectedVerificationStatusValue] = useState('all')
    // const [selectedAvailableValue, setSelectedAvailableValue] = useState('all')
    // const [selectedOnlineStatusValue, setSelectedOnlineStatusValue] = useState('all')
    // const [selectedStatusValue, setSelectedStatusValue] = useState('all')
    const [selectedSearchValue, setSelectedSearchValue] = useState('First Name')
    const [searchValue, setSearchValue] = useState("")

    // const [themes, setThemes] = useState("light");
    // const [open, setOpen] = useState(false);
    // const [matches, setMatches] = useState(
    //     window.matchMedia("(max-width: 576px)").matches
    // );
    // const onTouchEnd = () => {
    //     setOpen(false);
    // };
    // const onSwitch = () => {
    //     setOpen((c) => !c);
    // };

    // const themeToggler = () => {
    //     themes === "light" ? setThemes("dark") : setThemes("light");
    // };

    // useEffect(() => {
    //     window
    //         .matchMedia("(max-width: 576px)")
    //         .addEventListener("change", (e) => setMatches(e.matches));
    // }, []);

    // const verificationStatusHandleChange = (e) => {
    //     setSelectedVerificationStatusValue(e.target.value)
    // }

    // const availableHandleChange = (e) => {
    //     setSelectedAvailableValue(e.target.value)
    // }

    // const onlineStatusHandleChange = (e) => {
    //     setSelectedOnlineStatusValue(e.target.value)
    // }

    // const statusHandleChange = (e) => {
    //     setSelectedStatusValue(e.target.value)
    // }

    const categoryHandleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const selectedSearchHandleChange = (e) => {
        setSelectedSearchValue(e.target.value)
    }

    const searchHandleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const getVehiclesData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}driver/getAllCarsBrands?sType=${selectedValue == 'all' ? '' : selectedValue}`, {
            headers: {
                _id: data?.personalInfo?._id,
                access_token: data?.personalInfo?.access_token,
                cid: data?.personalInfo?.cid?._id,
                x_access_token: data?.personalInfo?.xaccesstoken,
                cityId: "",
            }
        })
        console.log("🚀 ~ file: DriversData.js:37 ~ getVehiclesData ~ res:", res?.data?.data)
        setVehicleList(res?.data?.data)
        setPaginationData(res?.data?.data?.pagination)
    }

    useEffect(() => {
        getVehiclesData()
    }, [selectedValue])

    return (
        <VehicleContext.Provider
            value={{
                // verificationStatusHandleChange,
                // availableHandleChange,
                // onlineStatusHandleChange,
                // statusHandleChange,
                categoryHandleChange,
                selectedSearchHandleChange,
                getVehiclesData,
                searchHandleChange,
                vehicleList,
                paginationData,
                searchValue,
                // driversList,
                // paginationData,
                selectedValue,
                // selectedVerificationStatusValue,
                // selectedAvailableValue,
                // selectedOnlineStatusValue,
                // selectedStatusValue,
                selectedSearchValue
            }}
        >
            {children}
        </VehicleContext.Provider>
    );
};

// custom hooks

const useVehicleContext = () => {
    return useContext(VehicleContext);
};

export { VehicleContextProvider, VehicleContext, useVehicleContext };