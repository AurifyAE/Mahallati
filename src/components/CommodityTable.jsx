import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ title, items }) => {
  const { goldData, silverData } = useSpotRate();

  // ✅ FIXED: Minted bars treated as gold
  const getSpot = (metal) => {
    const lower = metal?.toLowerCase() || "";

    if (lower.includes("gold") || lower.includes("minted")) {
      return goldData; // ✅ minted uses gold spot
    }

    if (lower.includes("silver")) return silverData;

    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";

    const intLen = Math.floor(Math.abs(value)).toString().length;

    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows =
    items
      ?.map((item) => {
        const spot = getSpot(item.metal);
        // 🔥 IMPORTANT: fallback to goldData
        const effectiveSpot = spot || goldData;
        if (!effectiveSpot) return null;

        const mult = UNIT_MULTIPLIER[item.weight] || 1;
        const pur = purityFactor(item.purity);
        const unitValue = Number(item.unit) || 1;

        const baseBid =
          (effectiveSpot.bid / OUNCE) * AED * mult * unitValue * pur;

        const baseAsk =
          (effectiveSpot.ask / OUNCE) * AED * mult * unitValue * pur;

        return {
          metal_name: item.metal_name,
          purity: item.purity,
          metal: item.metal,
          unit: `${unitValue} ${item.weight}`,
          bid:
            baseBid +
            (Number(item.buyCharge) || 0) +
            (Number(item.buyPremium) || 0),
          ask:
            baseAsk +
            (Number(item.sellCharge) || 0) +
            (Number(item.sellPremium) || 0),
        };
      })
      .filter(Boolean) ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const PURITY_TO_KARAT = {
    9999: "24K", // 99.99%
    999.9: "24K", // 99.99%
    999: "24K", // 99.9%
    995: "24K", // Swiss bullion / investment gold

    958: "23K", // 95.8%
    950: "23K",

    920: "22K", // Some regional jewellery standards
    916: "22K", // Standard 22K
    900: "21.6K",

    875: "21K",

    833: "20K",

    750: "18K",

    708: "17K",

    700: "16.8K",
    666: "16K",

    625: "15K",

    585: "14K", // Standard 14K
    583: "14K", // Russian standard

    500: "12K",

    417: "10K",

    375: "9K",
  };

  const getPurityLabel = (purity) => {
    return PURITY_TO_KARAT[purity] || purity;
  };
  // ❌ No data → don't render section
  if (!rows.length) return null;

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
          py: "0.9vw",
          px: "1.5vw",
          alignItems: "end",
          borderRadius: "1vw",
          margin: ".4vw",
          background:
            "linear-gradient(180deg, rgba(10, 25, 50, 0.65) 0%, rgba(6, 18, 38, 0.55) 100%)",
          backdropFilter: "blur(0.35vw)",
          border: "0.1vw solid rgba(135, 206, 250, 0.25)",
          boxShadow: `
            inset 0 0 0.08vw rgba(255,255,255,0.15),
            0 0 0.8vw rgba(0,191,255,0.08)
          `,
          position: "relative",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "0.08vw", // border thickness
            borderRadius: "inherit",
            background: `
              linear-gradient(
                135deg,
                rgba(255, 223, 0, 0.35) 0%,
                rgba(255, 255, 255, 0.45) 50%,
                rgba(192, 192, 192, 0.35) 100%
              )
            `,
            WebkitMask: `
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0)
            `,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }
        }}
      >
        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.3vw",
            },
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.04vw",
            textAlign: "start",
          }}
        >
          COMMODITY
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.3vw",
            },
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "start",
          }}
        >
          UNIT
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.3vw",
            },
            fontWeight: 650,
            color: "#E5C583", // Champagne Gold
            textAlign: "center",
          }}
        >
          BUY AED
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.3vw",
            },
            fontWeight: 650,
            color: "#BAC8D9", // Platinum Silver
            textAlign: "center",
          }}
        >
          SELL AED{" "}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: "1vw",
          maxHeight: { xs: "auto", sm: "20vw" },
          borderRadius: "1vw",
          margin: ".4vw",
          background:
            "linear-gradient(180deg, rgba(10, 25, 50, 0.65) 0%, rgba(6, 18, 38, 0.55) 100%)",
          backdropFilter: "blur(0.35vw)",
          border: "0.1vw solid rgba(135, 206, 250, 0.25)",
          boxShadow: `
            inset 0 0 0.08vw rgba(255,255,255,0.15),
            0 0 0.8vw rgba(0,191,255,0.08)
          `,
          position: "relative",
          overflow: "visible",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "0.08vw", // border thickness
            borderRadius: "inherit",
            background: `
              linear-gradient(
                135deg,
                rgba(255, 223, 0, 0.35) 0%,
                rgba(255, 255, 255, 0.45) 50%,
                rgba(192, 192, 192, 0.35) 100%
              )
            `,
            WebkitMask: `
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0)
            `,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }
        }}
      >
        {rows.length === 0 ? (
          <Typography
            sx={{
              py: "3vw",
              textAlign: "center",
              color: "rgba(227,192,120,0.4)",
              fontSize: "1.25vw",
            }}
          >
            No data available
          </Typography>
        ) : (
          <Swiper
            direction="vertical"
            slidesPerView={5}
            loop={true}
            modules={[Autoplay]} // 👈 Register it here
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000} // 👈 higher = smoother slow scroll
            // allowTouchMove={false} // important for TV
            style={{
              height: isMobile ? "35vw" : "20vw",
              background: "transparent",
              overflow: "hidden",
              borderRadius: "1vw",
            }}
          >
            «
            {rows.map((row, index) => (
              <SwiperSlide key={index}>
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
                    alignItems: "center",
                    py: ".7vw",
                    px: "1.5vw",
                    height: "100%",

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "1px",

                      background:
                        "linear-gradient(to right, transparent 5%, rgba(135, 206, 250, 0.45),transparent 95%)",

                    }
                  }}
                >
                  <Typography
                    sx={{
                      // fontSize: "1.24vw",
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        lg: "1.6vw",
                        xl: "1.4vw",
                      },
                      fontWeight: 800,
                      color: "#fff",
                      display: "grid",
                      alignItems: "center ",
                      justifyContent: "start",
                      gridTemplateColumns: "auto auto",
                      textAlign: "start",
                      lineHeight: "1",
                      gap: {
                        xs: "7px",
                        lg: "0.3vw",
                      },
                    }}
                  >
                    {row.metal_name ? row.metal_name : row.metal}
                    <Typography
                      sx={{
                        // fontSize: "1vw",
                        fontSize: {
                          xs: "12px",
                          sm: "10px",
                          lg: "1.2vw",
                        },
                        fontWeight: 400,
                        color: "rgba(255, 255, 255, 0.6)",
                        // mb:'-0.5vw'
                      }}
                    >
                      {/* {row.purity} */}
                      {getPurityLabel(row.purity)}
                    </Typography>
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.18vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.3vw",
                        xl: "1.4vw",
                      },
                      color: "rgba(255, 255, 255, 0.8)",
                      textAlign: "start",
                    }}
                  >
                    {row.unit}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.4vw",
                      },
                      fontWeight: 700,
                      color: "#E5C583", // Champagne Gold
                      textAlign: "center",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatPrice(row.bid)}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.4vw",
                      },
                      fontWeight: 700,
                      color: "#BAC8D9", // Platinum Silver
                      textAlign: "center",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatPrice(row.ask)}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default CommodityTable;
