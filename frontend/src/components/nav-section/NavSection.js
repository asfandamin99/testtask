import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink, Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
// import ReportsIcon from "./assets/icons/navbar/ic_analytics"
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import Dropdown from "../dropdown/Dropdown";
import ReportIcon from "./svgs/ic_report.svg";
import PassengerIcon from "./svgs/ic_passengers.svg";
import DriversIcon from "./svgs/ic_drivers.svg";
import TripsIcon from "./svgs/ic_trips.svg";
import PaymentsIcon from "./svgs/ic_payments.svg";
import StatisticsIcon from "./svgs/ic_statistics.svg";
import AirportManagementIcon from "./svgs/ic_airportManagement.svg";
import AirportsIcon from "./svgs/ic_airports.svg";
import AirlinesIcon from "./svgs/ic_airlines.svg";
import TerminalsIcon from "./svgs/ic_terminals.svg";
// src/assests/icons/navbar/ic_analytics.svg
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const [open, setOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const [airportManagementOpen, setAirportManagementOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpen(!open);
    setStatisticsOpen(false);
    setAirportManagementOpen(false);
  };

  const statisticsHandleClick = () => {
    setStatisticsOpen(!statisticsOpen);
    setOpen(false);
    setAirportManagementOpen(false);
  };

  const airportManagementHandleClick = () => {
    setAirportManagementOpen(!airportManagementOpen);
    setStatisticsOpen(false);
    setOpen(false);
  };

  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 1,
          ".css-v475nq-MuiButtonBase-root-MuiListItemButton-root.active": {
            color: "#20A8D9",
          },
        }}
      >
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}

        {/* {
          data.map((item) => {
            return (
              <>
                <NavItem key={item.title} item={item} />
                {item.dropdown === true && <Dropdown />}
              </>
            )
          })
        } */}
      </List>

     

     

    
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
