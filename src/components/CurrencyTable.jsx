import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { getCurrencyRates } from "../services/currencyService";

// ==================== Configuration List ====================
const CURRENCY_CONFIG = [
  { 
    id: "usd", 
    code: "USD", 
    name: "USD / AED", 
    flag: "/images/usa.png", 
    isCustomFlag: false, 
    defaultPrice: 3.6725, 
    defaultChange: 0.0023, 
    defaultIsUp: true 
  },
  { 
    id: "eur", 
    code: "EUR", 
    name: "EUR / AED", 
    flag: "EU", 
    isCustomFlag: true, 
    defaultPrice: 4.2541, 
    defaultChange: -0.0018, 
    defaultIsUp: false 
  },
  { 
    id: "gbp", 
    code: "GBP", 
    name: "GBP / AED", 
    flag: "/images/uk.png", 
    isCustomFlag: false, 
    defaultPrice: 4.9573, 
    defaultChange: 0.0035, 
    defaultIsUp: true 
  },
];

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

const TableRow = ({ icon, name, price, change, isUp, isNeutral }) => {
  const [flashType, setFlashType] = useState("neutral"); // "rise", "fall", "neutral"
  const prevPriceRef = useRef(price);

  useEffect(() => {
    if (prevPriceRef.current !== null && price !== null && prevPriceRef.current !== price) {
      const type = price > prevPriceRef.current ? "rise" : "fall";
      setFlashType(type);
      const timer = setTimeout(() => setFlashType("neutral"), 1000);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = price;
  }, [price]);

  let rowBg = "transparent";
  if (flashType === "rise") {
    rowBg = "rgba(77, 191, 0, 0.25)";
  } else if (flashType === "fall") {
    rowBg = "rgba(255, 0, 64, 0.25)";
  }

  const changeColor = isNeutral ? "#BAC8D9" : isUp ? "#85E374" : "#FF0040";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.8fr 1.1fr 1.1fr",
        alignItems: "center",
        py: "0.75vw",
        px: "1.2vw",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        // backgroundColor: rowBg,
        transition: "background-color 0.3s ease",
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
        {price ? price.toFixed(4) : "—"}
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
        {!isNeutral && (
          isUp ? <ArrowUp color={changeColor} /> : <ArrowDown color={changeColor} />
        )}
      </Box>
    </Box>
  );
};

const CurrencyTable = () => {
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        console.log("Currency Module: Fetching exchange rates from service...");
        const ratesData = await getCurrencyRates();
        console.log("Currency Module: Rates successfully fetched:", ratesData);
        
        setFetchError(null);

        setRates((prev) => {
          const nextRates = {};

          CURRENCY_CONFIG.forEach((currency) => {
            const { id, defaultPrice, defaultChange, defaultIsUp } = currency;
            const apiItem = ratesData[id];
            
            const livePrice = apiItem ? apiItem.price : defaultPrice;
            const liveChange = apiItem ? apiItem.change : defaultChange;

            nextRates[id] = {
              price: livePrice,
              change: liveChange,
              isUp: liveChange > 0,
              isNeutral: liveChange === 0,
            };
          });

          return nextRates;
        });
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Currency Module: API updates failed. Fallback triggered.", err);
        setFetchError(err.message || "Failed to fetch live rates");
        
        // Resiliency Fallback: if the first load fails, load the default merchant values so the UI doesn't remain blank.
        setRates((prev) => {
          if (!prev) {
            const fallbackRates = {};
            CURRENCY_CONFIG.forEach((c) => {
              fallbackRates[c.id] = {
                price: c.defaultPrice,
                change: c.defaultChange,
                isUp: c.defaultIsUp,
                isNeutral: false,
              };
            });
            return fallbackRates;
          }
          return prev;
        });
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 10 * 1000); // 30 seconds refresh
    return () => clearInterval(interval);
  }, []);

  const formatChange = (val, isNeutral) => {
    if (isNeutral) return "—";
    const formatted = Math.abs(val).toFixed(4);
    return val > 0 ? `+${formatted}` : `-${formatted}`;
  };

  if (!rates) {
    return (
      <PanelContainer>
        <TableHeader title="CURRENCY" />
        <Box sx={{ py: "3vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography sx={{ color: "#BAC8D9", fontSize: "1.2vw", fontWeight: 500 }}>
            Loading Exchange Rates...
          </Typography>
        </Box>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <TableHeader title="CURRENCY" />
      <Box sx={{ mt: "0.4vw" }}>
        {CURRENCY_CONFIG.map((c) => {
          const item = rates[c.id];
          if (!item) return null;

          const flagIcon = c.isCustomFlag && c.flag === "EU" ? (
            <EUFlag />
          ) : (
            <Box
              component="img"
              src={c.flag}
              alt={c.name}
              sx={{ width: "100%", height: "auto", borderRadius: "1px" }}
            />
          );

          return (
            <TableRow
              key={c.id}
              icon={flagIcon}
              name={c.name}
              price={item.price}
              change={formatChange(item.change, item.isNeutral)}
              isUp={item.isUp}
              isNeutral={item.isNeutral}
            />
          );
        })}
      </Box>

     
    </PanelContainer>
  );
};

export default CurrencyTable;
