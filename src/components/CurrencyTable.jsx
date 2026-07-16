import React from "react";
import { Box, Typography } from "@mui/material";

// ==================== SVG Icons & Flags ====================

const ArrowUp = ({ color }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{
      width: { xs: "12px", md: "1.2vw" },
      height: { xs: "12px", md: "1.2vw" },
      flexShrink: 0,
    }}
  >
    <path
      d="M12 4V20M12 4L5 11M12 4L19 11"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Box>
);

const ArrowDown = ({ color }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{
      width: { xs: "12px", md: "1.2vw" },
      height: { xs: "12px", md: "1.2vw" },
      flexShrink: 0,
    }}
  >
    <path
      d="M12 20V4M12 20L5 13M12 20L19 13"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Box>
);

const EUFlag = () => (
  <Box
    component="svg"
    viewBox="0 0 3 2"
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: "2px",
      display: "block",
    }}
  >
    <rect width="3" height="2" fill="#003399" />
    <g fill="#ffcc00" transform="translate(1.5, 1)">
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 0.6 * Math.cos(angle);
        const y = 0.6 * Math.sin(angle);
        return (
          <path
            key={i}
            d="M0,-0.06 L0.017,-0.017 L0.06,-0.017 L0.025,0.008 L0.038,0.05 L0,0.025 L-0.038,0.05 L-0.025,0.008 L-0.06,-0.017 L-0.017,-0.017 Z"
            transform={`translate(${x}, ${y})`}
          />
        );
      })}
    </g>
  </Box>
);

// ==================== Reusable Glass Panel ====================

const PanelContainer = ({ children }) => (
  <Box
    sx={{
      width: "100%",
      borderRadius: "1.5vw",
      background: "rgba(6, 18, 14, 0.65)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 0.8vw 2vw rgba(0, 0, 0, 0.4)",
      padding: "0.5vw 1.2vw 1.2vw 1.2vw",
      overflow: "hidden",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px", // border thickness
        borderRadius: "inherit",
        background: `
          linear-gradient(
            135deg,
            rgba(77, 191, 0, 0.3) 0%,
            rgba(229, 197, 131, 0.45) 50%,
            rgba(77, 191, 0, 0.2) 100%
          )
        `,
        WebkitMask: `
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0)
        `,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      },
    }}
  >
    {children}
  </Box>
);

// ==================== Reusable Table Components ====================

const TableHeader = ({ title }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1.8fr 1.1fr 1.1fr",
      py: "0.8vw",
      px: "1.2vw",
      alignItems: "center",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    }}
  >
    <Typography
      sx={{
        fontSize: { xs: "12px", md: "1.05vw" },
        fontWeight: 600,
        color: "#BAC8D9",
        letterSpacing: "0.05em",
        textAlign: "start",
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: "12px", md: "1.05vw" },
        fontWeight: 600,
        color: "#BAC8D9",
        letterSpacing: "0.05em",
        textAlign: "center",
      }}
    >
      PRICE
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: "12px", md: "1.05vw" },
        fontWeight: 600,
        color: "#BAC8D9",
        letterSpacing: "0.05em",
        textAlign: "right",
        pr: "1.5vw",
      }}
    >
      CHANGE
    </Typography>
  </Box>
);

const TableRow = ({ icon, name, price, change, isUp }) => {
  const changeColor = isUp ? "#85E374" : "#FF0040";
  const ArrowIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.8fr 1.1fr 1.1fr",
        alignItems: "center",
        py: "0.75vw",
        px: "1.2vw",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {/* Column 1: Icon and Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "1vw", textAlign: "start" }}>
        <Box
          sx={{
            width: { xs: "24px", md: "2.2vw" },
            height: { xs: "16px", md: "1.5vw" },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "13px", md: "1.3vw" },
            fontWeight: 600,
            color: "#EAEFF5",
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </Typography>
      </Box>

      {/* Column 2: Price */}
      <Typography
        sx={{
          fontSize: { xs: "13px", md: "1.4vw" },
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {price}
      </Typography>

      {/* Column 3: Change and Arrow */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.6vw",
          pr: "0.5vw",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "13px", md: "1.4vw" },
            fontWeight: 700,
            color: changeColor,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {change}
        </Typography>
        <ArrowIcon color={changeColor} />
      </Box>
    </Box>
  );
};

const CurrencyTable = () => {
  return (
    <PanelContainer>
      <TableHeader title="CURRENCY" />
      <Box sx={{ mt: "0.4vw" }}>
        <TableRow
          icon={
            <Box
              component="img"
              src="/images/usa.png"
              alt="USA"
              sx={{ width: "100%", height: "auto", borderRadius: "1px" }}
            />
          }
          name="USD / AED"
          price="3.6725"
          change="+0.0023"
          isUp={true}
        />
        <TableRow
          icon={<EUFlag />}
          name="EUR / AED"
          price="4.2541"
          change="-0.0018"
          isUp={false}
        />
        <TableRow
          icon={
            <Box
              component="img"
              src="/images/uk.png"
              alt="UK"
              sx={{ width: "100%", height: "auto", borderRadius: "1px" }}
            />
          }
          name="GBP / AED"
          price="4.9573"
          change="+0.0035"
          isUp={true}
        />
      </Box>
    </PanelContainer>
  );
};

export default CurrencyTable;
