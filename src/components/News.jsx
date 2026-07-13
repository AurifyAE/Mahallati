import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to Mahallati Updates" }];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "38px",
          lg: "2.7vw",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backdropFilter: "blur(0.6vw)",
        background: `
          linear-gradient(
            90deg,
            rgba(18, 14, 10, 0.85) 0%,
            rgba(32, 26, 18, 0.75) 40%,
            rgba(18, 14, 10, 0.85) 100%
          )
        `,
        borderTop: "0.05vw solid rgba(229, 197, 131, 0.22)",
        borderBottom: "0.05vw solid rgba(229, 197, 131, 0.12)",
        boxShadow: `
          inset 0 0 1vw rgba(229, 197, 131, 0.04),
          0 0 1vw rgba(0,0,0,0.25)
        `,
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#E5C583", // Champagne Gold
          background:
            "linear-gradient(321deg, rgba(32, 26, 18, 0.7), rgba(229, 197, 131, 0.2), rgba(32, 26, 18, 0.7))",
          fontSize: {
            xs: "12px",
            lg: "1.2vw",
          },
          fontWeight: 700,
          whiteSpace: "nowrap",
          padding: "0 3.5vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        Mahallati Updates
      </Typography>

      {/* NEWS TICKER */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Marquee
          speed={40}          // Lower = slower
          gradient={false}
          autoFill={true}
          loop={0}
          direction="left"       // Infinite
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                color: "#fff",
                fontSize: {
                  xs: "12px",
                  lg: "1.3vw",
                },
                fontWeight: 500,
                whiteSpace: "nowrap",
                mx: "1vw",
                flexShrink: 0,
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default NewsTicker;