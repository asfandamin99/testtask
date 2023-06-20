import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Cars_ico from "../assests/icons/sport-car.png"
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../store/actions/carsActions";

// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const carsListData = useSelector((state) => state.carsList);
  const { loading, error, cars } = carsListData;
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  
  return (
    <>
      <Helmet>
        <title> Test Task </title>
      </Helmet>
      <Card sx={{ maxWidth: 345, marginTop:'4vh', marginLeft:'20vw'  }}>
      <CardMedia
        component="img"
        alt="cars"
        
        
        image={Cars_ico}
        style={{maxHeight:"fit-content"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Total Cars Registered With the System
        </Typography>
        <Typography variant="h1" color="text.secondary">
         Total: {cars?.data?.pagination?.size}
        </Typography>
      </CardContent>
      
    </Card>
    </>
  );
}
