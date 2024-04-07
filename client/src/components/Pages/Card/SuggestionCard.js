import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  ListItem,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import defaultCardImage from "../../../assets/defaultCard.jpg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/auth/userProvider";
import { UserDetail } from "../../../context/auth/userContext";
import { SocketContext } from "../../../context/auth/socketContext";
import { DialogContext } from "../../../context/auth/dialogContext";

export default function SuggestionCard({ suggestedData, score }) {
  const { firstName, lastName, experience, location, _id, imageRef } =
    suggestedData;
  const navigate = useNavigate();
  const { open, setOpen } = React.useContext(DialogContext);
  const [message, setMessage] = React.useState("");
  const { currentId, currentToken } = React.useContext(UserContext);
  const { socket } = React.useContext(SocketContext);
  const {
    sendMessage,
    loading,
    conversations,
    setConversations,
    fetchMessages,
  } = UserDetail();
  React.useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log(newMessage);
      setConversations((prevConversations) => {
        const updatedConversations = {
          ...prevConversations,
          retrievedMessage: [
            ...(prevConversations.retrievedMessage || []),
            newMessage,
          ],
        };
        return updatedConversations;
      });
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setConversations]);

  const handleSeeProfile = () => {
    navigate(`/suggestedProfile/${_id}`, {
      state: { suggestedData },
    });
  };

  const handleMessageDialog = (event) => {
    event.preventDefault();

    setOpen((prev) => !prev);
    fetchUserMessages(currentId, _id, currentToken);
  };
  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (currentId !== null && _id !== null && message !== "") {
      try {
        await sendMessage(currentId, _id, currentToken, {
          message,
        });
        setMessage("");
        fetchUserMessages(currentId, _id, currentToken);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const fetchUserMessages = async (currentId, receiverId, currentToken) => {
    try {
      await fetchMessages(currentId, receiverId, currentToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card sx={{ minWidth: "300px", mb: "5px" }} raised>
        <CardMedia
          component="img"
          height="100px"
          image={imageRef === "" ? defaultCardImage : imageRef}
          alt="Chevrolet"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Name: {`${firstName} ${lastName}`}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            Match: {`${score}%`}
          </Typography>
          <Typography variant="body1">Experience: {experience}</Typography>
          <Typography variant="body1">Location: {location}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="medium" onClick={handleSeeProfile} variant="contained">
            See Profile
          </Button>
          {/* <Button size="medium">Score: {score}</Button> */}
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={handleMessageDialog}
          >
            <MessageIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            margin: "0",
            position: "fixed",
            bottom: "0",
            right: "0",
            width: "400px",
            height: "500px",
          },
        }}
        open={open}
        onClose={() => setOpen(!open)}
        scroll={"paper"}
      >
        <DialogContent>
          {conversations?.retrievedMessage?.map((data) => (
            <Box key={data?._id}>
              <Typography variant="subtitle1" align="center">
                {" "}
                {new Date(data?.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        backgroundColor:
                          data?.senderId === currentId ? "blue" : "red",
                        borderRadius: "10px",
                        padding: "8px",
                        margin: "4px",
                        display: "inline-block",
                        float: data?.senderId === currentId ? "right" : "left",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                        }}
                      >
                        {data?.message}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleMessageSubmit}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                required
                value={message}
                label="Type Something"
                variant="outlined"
                onChange={handleMessageInput}
              />
              <Button color="primary" type="submit" disabled={loading}>
                <SendIcon />
              </Button>
            </Box>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}
