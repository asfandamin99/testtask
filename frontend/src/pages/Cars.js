import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Container, Typography , TextField, Modal} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { getCategories  } from "../store/actions/categoriesActions";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getCars} from "../store/actions/carsActions";
import CarsOpt from "./CarsOpt"
import { toast } from 'react-toastify';

import axios from 'axios'

// ----------------------------------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Cars() {
  const theme = useTheme();

  const [make, setMake] = useState("") 
  const [model, setModel] = useState("") 
  const [color, setColor] = useState("") 
  const [reg_no, setReg_No] = useState("")
  const [catId, setCatId] = useState("")




  const dispatch = useDispatch();

  const catListData = useSelector((state) => state.catList);
  const { loading, error, categories } = catListData;


  
 

  const carListData = useSelector((state) => state.carsList);
  const { cars_loading, cars_error, cars } = carListData;

// console.log("SELECTOR =>",categories)
  
const [open, setOpen] = useState(false);
const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
useEffect(() => {
  dispatch(getCategories());
}, [dispatch]);


  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

const [catname, setCatName] = useState("")
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 350 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'reg_no', headerName: 'Registartion No', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },


    {
      field: 'action', headerName: 'Action', width: 130, renderCell: (params) => (
          <CarsOpt {...{ params }} />
      )
  },
  ];

  const rows = 
    cars?.data?.all_vehicles.map((item)=>{
     return { id: item?._id, make: item?.make, model:item?.model, color: item?.color, reg_no:item?.reg_no, category: item?.category?.name }
    })


    
    const row1 = [
      { id: 1, make: "abc" , model:'123' , color: "white" ,reg_no : "abc-123" , category:"suv"  },
      { id: 2, make: "abd" , model:'16' , color: "black" ,reg_no : "abc-1234" , category:"bus"  },
    ]
  
  // const page= categories?.data?.pagination?.page
  // const pageSize = categories?.data?.pagination?.count
  // console.log("page *** =>",pageSize)
  const handleChange = (event) => {
    setCatId(event.target.value);
  };

  const handleAddCar = async () => {
    
    const data = JSON.parse(sessionStorage.getItem("token"));

    const Headers = {
      Authorization: `Bearer ${data}`,
    };
if(make === "" || model === "" || color === "" || reg_no === "" || catId === ""){
  toast.error("pleasw complete the form")
}else{
    const body = {
      make:make,
      model:model,
      color:color,
      reg_no:reg_no,
      category:catId
    }


    try {
      
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_API_ENDPOINT}car/add`,
          body,
          { headers: Headers }
        );
        console.log(res);
        if (res?.data?.error === false) {
          setTimeout(toast.success(res?.data?.info),5000)
          window.location.reload();
        } else {
          setTimeout(toast.error(res?.data?.info),5000)
          window.location.reload();
        }
      
    } catch (error) {
      console.error(error);
    }
  }
  };
  return (
    <>
      <Helmet>
        <title> Test Task </title>
      </Helmet>
      <Card sx={{ maxWidth: 1200, marginTop:'4vh',   }}>
      
      <CardContent>
        <h4>CRUD OPERATIONS Cars </h4>
      <Box mb={3}>
      <Button  sx={{marginLeft:"2vw"}} onClick={handleOpen}>Add Car</Button>
      </Box>
     
     
      <Box sx={{ height: 400, width: '100%' }}>
      {cars_loading === false && cars ? 
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10]}
      />
      : <><p>Loading</p></> }
      </Box>
      </CardContent>
      
    </Card>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Car
          </Typography>
          <Box my={2}>
      <TextField id="outlined-basic" label="Enter Make" variant="outlined" size="small" onChange={(e)=>{setMake(e.target.value)}}  />
      <TextField id="outlined-basic" label="Enter Model" variant="outlined" size="small" onChange={(e)=>{setModel(e.target.value)}} sx={{marginTop:'1vh'}} />
      <TextField id="outlined-basic" label="Enter Color" variant="outlined" size="small" onChange={(e)=>{setColor(e.target.value)}} sx={{marginTop:'1vh'}} />
      <TextField id="outlined-basic" label="Enter Regsitration No" variant="outlined" size="small" onChange={(e)=>{setReg_No(e.target.value)}} sx={{marginTop:'1vh'}}/>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={catId}
          onChange={handleChange}
          label="categories"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         {loading === false && categories ? categories?.data.categories.map((e)=>{
          return <MenuItem value={e._id}>{e.name}</MenuItem>
         }):<p>loading</p>}
        </Select>
      </FormControl>
           
           
          </Box>
          <Button sx={{ marginLeft: "2vw" }} onClick={handleAddCar} >
              Submit
            </Button>
        </Box>
      </Modal>

    </>
  );
}
