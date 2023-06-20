// create a context
// provider
// consumer => useContext Hook

import axios from "axios";
import { useReducer } from "react";
import { useContext, createContext, useEffect, useState } from "react";
// import reducer from "../reducrer/productReducer";

const PassengerContext = createContext();

const PassengerContextProvider = ({ children }) => {
    const data = JSON.parse(localStorage.getItem('personalInfo'))

    const [passengersList, setPassengersList] = useState([])
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

    const cityHandleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const selectedSearchHandleChange = (e) => {
        setSelectedSearchValue(e.target.value)
    }

    const searchHandleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const getPassengersData = async () => {
        // let payload = {}
        let fname = ''
        let lname = ''
        let phone = ''
        if (selectedSearchValue === 'First Name') {
            fname = searchValue
        } else if (selectedSearchValue === 'Last Name') {
            lname = searchValue
        } else if (selectedSearchValue === 'Phone') {
            phone = searchValue
        }
        let payload = {
            city: selectedValue,
            // status: selectedVerificationStatusValue == 'all' ? '' : selectedVerificationStatusValue,
            // flags: {
            //     is_available: selectedAvailableValue == 'all' ? '' : selectedAvailableValue,
            //     is_logged_in: selectedOnlineStatusValue == 'all' ? '' : selectedOnlineStatusValue,
            //     driver_status: selectedStatusValue == "all" ? '' : selectedStatusValue,
            // },
            search: {
                fname,
                lname,
                phone
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}admin/passengers`, payload, {
            headers: {
                _id: data?.personalInfo?._id,
                access_token: data?.personalInfo?.access_token,
                cid: data?.personalInfo?.cid?._id,
                x_access_token: data?.personalInfo?.xaccesstoken,
                cityId: "",
            }
        })
        console.log("🚀 ~ file: DriversData.js:37 ~ getdriversData ~ res:", res?.data?.data?.rows)
        setPassengersList(res?.data?.data?.rows)
        setPaginationData(res?.data?.data?.pagination)
    }

    useEffect(() => {
        getPassengersData()
    }, [selectedValue])

    return (
        <PassengerContext.Provider
            value={{
                // verificationStatusHandleChange,
                // availableHandleChange,
                // onlineStatusHandleChange,
                // statusHandleChange,
                cityHandleChange,
                selectedSearchHandleChange,
                getPassengersData,
                searchHandleChange,
                passengersList,
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
        </PassengerContext.Provider>
    );
};

// custom hooks

const usePassengerContext = () => {
    return useContext(PassengerContext);
};

export { PassengerContextProvider, PassengerContext, usePassengerContext };