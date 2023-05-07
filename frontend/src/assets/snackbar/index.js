import { Box, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";
import styles from "../../styles/assets.styles.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction="down" timeout={300} />;
}
export default function Snackbars({ variant, handleClose, message, isOpen, autoHide }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isOpen}
        autoHideDuration={autoHide || 3000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity={variant}
          sx={{ width: "100%", color: "#FFF" }}
          className={`${styles[variant]} ${styles.className}`}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
