// create a context
// provider
// consumer => useContext Hook

import axios from "axios";
import { useReducer } from "react";
import { useContext, createContext, useEffect, useState } from "react";
// import reducer from "../reducrer/productReducer";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("personalInfo"));

  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedtext, setSelectedtext] = useState('all')
  const [driversList, setDriversList] = useState([]);


  // const [paginationData, setPaginationData] = useState('')
  // const [selectedValue, setSelectedValue] = useState('all')
  // const [selectedVerificationStatusValue, setSelectedVerificationStatusValue] = useState('all')
  // const [selectedAvailableValue, setSelectedAvailableValue] = useState('all')
  // const [selectedOnlineStatusValue, setSelectedOnlineStatusValue] = useState('all')
  // const [selectedStatusValue, setSelectedStatusValue] = useState('all')
  // const [selectedSearchValue, setSelectedSearchValue] = useState('First Name')
  // const [searchValue, setSearchValue] = useState("")

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
      setSelectedCity(e.target.value)
  }

  // const selectedSearchHandleChange = (e) => {
  //     setSelectedSearchValue(e.target.value)
  // }

  // const searchHandleChange = (e) => {
  //     setSearchValue(e.target.value)
  // }

  // const getdriversData = async () => {
  //     // let payload = {}
  //     let fName = ''
  //     let lName = ''
  //     let phone = ''
  //     if (selectedSearchValue === 'First Name') {
  //         fName = searchValue
  //     } else if (selectedSearchValue === 'Last Name') {
  //         lName = searchValue
  //     } else if (selectedSearchValue === 'Phone') {
  //         phone = searchValue
  //     }
  //     let payload = {
  //         city: selectedValue,
  //         status: selectedVerificationStatusValue == 'all' ? '' : selectedVerificationStatusValue,
  //         flags: {
  //             is_available: selectedAvailableValue == 'all' ? '' : selectedAvailableValue,
  //             is_logged_in: selectedOnlineStatusValue == 'all' ? '' : selectedOnlineStatusValue,
  //             driver_status: selectedStatusValue == "all" ? '' : selectedStatusValue,
  //         },
  //         search: {
  //             fName,
  //             lName,
  //             phone
  //         }
  //     }
  //     const res = await axios.post(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}admin/drivers`, payload, {
  //         headers: {
  //             _id: data?.personalInfo?._id,
  //             access_token: data?.personalInfo?.access_token,
  //             cid: data?.personalInfo?.cid?._id,
  //             x_access_token: data?.personalInfo?.xaccesstoken,
  //             cityId: "",
  //         }
  //     })
  //     console.log("🚀 ~ file: DriversData.js:37 ~ getdriversData ~ res:", res?.data?.data?.rows)
  //     setDriversList(res?.data?.data?.rows)
  //     setPaginationData(res?.data?.data?.pagination)
  // }

  // useEffect(() => {
  //     getdriversData()
  // }, [selectedValue, selectedVerificationStatusValue, selectedAvailableValue, selectedOnlineStatusValue, selectedStatusValue])
  const getCitiesData = async () => {
    await axios
      .get(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}dispatch/cities`, {
        headers: {
          _id: data?.personalInfo?._id,
          access_token: data?.personalInfo?.access_token,
          cid: data?.personalInfo?.cid?._id,
          x_access_token: data?.personalInfo?.xaccesstoken,
        },
      })
      .then((response) => {
       
        if (response.status === 200) {
           
           setCitiesList(response.data)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getALLDriversData = async () => {
    await axios
      .get(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}dispatch/drivers?text=all&city=all`, {
        headers: {
          _id: data?.personalInfo?._id,
          access_token: data?.personalInfo?.access_token,
          cid: data?.personalInfo?.cid?._id,
          x_access_token: data?.personalInfo?.xaccesstoken,
        },
      })
      .then((response) => {
      
        if (response.status === 200) {
          console.log(
            "🚀 ~ file: CITITES CONTEXT.js:159 ~ ALL DRIVERS ~ res:",
            response
          );
          setDriversList(response.data.drivers)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    getCitiesData();
  }, []);
  
  useEffect(() => {
    getALLDriversData();
  }, []);


  const getDriversData = async () => {
    await axios
      .get(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}dispatch/drivers?text=${selectedtext}&city=${selectedCity}`, {
        headers: {
          _id: data?.personalInfo?._id,
          access_token: data?.personalInfo?.access_token,
          cid: data?.personalInfo?.cid?._id,
          x_access_token: data?.personalInfo?.xaccesstoken,
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: CITITES CONTEXT.js:164 ~ DRIVERS ~ res:",
          response
        );
        if (response.status === 200) {
           
          setDriversList(response.drivers)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDriversData();
  }, [selectedCity]);

  useEffect(() => {
    getALLDriversData();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        // verificationStatusHandleChange,
        // availableHandleChange,
        // onlineStatusHandleChange,
        // statusHandleChange,
        cityHandleChange,
        // selectedSearchHandleChange,
        // getdriversData,
        // searchHandleChange,
        // searchValue,
        // driversList,
        // paginationData,
        // selectedValue,
        // selectedVerificationStatusValue,
        // selectedAvailableValue,
        // selectedOnlineStatusValue,
        // selectedStatusValue,
        // selectedSearchValue,
        citiesList,
        getCitiesData,
        driversList,
        getDriversData,
        selectedCity,
        getALLDriversData
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// custom hooks

const useProductContext = () => {
  return useContext(CitiesContext);
};

export { CitiesProvider, CitiesContext, useProductContext };
