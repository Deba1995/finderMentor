import * as React from "react";
import Box from "@mui/material/Box";
import SelectionForm from "./Pages/Form/SelectionForm";
import { UserDetail } from "../context/auth/userContext";
import { SidebarContext } from "../context/auth/sidebarContext";
import { UserContext } from "../context/auth/userProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircularProgress,
  Grid,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import Sidebar from "./Sidebar";
import SuggestionCard from "./Pages/Card/SuggestionCard";

export default function Home() {
  const { currentId, currentToken } = React.useContext(UserContext);
  const { fetchDetails, userData, fetchSuggestions, loading, suggestionData } =
    UserDetail();
  const { open } = React.useContext(SidebarContext);

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

  React.useEffect(() => {
    if (currentId !== null) {
      const fetchSuggestionsList = async () => {
        try {
          await fetchSuggestions(currentId, currentToken);
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchSuggestionsList();
    }
  }, [currentId]);

  if (loading) {
    return <CircularProgress />;
  }

  return !userData?.userDetails.details ? (
    <SelectionForm />
  ) : (
    <Container maxWidth={"xl"}>
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        m={1}
      >
        <Typography>
          We found {suggestionData?.userDetails?.length > 0 ? "some" : "no"}{" "}
          match for you
        </Typography>
      </Stack>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box open={open} sx={{ overflow: "hidden" }} m={1}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {suggestionData?.userDetails?.map((data) => (
                <Grid item key={data.user?._id} xs={12} sm={6} lg={4}>
                  <SuggestionCard
                    suggestedData={data?.user}
                    score={data?.score}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}
