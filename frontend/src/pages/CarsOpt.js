import React, { useState,useEffect } from "react";
import {
  Box,
  Tooltip,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EditIcon from "../assests/icons/ic_edit.svg";
import DeleteIcon from "../assests/icons/ic_delete.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getCategories  } from "../store/actions/categoriesActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CarsOpt({ params }) {
    console.log("PARAMS =>",params)
  const dispatch = useDispatch();
  const catListData = useSelector((state) => state.catList);
  const { loading, error, categories } = catListData;
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  

  const [open, setOpen] = useState(false);

const old_reg_no = params?.row?.reg_no
  const [make, setNew_Make] = useState(params?.row?.make) 
  const [model, setNew_Model] = useState(params?.row?.model) 
  const [color, setNew_Color] = useState(params?.row?.color) 
  const [reg_no, setNew_Reg_No] = useState(params?.row?.reg_no)
  const [catId, setNew_CatId] = useState("")



  const [editOpen, setEditOpen] = React.useState(false);
  const handleDelOpen = () => {
    setOpen(true);
  };
  const handleDelClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleUpdate = async () => {
    const data = JSON.parse(sessionStorage.getItem("token"));

    const Headers = {
      Authorization: `Bearer ${data}`,
    };
    if(make === "" || model === "" || color === "" || reg_no === "" || catId === ""){
        toast.error("please complete the form")
      }else{
          const body = {
            old_reg_no:old_reg_no,
            new_make:make,
            new_model:model,
            new_color:color,
            new_reg_no:reg_no,
            new_category:catId
          }
      

    try {
      if (catId !== "") {
        const res = await axios.patch(
          `${process.env.REACT_APP_PUBLIC_API_ENDPOINT}car/update`,
         body,
          { headers: Headers }
        );

        if (res?.data?.error === false) {
          setTimeout(toast.success(res?.data?.info),6000)
          window.location.reload();
        } else {
          setTimeout(toast.error(res?.data?.info),6000);
          window.location.reload();
        }
      } else {
        toast.error("please Select Category");
      }
    } catch (error) {
      console.error(error);
    }
  }
};


  const handleDelete = async () => {
    
    const data = JSON.parse(sessionStorage.getItem("token"));

    const Headers = {
      Authorization: `Bearer ${data}`,
    };

    try {
      if (reg_no) {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_API_ENDPOINT}car/delete`,
          { reg_no: reg_no },
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    setNew_CatId(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Tooltip title={"Edit"} onClick={handleEditClickOpen}>
          <img src={EditIcon} alt="Edit Icon" width={"12"} />
        </Tooltip>
        <Tooltip title={"Delete"}>
          <img
            src={DeleteIcon}
            alt="Delete Icon"
            width={"10"}
            onClick={handleDelOpen}
          />
        </Tooltip>
      </Box>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Car Bearing Registration No to Update: {old_reg_no}
          </Typography>
          <Box my={2}>
          <Box my={2}>
      <TextField id="outlined-basic" label="Enter Make" variant="outlined" size="small" onChange={(e)=>{setNew_Make(e.target.value)}} value={make}  />
      <TextField id="outlined-basic" label="Enter Model" variant="outlined" size="small" onChange={(e)=>{setNew_Model(e.target.value)}} sx={{marginTop:'1vh'}} value={model}/>
      <TextField id="outlined-basic" label="Enter Color" variant="outlined" size="small" onChange={(e)=>{setNew_Color(e.target.value)}} sx={{marginTop:'1vh'}} value={color} />
      <TextField id="outlined-basic" label="Enter Regsitration No" variant="outlined" size="small" onChange={(e)=>{setNew_Reg_No(e.target.value)}} sx={{marginTop:'1vh'}} value={reg_no}/>
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
            <Button sx={{ marginLeft: "2vw" }} onClick={handleUpdate} >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to Delete Car Registarion No: {reg_no}
          </Typography>
          <Box my={2}>
            <Button onClick={handleDelete}>Yes</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CarsOpt;
