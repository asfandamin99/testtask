import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "../assests/icons/ic_edit.svg";
import DeleteIcon from "../assests/icons/ic_delete.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

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

function CategoriesOpt({ params }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(params?.row?.name);
  const [new_name, setNew_Name] = useState("");

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

    try {
      if (new_name !== "") {
        const res = await axios.patch(
          `${process.env.REACT_APP_PUBLIC_API_ENDPOINT}category/update`,
          { name: name, newname: new_name },
          { headers: Headers }
        );

        if (res?.data?.error === false) {
          setTimeout(toast.success(res?.data?.info),5000)
          window.location.reload();
        } else {
          setTimeout(toast.error(res?.data?.info),5000);
          window.location.reload();
        }
      } else {
        toast.error("please enter new name");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    console.log(name);
    const data = JSON.parse(sessionStorage.getItem("token"));

    const Headers = {
      Authorization: `Bearer ${data}`,
    };

    try {
      if (name) {
        const res = await axios.post(
          `${process.env.REACT_APP_PUBLIC_API_ENDPOINT}category/delete`,
          { name: name },
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
            Category to Update: {name}
          </Typography>
          <Box my={2}>
            <TextField
              id="outlined-basic"
              label="Enter New Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setNew_Name(e.target.value);
              }}
            />
            <Button sx={{ marginLeft: "2vw" }} onClick={handleUpdate}>
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
            Are you sure you want to Delete: {name}
          </Typography>
          <Box my={2}>
            <Button onClick={handleDelete}>Yes</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CategoriesOpt;
