import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const DrawerItems = ({ HandleLogOut, setisLogged }) => {
  let name = localStorage.getItem("name");
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
          </ListItemButton>
        </ListItem>
        {[name, "Your Orders"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={index === 1 ? () => navigate("/Orders") : () => {}}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <AccountBoxIcon />
                ) : (
                  <ConfirmationNumberIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                secondary={index % 2 === 0 ? "Welcome" : ""}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            HandleLogOut();
            setisLogged(false);
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DrawerItems;
