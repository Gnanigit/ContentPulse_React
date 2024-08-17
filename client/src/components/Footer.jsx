import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const Footer = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "0.2rem",
      }}
    >
      <Typography color={main}>
        © {currentYear} Gnani. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
