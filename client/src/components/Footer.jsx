import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return <p>© {currentYear} Gnani. All rights reserved.</p>;
};

export default Footer;
