import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("min-width:1000px");
  return (
    <Box
      width="100%"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center"
    >
      <Box>
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ContentPulse
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "93%" : "50%"}
        p="2rem"
        m="2rem auto"
        borderRadius="0.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to ContentPulse
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
