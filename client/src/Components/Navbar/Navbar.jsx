import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import Logo from "../../Assets/logo.png";
import { Button, Modal, Typography } from "@mui/material";
import "./Navbar.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "black",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "whitesmoke",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

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

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "rgb(43, 49, 72)" }}>
        <Toolbar className="d-flex justify-content-between">
          <img className="logo-nav" src={Logo} alt="logo" />
          <Search className="searchbar">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Movies…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box>
            <Button
              sx={{ backgroundColor: "rgb(248, 68, 100)" }}
              variant="contained"
              onClick={handleOpen}
            >
              Sign In
            </Button>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="d-flex align-items-center">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              Getting Started
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ml: 2 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <br />
          <Box className="d-flex flex-column justify-content-center align-items-center">
            <Box
              className="d-flex align-items-center px-3 gap-4"
              sx={{ width: "80%", border: "1px solid black" }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, ml: 2 }}
              >
                <GoogleIcon />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h8"
                component="h4"
                sx={{ fontSize: "14px" }}
              >
                Login with Google
              </Typography>
            </Box>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontSize: "10px" }}
            >
              I agree to the Terms & Conditions & Privacy Policy
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Navbar;
