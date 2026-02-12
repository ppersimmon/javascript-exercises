import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", p: 3, width: "100%" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
