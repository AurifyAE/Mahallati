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
            rgba(8, 20, 42, 0.85) 0%,
            rgba(15, 32, 64, 0.75) 40%,
            rgba(8, 20, 42, 0.85) 100%
          )
        `,
        borderTop: "0.05vw solid rgba(135, 206, 250, 0.18)",
        borderBottom: "0.05vw solid rgba(135, 206, 250, 0.12)",
        boxShadow: `
          inset 0 0 1vw rgba(0, 191, 255, 0.05),
          0 0 1vw rgba(0,0,0,0.2)
        `,
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#fff",
          background:
            "linear-gradient(321deg, rgba(10, 30, 60, 0.65), rgba(0, 191, 255, 0.4), rgba(10, 30, 60, 0.65))",
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