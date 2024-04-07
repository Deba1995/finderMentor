import React, { useContext, useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { UserContext } from "../../../context/auth/userProvider";
import { SidebarContext } from "../../../context/auth/sidebarContext";
import { UserDetail } from "../../../context/auth/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../Sidebar";
const FeedbackForm = () => {
  const [feedBack, setFeedback] = useState("");
  const { currentId, currentToken } = useContext(UserContext);
  const { sendFeedBack, loading } = UserDetail();

  const { open } = React.useContext(SidebarContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentId !== null) {
      try {
        await sendFeedBack(currentId, currentToken, { feedBack });
        toast.success("Feedback Submitted");
        setFeedback("");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "50vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="form"
          onSubmit={handleSubmit}
          open={open}
          sx={{ overflow: "hidden" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Your Feedback"
            variant="outlined"
            multiline
            rows={4}
            value={feedBack}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
