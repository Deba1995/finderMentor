import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarContext } from "../context/auth/sidebarContext";
import { UserContext } from "../context/auth/userProvider";
import userImage from "../assets/userImage.jpg";
import { UserDetail } from "../context/auth/userContext";

export default function Navbar() {
  const { open, setOpen } = useContext(SidebarContext);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const { currentId, currentToken } = React.useContext(UserContext);
  const { userData, fetchDetails } = UserDetail();
  console.log(userData);
  React.useEffect(() => {
    if (currentId !== null) {
      const fetchData = async () => {
        try {
          await fetchDetails(currentId, currentToken);
        } catch (error) {
          if (error.message === "You are not authorized to visit this route") {
            localStorage.clear();
            window.location.href = "/auth";
          }
          toast.error(error.message);
        }
      };
      fetchData();
    }
  }, [currentId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box></Box>
            <Typography variant="h6" component="div">
              FINDER
            </Typography>
            {userData?.userDetails?.imageRef !== "" ? (
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Avatar
                  alt="Profile-pic"
                  src={userData?.userDetails?.imageRef}
                />
                <Typography>{`${
                  userData?.userDetails?.firstName
                    ? userData?.userDetails?.firstName
                    : "User"
                } ${
                  userData?.userDetails?.lastName
                    ? userData?.userDetails?.lastName
                    : "User"
                }`}</Typography>
              </Box>
            ) : (
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Avatar alt="Profile-pic" src={userImage} />
                <Typography>{`${
                  userData?.userDetails?.firstName
                    ? userData?.userDetails?.firstName
                    : "User"
                } ${
                  userData?.userDetails?.lastName
                    ? userData?.userDetails?.lastName
                    : "User"
                }`}</Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
