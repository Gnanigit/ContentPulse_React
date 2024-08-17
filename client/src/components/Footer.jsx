import { useTheme } from "@mui/material";

const Footer = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const currentYear = new Date().getFullYear();

  return (
    <Typography color={main} sx={{ mt: "1rem" }}>
      © {currentYear} Gnani. All rights reserved.
    </Typography>
  );
};

export default Footer;
