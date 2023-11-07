import { Typography, useTheme, Link } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const CharityWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored Charity of the month
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="charity"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Bike4Balls</Typography>
        <Link
  href="https://bikefor.org"
  sx={{
    textDecoration: 'underline', // Removes the underline by default
    color: medium, // Sets the default color
    '&:hover': {
      textDecoration: 'underline', // Adds an underline on hover
      color: dark, // Changes color on hover
    },
  }}
>
  bikefor.org
</Link>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Teaching how to touch yourselves for the greater good. Fighting cancer & raising funds for research.
      </Typography>
    </WidgetWrapper>
  );
};

export default CharityWidget;