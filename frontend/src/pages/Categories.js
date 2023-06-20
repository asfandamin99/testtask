import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Container, Typography , TextField} from "@mui/material";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getCategories  ,ADD_Category} from "../store/actions/categoriesActions";
import CatOpt from "./CategoriesOpt"
import { toast } from 'react-toastify';

import axios from 'axios'

// ----------------------------------------------------------------------


export default function Categories() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const catListData = useSelector((state) => state.catList);
  const { loading, error, categories } = catListData;


  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

const [catname, setCatName] = useState("")
  
const handleAdd = async () =>{
  const data = JSON.parse(sessionStorage.getItem("token"));
        
        
  const Headers = {
      Authorization:`Bearer ${data}`
  }
      
      try{
          if(catname !== ""){
          const res = await axios.post(`${process.env.REACT_APP_PUBLIC_API_ENDPOINT}category/add`, {name:catname}, 
          { headers: Headers,
          })
         
          console.log("RESPONSE => ",res)
          if(res?.data?.error === false){
             setTimeout(toast.success(res?.data?.info), 15000)
              window.location.reload()
              
          }
          else{
              setTimeout(toast.error(res?.data?.info),5000)
              window.location.reload()
          }
      }else{
          toast.error("please enter name")

      }

      }
      catch(error){
        console.error(error)
      }
 
} 

  const columns = [
    { field: 'id', headerName: 'ID', width: 350 },
    { field: 'name', headerName: 'Category Name', width: 130 },
    {
      field: 'action', headerName: 'Action', width: 130, renderCell: (params) => (
          <CatOpt {...{ params }} />
      )
  },
  ];

  const rows = 
    categories?.data?.categories.map((item)=>{
     return { id: item._id, name: item.name }
    })
    
    const row1 = [
      { id: 1, name: "abc" },
      { id: 2, name: "zxc" }
    ]
  
  // const page= categories?.data?.pagination?.page
  // const pageSize = categories?.data?.pagination?.count
  // console.log("page *** =>",pageSize)

  return (
    <>
      <Helmet>
        <title> Test Task </title>
      </Helmet>
      <Card sx={{ maxWidth: 600, marginTop:'4vh', marginLeft:'20vw'  }}>
      
      <CardContent>
        <h4>CRUD OPERATIONS OF VEHICLES CATEGORIES </h4>
      <Box mb={3}>
      <TextField id="outlined-basic" label="Enter Category Name" variant="outlined" size="small" onChange={(e)=>{setCatName(e.target.value)}} />
      <Button  sx={{marginLeft:"2vw"}} onClick={handleAdd}>Add Category</Button>
      </Box>
     
     
      <Box sx={{ height: 400, width: '100%' }}>
      {loading === false && categories ? 
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
    </>
  );
}
