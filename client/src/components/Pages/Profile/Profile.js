import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
  Stack,
  Container,
} from "@mui/material";
import { UserDetail } from "../../../context/auth/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarContext } from "../../../context/auth/sidebarContext";
import Sidebar from "../../Sidebar";
import { UserContext } from "../../../context/auth/userProvider";
import userImage from "../../../assets/userImage.jpg";
import FileBase from "react-file-base64";

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
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [goals, setGoals] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const { currentId, currentToken } = React.useContext(UserContext);
  const { userData, fetchDetails, setDetails, loading } = UserDetail();

  const { open } = React.useContext(SidebarContext);

  const handleSkillChange = (event) => {
    const skillsArray = event.target.value.split(/\s+(?=\S)/); // Split by space if followed by a non-space character
    const filteredArray = skillsArray.filter((skill) => skill !== " ");
    setSkills(filteredArray);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  useEffect(() => {
    const userInfo = userData?.userDetails;
    if (userInfo) {
      setExperience(userInfo.experience || ExperienceOptions[0]);
      setGoals(userInfo.goals || "");
      setSkills(userInfo.skills || []);
      setInterests(userInfo.interests || []);
      setLocation(userInfo.location || "");
      setAvailability(userInfo.availability || "");
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setSelectedFile(userInfo.imageRef || "");
    }
  }, [userData]);
  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    if (currentId !== null) {
      try {
        await setDetails(
          {
            firstName,
            lastName,
            skills,
            interests,
            experience,
            availability,
            goals,
            location,
            imageRef: selectedFile,
          },
          currentId,
          currentToken
        );
        toast.success("Update successful");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Container maxWidth={"xl"}>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box open={open} sx={{ overflow: "hidden" }}>
          <Stack gap={5}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center", // Ensure this is set to center vertically
                    height: "100%",
                  }}
                >
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        overflow: "hidden",
                        marginBottom: 2,
                      }}
                    >
                      {selectedFile ? (
                        <img
                          src={selectedFile}
                          alt="User"
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <img
                          src={userImage}
                          alt="User"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Box>
                    <Box>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setSelectedFile(base64)}
                      />
                    </Box>
                  </Box>
                  <form onSubmit={handleSubmitEdit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="First Name"
                          value={firstName}
                          onChange={handleFirstNameChange}
                          variant="outlined"
                          placeholder="First name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Last Name"
                          value={lastName}
                          onChange={handleLastNameChange}
                          variant="outlined"
                          placeholder="Last name"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Skills"
                          value={skills?.join(" ")}
                          onChange={handleSkillChange}
                          variant="outlined"
                          placeholder="Type and press space"
                        />
                        <Box mt={1}>
                          {skills?.map((skill, index) => (
                            <Chip key={index} label={skill} />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label="Interests"
                          value={interests?.join(" ")}
                          onChange={handleInterestChange}
                          variant="outlined"
                          placeholder="Type and press space"
                        />
                        <Box mt={1}>
                          {interests?.map((interest, index) => (
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
                          onSubmit={handleSubmitEdit}
                          disabled={loading}
                        >
                          Done
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </CustomTabPanel>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
