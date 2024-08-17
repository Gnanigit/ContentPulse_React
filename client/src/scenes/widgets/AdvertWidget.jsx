import React, { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
const BASE_URL = process.env.REACT_APP_API_URL;

const adData = [
  {
    picture: `${BASE_URL}/assets/T20WorldCupAdvert.png`,
    name: "ICC T20 WORLD CUP",
    website: "t20worldcup.com",
    description:
      "Don't miss a moment of the thrilling T20 World Cup – where every run, wicket, and catch can change the game!",
  },
  {
    picture: `${BASE_URL}/assets/PumaAdvert.png`,
    name: "PUMA",
    website: "puma.com",
    description:
      "Discover Puma's cutting-edge sports gear designed to elevate your fitness journey to the next level",
  },
  {
    picture: `${BASE_URL}/assets/BookMyShowAdvert.png`,
    name: "BOOKMYSHOW",
    website: "bookmyshow.com",
    description:
      "Book your tickets effortlessly with BookMyShow – your one-stop destination for entertainment.",
  },
  {
    picture: `${BASE_URL}/assets/AdidasAdvert.png`,
    name: "ADIDAS",
    website: "adidas.com",
    description:
      "Experience the ultimate in comfort and performance with Adidas – gear up for greatness.",
  },
  {
    picture: `${BASE_URL}/assets/CocaColaAdvert.png`,
    name: "COCA-COLA",
    website: "coca-cola.com",
    description:
      "Refresh your moments with the classic taste of Coca-Cola – where every sip brings joy.",
  },
  {
    picture: `${BASE_URL}/assets/AppleAdvert.png`,
    name: "APPLE",
    website: "apple.com",
    description:
      "Stay ahead of the curve with Apple's cutting-edge technology and sleek, innovative designs.",
  },
];

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const currentAd = adData[currentAdIndex];

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={currentAd.picture}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>{currentAd.name}</Typography>
        <Typography color={medium}>{currentAd.website}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {currentAd.description}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
