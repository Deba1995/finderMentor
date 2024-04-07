import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
} from "@mui/material";
import { UserDetail } from "../../../context/auth/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../context/auth/userProvider";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ExperienceOptions = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "More than 5 years",
];
const GoalsOptions = [
  "Career advancement",
  "Skill development",
  "personal challenges",
];
const AvailabilityOptions = ["Morning", "Afternoon", "Evening", "Night"];
const LocationOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
]; // Your location options here

const SelectionForm = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [goals, setGoals] = useState("");
  const [location, setLocation] = useState("");
  const { setDetails, loading } = UserDetail();
  const { currentId, currentToken } = React.useContext(UserContext);

  const handleSkillChange = (event) => {
    const skillsArray = event.target.value.split(/\s+(?=\S)/); // Split by space if followed by a non-space character
    const filteredArray = skillsArray.filter((skill) => skill !== " ");
    setSkills(filteredArray);
  };

  const handleInterestChange = (event) => {
    const interestsArray = event.target.value.split(/\s+(?=\S)/); // Split by space if followed by a non-space character
    const filteredArray = interestsArray.filter((skill) => skill !== " ");
    setInterests(filteredArray);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoals(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentId !== null) {
      try {
        await setDetails(
          {
            skills,
            interests,
            experience,
            availability,
            goals,
            location,
          },
          currentId,
          currentToken
        );
        toast.success("Update successful");
        handleClose();
        window.location.href = "/";
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const [openDialog, setOpenDialog] = React.useState(true);

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Before starting let us know you better
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Ensure this is set to center vertically
            height: "100%",
            m: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Skills"
                  value={skills.join(" ")}
                  onChange={handleSkillChange}
                  variant="outlined"
                  placeholder="Type and press space"
                />
                <Box mt={1}>
                  {skills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Interests"
                  value={interests.join(" ")}
                  onChange={handleInterestChange}
                  variant="outlined"
                  placeholder="Type and press space"
                />
                <Box mt={1}>
                  {interests.map((interest, index) => (
                    <Chip key={index} label={interest} />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Experience</InputLabel>
                  <Select
                    value={experience}
                    onChange={handleExperienceChange}
                    label="Experience"
                    required
                  >
                    {ExperienceOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Goal</InputLabel>
                  <Select
                    value={goals}
                    onChange={handleGoalChange}
                    label="Goal"
                    required
                  >
                    {GoalsOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Availability</InputLabel>
                  <Select
                    value={availability}
                    onChange={handleAvailabilityChange}
                    label="Availability"
                    required
                  >
                    {AvailabilityOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={location}
                    onChange={handleLocationChange}
                    label="Location"
                    required
                  >
                    {LocationOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onSubmit={handleSubmit}
                  disabled={loading}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default SelectionForm;
