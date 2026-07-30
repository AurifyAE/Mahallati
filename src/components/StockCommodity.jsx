import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

// Helper to get socket symbols directly from API returned items for request-data subscription
export const getStockCommoditySocketSymbols = (selectedItems = []) => {
  const symbols = [];
  selectedItems.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      if (item.socketSymbol && !symbols.includes(item.socketSymbol)) {
        symbols.push(item.socketSymbol);
      }
      if (item.marketDataKey && !symbols.includes(item.marketDataKey)) {
        symbols.push(item.marketDataKey);
      }
      if (item.key && !symbols.includes(item.key.toUpperCase())) {
        symbols.push(item.key.toUpperCase());
      }
    } else if (typeof item === "string") {
      const upper = item.toUpperCase();
      if (!symbols.includes(upper)) {
        symbols.push(upper);
      }
    }
  });
  return symbols;
};

// ==================== SVG Icons ====================

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

// ==================== Glass Panel Container ====================

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
        padding: "1px",
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

// ==================== Table Header ====================

const TableHeader = () => (
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
      COMMODITY
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

// ==================== Table Row with Flash Animations ====================

const TableRow = ({ name, price, change, isUp, isNeutral, rawPrice }) => {
  const [flashType, setFlashType] = useState("neutral");
  const prevPriceRef = useRef(rawPrice);

  useEffect(() => {
    if (
      prevPriceRef.current !== null &&
      rawPrice !== null &&
      prevPriceRef.current !== rawPrice
    ) {
      const type = rawPrice > prevPriceRef.current ? "rise" : "fall";
      setFlashType(type);
      const timer = setTimeout(() => setFlashType("neutral"), 1000);
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = rawPrice;
  }, [rawPrice]);

  let rowBg = "transparent";
  if (flashType === "rise") {
    rowBg = "rgba(77, 191, 0, 0.25)";
  } else if (flashType === "fall") {
    rowBg = "rgba(255, 0, 64, 0.25)";
  }

  const changeColor = isNeutral ? "#BAC8D9" : isUp ? "#85E374" : "#FF0040";
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
        backgroundColor: rowBg,
        transition: "background-color 0.3s ease",
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {/* Column 1: Commodity Name */}
      <Typography
        sx={{
          fontSize: { xs: "13px", md: "1.3vw" },
          fontWeight: 600,
          color: "#EAEFF5",
          letterSpacing: "0.02em",
          textAlign: "start",
        }}
      >
        {name}
      </Typography>

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
        {!isNeutral && <ArrowIcon color={changeColor} />}
      </Box>
    </Box>
  );
};

// ==================== Main Component ====================

const StockCommodityTable = ({
  selectedStockCommodities = [],
  marketData = {},
}) => {
  const prevPricesRef = useRef({});
  const [prevPricesState, setPrevPricesState] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    let changed = false;
    const nextPrevPrices = { ...prevPricesState };

    selectedStockCommodities.forEach((item) => {
      const key = typeof item === "object" ? item.key : item;
      const socketSymbol = typeof item === "object" ? item.socketSymbol : null;
      const marketDataKey = typeof item === "object" ? item.marketDataKey : null;

      const data =
        (socketSymbol && marketData[socketSymbol]) ||
        (marketDataKey && marketData[marketDataKey]) ||
        marketData[key] ||
        (key && marketData[key.toUpperCase()]) ||
        (key && marketData[key.toLowerCase()]);

      const priceUSD = data?.offer
        ? parseFloat(data.offer)
        : data?.bid
        ? parseFloat(data.bid)
        : data?.price
        ? parseFloat(data.price)
        : data?.ask
        ? parseFloat(data.ask)
        : undefined;

      const cachedPrice = prevPricesRef.current[key];

      if (priceUSD !== undefined && priceUSD !== cachedPrice) {
        if (cachedPrice !== undefined) {
          nextPrevPrices[key] = cachedPrice;
          changed = true;
        }
        prevPricesRef.current[key] = priceUSD;
      }
    });

    if (changed) {
      setPrevPricesState(nextPrevPrices);
    }
  }, [marketData, selectedStockCommodities]);

  const formatPrice = (val, decimals = 2) => {
    if (val === null || val === undefined || isNaN(val)) return "—";
    return val.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatChange = (val) => {
    if (val === null || val === undefined || isNaN(val)) return "—";
    const formatted = Math.abs(val).toFixed(2);
    return val > 0 ? `+${formatted}%` : val < 0 ? `-${formatted}%` : "—";
  };

  // Construct rows purely from API-fetched commodity objects and live marketData
  const rows = selectedStockCommodities
    .map((item) => {
      const key = typeof item === "object" ? item.key : item;
      const name =
        typeof item === "object" && item.name
          ? item.name
          : key ? key.replace(/_/g, " ").toUpperCase() : "";
      const decimals =
        typeof item === "object" && item.decimals ? item.decimals : 2;

      const socketSymbol = typeof item === "object" ? item.socketSymbol : null;
      const marketDataKey = typeof item === "object" ? item.marketDataKey : null;

      const data =
        (socketSymbol && marketData[socketSymbol]) ||
        (marketDataKey && marketData[marketDataKey]) ||
        marketData[key] ||
        (key && marketData[key.toUpperCase()]) ||
        (key && marketData[key.toLowerCase()]);

      const priceUSD = data?.offer
        ? parseFloat(data.offer)
        : data?.bid
        ? parseFloat(data.bid)
        : data?.price
        ? parseFloat(data.price)
        : data?.ask
        ? parseFloat(data.ask)
        : undefined;

      const prevUSD = prevPricesState[key];

      let changePercent = null;
      if (data?.change !== undefined && data?.change !== null) {
        changePercent = parseFloat(data.change);
      } else if (
        priceUSD !== undefined &&
        prevUSD !== undefined &&
        prevUSD !== 0
      ) {
        changePercent = ((priceUSD - prevUSD) / prevUSD) * 100;
      }

      const isUp = changePercent !== null ? changePercent > 0 : false;
      const isNeutral = changePercent === null || changePercent === 0;

      return {
        key,
        name,
        price: formatPrice(priceUSD, decimals),
        change: formatChange(changePercent),
        isUp,
        isNeutral,
        rawPrice: priceUSD,
      };
    })
    .filter(Boolean);

  if (!selectedStockCommodities.length) return null;

  const shouldLoop = rows.length > 5;
  const slidesPerView = Math.min(5, rows.length);

  return (
    <PanelContainer>
      <TableHeader />
      <Box sx={{ mt: "0.4vw" }}>
        {rows.length === 0 ? (
          <Box
            sx={{
              py: "2vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#BAC8D9", fontSize: "1.2vw", fontWeight: 500 }}
            >
              Loading Commodity Rates...
            </Typography>
          </Box>
        ) : (
          <Swiper
            key={`swiper-${rows.length}`}
            direction="vertical"
            slidesPerView={slidesPerView}
            loop={shouldLoop}
            modules={shouldLoop ? [Autoplay] : []}
            autoplay={
              shouldLoop
                ? {
                    delay: 0,
                    disableOnInteraction: false,
                  }
                : false
            }
            speed={3000}
            style={{
              height: isMobile ? "35vw" : "20vw",
              background: "transparent",
              overflow: "hidden",
            }}
          >
            {rows.map((row, index) => (
              <SwiperSlide key={row.key || index}>
                <TableRow
                  name={row.name}
                  price={row.price}
                  change={row.change}
                  isUp={row.isUp}
                  isNeutral={row.isNeutral}
                  rawPrice={row.rawPrice}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </PanelContainer>
  );
};

export default StockCommodityTable;
