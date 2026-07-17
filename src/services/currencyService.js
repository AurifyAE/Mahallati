const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches the latest exchange rates and session changes from Twelve Data API using the /quote endpoint.
 * Implements a 10s timeout, response validation, auto-retry on failure, and normalizes output.
 * 
 * @param {number} retries Number of retries on failure (defaults to 1)
 * @returns {Promise<{
 *   usd: { price: number, change: number },
 *   eur: { price: number, change: number },
 *   gbp: { price: number, change: number }
 * }>} Normalized exchange rates and changes.
 */
export const getCurrencyRates = async (retries = 1) => {
  const apiKey = import.meta.env.VITE_TWELVEDATA_API_KEY;

  if (!apiKey || apiKey === "YOUR_NEW_API_KEY") {
    throw new Error("Twelve Data API key is missing. Please set VITE_TWELVEDATA_API_KEY in your .env file.");
  }

  // Calling the /quote endpoint to fetch real-time close prices and session changes
  const url = `https://api.twelvedata.com/quote?symbol=USD/AED,EUR/AED,GBP/AED&apikey=${apiKey}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const res = await fetch(url, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Twelve Data API returned status ${res.status}`);
      }

      const data = await res.json();

      // Check if Twelve Data returned error response
      if (data.status === "error" || data.code >= 400) {
        throw new Error(data.message || "Twelve Data API returned error response");
      }

      const usdPair = data["USD/AED"];
      const eurPair = data["EUR/AED"];
      const gbpPair = data["GBP/AED"];

      // Validate presence of quote fields
      if (!usdPair?.close || !eurPair?.close || !gbpPair?.close) {
        throw new Error("Incomplete quote data in Twelve Data response");
      }

      const usdPrice = Number(usdPair.close);
      const eurPrice = Number(eurPair.close);
      const gbpPrice = Number(gbpPair.close);

      const usdChange = Number(usdPair.change);
      const eurChange = Number(eurPair.change);
      const gbpChange = Number(gbpPair.change);

      if (isNaN(usdPrice) || isNaN(eurPrice) || isNaN(gbpPrice)) {
        throw new Error("Received non-numeric exchange rates from Twelve Data");
      }

      // Normalize and return to UI
      return {
        usd: { price: usdPrice, change: isNaN(usdChange) ? 0 : usdChange },
        eur: { price: eurPrice, change: isNaN(eurChange) ? 0 : eurChange },
        gbp: { price: gbpPrice, change: isNaN(gbpChange) ? 0 : gbpChange },
      };
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn(`Twelve Data fetch attempt ${attempt + 1} failed:`, error.message);

      if (attempt < retries) {
        console.log("Retrying Twelve Data fetch in 2 seconds...");
        await wait(2000);
      } else {
        throw new Error(`Twelve Data API failed after ${retries + 1} attempts: ${error.message}`);
      }
    }
  }
};
