import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { styled, useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/auth/sidebarContext";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = () => {
  const location = useLocation();
  const { open, setOpen } = useContext(SidebarContext);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    setOpen(false);
  }, [location, setOpen]);
  const theme = useTheme();
  const handleLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("UID");
    window.location.href = "/auth";
  };
  const handleLogoutConfirm = () => {
    handleLogout();
    setLogoutDialogOpen(false);
  };
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };
  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { name: "Home", link: "/", icon: <HomeIcon /> },
            { name: "Profile", link: "/profile", icon: <AccountBoxIcon /> },
            { name: "Feedback", link: "/feedback", icon: <FeedbackIcon /> },
          ].map((route, index) => (
            <Link
              key={route.name}
              to={`${route.link}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutDialog}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
