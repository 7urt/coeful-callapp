import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

// Styling
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    background: "#000000",
    position: "relative",
  },
  header: {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#000000",
    borderBottom: "1px solid #ffffff",
    zIndex: 1000,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: 500,
    letterSpacing: "-0.5px",
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    background: "#ffffff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    fontSize: "20px",
    fontWeight: 600,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <div className={classes.logoIcon}>C</div>
          <span>
            Coeful - Video Chat WebApp
          </span>
          <span className={classes.logoTextMobile}>Coeful</span>
        </div>
      </div>
      <div className={classes.mainContent}>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </div>
  );
};

export default App;
