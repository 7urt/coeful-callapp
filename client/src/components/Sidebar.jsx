import React, { useState, useContext } from "react";
import {
 Button,
 TextField,
 Typography,
 IconButton,
 Tooltip,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
 FileCopy,
 Call,
 CallEnd,
 Mic,
 MicOff,
 Videocam,
 VideocamOff,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
 sidebar: {
   width: "380px",
   background: "#000000",
   borderLeft: "2px solid #ffffff",
   display: "flex",
   flexDirection: "column",
   height: "calc(100vh - 73px)",
   overflow: "auto",

   [theme.breakpoints.down("md")]: {
     width: "100%",
     height: "auto",
     borderLeft: "none",
     borderTop: "2px solid #ffffff",
     maxHeight: "50vh",
   },
   [theme.breakpoints.down("xs")]: {
     maxHeight: "none",
   },
 },
 section: {
   padding: "24px",
   borderBottom: "1px solid #ffffff",

   [theme.breakpoints.down("xs")]: {
     padding: "16px",
   },
 },
 sectionTitle: {
   fontSize: "14px",
   fontWeight: 600,
   color: "#ffffff",
   marginBottom: "16px",
   textTransform: "uppercase",
   letterSpacing: "1px",
 },
 textField: {
   marginBottom: "16px",

   "& .MuiOutlinedInput-root": {
     background: "#000000",
     borderRadius: "8px",
     color: "#ffffff",

     "& fieldset": {
       borderColor: "#ffffff",
     },
     "&:hover fieldset": {
       borderColor: "#cccccc",
     },
     "&.Mui-focused fieldset": {
       borderColor: "#ffffff",
     },
   },
   "& .MuiInputLabel-root": {
     color: "#ffffff",
   },
   "& .MuiInputLabel-root.Mui-focused": {
     color: "#ffffff",
   },
 },
 button: {
   borderRadius: "4px",
   padding: "10px 24px",
   textTransform: "uppercase",
   fontSize: "14px",
   fontWeight: 700,
   width: "100%",
   marginBottom: "8px",
   minHeight: "44px",
   border: "2px solid #ffffff",

   [theme.breakpoints.down("xs")]: {
     padding: "12px 20px",
     minHeight: "48px",
   },
 },
 copyButton: {
   background: "#000000",
   color: "#ffffff",

   "&:hover": {
     background: "#ffffff",
     color: "#000000",
   },
 },
 callButton: {
   background: "#ffffff",
   color: "#000000",

   "&:hover": {
     background: "#cccccc",
   },

   "&:disabled": {
     background: "#000000",
     color: "#666666",
     borderColor: "#666666",
   },
 },
 hangupButton: {
   background: "#000000",
   color: "#ffffff",
   borderColor: "#ff0000",

   "&:hover": {
     background: "#ff0000",
     color: "#ffffff",
   },
 },
 idDisplay: {
   background: "#ffffff",
   padding: "12px 16px",
   borderRadius: "4px",
   marginBottom: "12px",
   wordBreak: "break-all",
   fontSize: "13px",
   color: "#000000",
   fontWeight: 600,
   fontFamily: "monospace",
   overflowWrap: "break-word",
 },
 controls: {
   display: "flex",
   gap: "12px",
   justifyContent: "center",
   padding: "20px 24px",
   background: "#000000",
 },
 controlButton: {
   width: "56px",
   height: "56px",
   background: "#000000",
   color: "#ffffff",
   border: "2px solid #ffffff",

   "&:hover": {
     background: "#ffffff",
     color: "#000000",
   },
 },
 credits: {
   padding: "24px",
   marginTop: "auto",
   textAlign: "center",
   borderTop: "1px solid #ffffff",
   color: "#ffffff",
   fontSize: "12px",
   opacity: 0.8,
 },
}));

const Sidebar = ({ children }) => {
 const {
   me,
   callAccepted,
   name,
   setName,
   callEnded,
   leaveCall,
   callUser,
   toggleMute,
   toggleVideo,
   stream,
 } = useContext(SocketContext);
 const [idToCall, setIdToCall] = useState("");
 const [copied, setCopied] = useState(false);
 const [isMuted, setIsMuted] = useState(false);
 const [isVideoOff, setIsVideoOff] = useState(false);
 const classes = useStyles();

 const handleCopy = () => {
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
 };

 const handleToggleMute = () => {
   toggleMute();
   setIsMuted(!isMuted);
 };

 const handleToggleVideo = () => {
   toggleVideo();
   setIsVideoOff(!isVideoOff);
 };

 return (
   <div className={classes.sidebar}>
     <div className={classes.section}>
       <Typography className={classes.sectionTitle}>Account Info</Typography>
       <TextField
         label="Your Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         fullWidth
         className={classes.textField}
         variant="outlined"
         size="small"
       />
       <CopyToClipboard text={me} onCopy={handleCopy}>
         <Button
           variant="contained"
           fullWidth
           startIcon={<FileCopy />}
           className={`${classes.button} ${classes.copyButton}`}
         >
           {copied ? "ID Copied!" : "Copy Your ID"}
         </Button>
       </CopyToClipboard>
     </div>

     <div className={classes.section}>
       <Typography className={classes.sectionTitle}>Join a Call</Typography>
       <TextField
         label="Enter ID to Call"
         value={idToCall}
         onChange={(e) => setIdToCall(e.target.value)}
         fullWidth
         className={classes.textField}
         variant="outlined"
         size="small"
       />
       {callAccepted && !callEnded ? (
         <Button
           variant="contained"
           startIcon={<CallEnd />}
           fullWidth
           onClick={leaveCall}
           className={`${classes.button} ${classes.hangupButton}`}
         >
           End Call
         </Button>
       ) : (
         <Button
           variant="contained"
           startIcon={<Call />}
           fullWidth
           onClick={() => callUser(idToCall)}
           className={`${classes.button} ${classes.callButton}`}
           disabled={!idToCall}
         >
           Start Call
         </Button>
       )}
     </div>

     {stream && (
       <div className={classes.section}>
         <Typography className={classes.sectionTitle}>
           Media Controls
         </Typography>
         <div
           style={{ display: "flex", gap: "12px", justifyContent: "center" }}
         >
           <Tooltip title={isMuted ? "Unmute" : "Mute"}>
             <IconButton
               onClick={handleToggleMute}
               className={classes.controlButton}
               style={{ 
                 background: isMuted ? "#ffffff" : "#000000",
                 color: isMuted ? "#000000" : "#ffffff" 
               }}
             >
               {isMuted ? <MicOff /> : <Mic />}
             </IconButton>
           </Tooltip>
           <Tooltip title={isVideoOff ? "Turn on camera" : "Turn off camera"}>
             <IconButton
               onClick={handleToggleVideo}
               className={classes.controlButton}
               style={{ 
                 background: isVideoOff ? "#ffffff" : "#000000",
                 color: isVideoOff ? "#000000" : "#ffffff" 
               }}
             >
               {isVideoOff ? <VideocamOff /> : <Videocam />}
             </IconButton>
           </Tooltip>
         </div>
       </div>
     )}

     <div className={classes.credits}>
       <Typography variant="body2">
         © 2026 Coeful. All rights reserved.
         <br />
         Powered by Coeful WebRTC
       </Typography>
     </div>

     {children}
   </div>
 );
};

export default Sidebar;

