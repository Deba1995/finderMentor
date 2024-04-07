import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import Sidebar from "../../Sidebar";
import { SidebarContext } from "../../../context/auth/sidebarContext";
import backGroundImage from "../../../assets/backgroundImage.jpg";
import userImage from "../../../assets/userImage.jpg";
import { useLocation } from "react-router-dom";

const SuggestedProfile = () => {
  const locationData = useLocation();
  const { suggestedData } = locationData.state;
  const {
    firstName,
    lastName,
    skills,
    interests,
    experience,
    goals,
    availability,
    location,
    email,
  } = suggestedData;

  const { open } = React.useContext(SidebarContext);

  return (
    <Container maxWidth={"xl"} disableGutters>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box open={open} sx={{ overflow: "hidden", padding: 0 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 250,
                backgroundImage: `url(${backGroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: -70,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: 2,
                }}
              >
                <img
                  src={userImage}
                  alt="User"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
            <Box sx={{ m: 10 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Name
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${firstName} ${lastName}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {email}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Skills
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skills.join(" ")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Interests
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {interests.join(" ")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Experience
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {experience}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Goals
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {goals}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Availability
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {availability}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        Location
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {location}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Add more cards as needed */}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SuggestedProfile;
