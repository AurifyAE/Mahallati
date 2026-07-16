import React from "react";
import { Box, Typography } from "@mui/material";

// ==================== SVG Icons & Element boxes ====================

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

const OilIcon = () => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    sx={{
      width: { xs: "14px", md: "1.3vw" },
      height: { xs: "14px", md: "1.3vw" },
      color: "#ffffff",
      display: "block",
    }}
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Box>
);

const ElementIcon = ({ label }) => (
  <Box
    sx={{
      width: { xs: "22px", md: "1.8vw" },
      height: { xs: "22px", md: "1.8vw" },
      border: "1px solid rgba(255, 255, 255, 0.35)",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(6, 18, 14, 0.8)",
    }}
  >
    <Typography
      sx={{
        fontSize: { xs: "9px", md: "0.8vw" },
        fontWeight: 700,
        color: "#BAC8D9",
        lineHeight: 1,
        fontFamily: "'Gilda Display', serif",
      }}
    >
      {label}
    </Typography>
  </Box>
);

const BitcoinIcon = () => (
  <Box
    component="svg"
    viewBox="0 0 32 32"
    sx={{
      width: { xs: "18px", md: "1.5vw" },
      height: { xs: "18px", md: "1.5vw" },
      display: "block",
    }}
  >
    <circle cx="16" cy="16" r="16" fill="#f7931a" />
    <path
      d="M22.25 14.3c.42-2.8-1.72-4.31-4.64-5.32l.95-3.8-2.31-.58-.93 3.72c-.61-.15-1.23-.29-1.85-.43l.93-3.73-2.31-.57-.95 3.8c-.5-.11-1-.23-1.49-.35l.01-.04-3.19-.8-.62 2.47s1.71.39 1.68.42c.94.23 1.1.85 1.08 1.35l-1.08 4.33c.07.02.15.04.23.06-.08-.02-.15-.04-.23-.06l-1.52 6.08c-.11.28-.41.7-.1.7c.03.03-1.68-.42-1.68-.42l-1.15 2.64 3.01.75c.56.14 1.11.29 1.66.42l-.95 3.82 2.31.58.95-3.81c.63.17 1.24.33 1.84.48l-.94 3.78 2.31.58.95-3.83c3.94.75 6.9.45 8.15-3.12.99-2.87-.05-4.52-2.12-5.6 1.5-.35 2.63-1.34 2.93-3.39zm-5.23 7.37c-.71 2.87-5.55 1.32-7.11.93l1.45-5.8c1.57.39 6.4 1.17 5.66 4.87zm.72-7.42c-.65 2.61-4.68 1.29-5.98.96l1.32-5.3c1.3.33 5.34.94 4.66 4.34z"
      fill="#fff"
    />
  </Box>
);

const EthereumIcon = () => (
  <Box
    component="svg"
    viewBox="0 0 784 1277"
    sx={{
      width: { xs: "12px", md: "1.1vw" },
      height: { xs: "18px", md: "1.6vw" },
      display: "block",
    }}
  >
    <g fill="none" fillRule="evenodd">
      <path fill="#C0C0C0" d="M392 0L0 649l392 232V0z" />
      <path fill="#EAEAEA" d="M392 0v881l392-232L392 0z" />
      <path fill="#A0A0A0" d="M392 956L0 727l392 550V956z" />
      <path fill="#C0C0C0" d="M392 1277v-321l392-229-392 550z" />
      <path fill="#808080" d="M392 881L0 649l392 78V881z" />
      <path fill="#A0A0A0" d="M392 881v75l392-75-392 0z" />
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

const CommodityTableNew = () => {
  return (
    <PanelContainer>
      <TableHeader title="COMMODITY" />
      <Box sx={{ mt: "0.4vw" }}>
        <TableRow icon={<OilIcon />} name="OIL (WTI)" price="78.59" change="+0.42%" isUp={true} />
        <TableRow
          icon={<ElementIcon label="Pd" />}
          name="PALLADIUM"
          price="1,032.45"
          change="+0.28%"
          isUp={true}
        />
        <TableRow
          icon={<ElementIcon label="Pt" />}
          name="PLATINUM"
          price="1,087.30"
          change="+0.36%"
          isUp={true}
        />
        <TableRow
          icon={<ElementIcon label="Rh" />}
          name="RHODIUM"
          price="5,450.00"
          change="+0.50%"
          isUp={true}
        />
        <TableRow icon={<BitcoinIcon />} name="BTC USD" price="63,251.62" change="+0.36%" isUp={true} />
        <TableRow icon={<EthereumIcon />} name="ETH USD" price="3,412.78" change="+0.50%" isUp={true} />
      </Box>
    </PanelContainer>
  );
};

export default CommodityTableNew;
