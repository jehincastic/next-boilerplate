import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";

interface LayoutProps {
  loading?: boolean
  loadingText?: string
  showChildOnLoading?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  loading,
  showChildOnLoading,
  loadingText = "Loading",
  children,
}) => {
  if (loading) {
    return (
      <>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            display: "flex",
            flexDirection: "column",
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 3 }} variant="h6" gutterBottom component="div">
            {loadingText}
          </Typography>
        </Backdrop>
        {showChildOnLoading && children}
      </>
    );
  }
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
