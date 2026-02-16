import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  videoSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "#000000",
    position: "relative",
    minHeight: "calc(100vh - 73px)",

    [theme.breakpoints.down("md")]: {
      minHeight: "auto",
      padding: "16px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "12px",
      minHeight: "50vh",
    },
  },
  gridContainer: {
    maxWidth: "1600px",
    width: "100%",
    margin: "0 auto",
  },
  videoCard: {
    position: "relative",
    background: "#000000",
    borderRadius: "12px",
    overflow: "hidden",
    aspectRatio: "16/9",
    boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
    border: "2px solid #ffffff",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "6px",
    },
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  nameOverlay: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#000000",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    zIndex: 10,

    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      padding: "4px 8px",
      bottom: "8px",
      left: "8px",
    },
  },
  emptyState: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000000",
    color: "#ffffff",
    fontSize: "48px",
    fontWeight: 500,
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const classes = useStyles();

  return (
    <div className={classes.videoSection}>
      <Grid container className={classes.gridContainer} spacing={2}>
        {stream && (
          <Grid item xs={12} md={callAccepted && !callEnded ? 6 : 12}>
            <div className={classes.videoCard}>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
              <div className={classes.nameOverlay}>{name || "You"}</div>
            </div>
          </Grid>
        )}
        {callAccepted && !callEnded && (
          <Grid item xs={12} md={6}>
            <div className={classes.videoCard}>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
              <div className={classes.nameOverlay}>{call.name || "Guest"}</div>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default VideoPlayer;
