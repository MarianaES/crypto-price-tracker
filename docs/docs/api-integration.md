---
id: api-integration
title: API Integration
sidebar_label: API Integration
---

# API Integration

This document explains how the Crypto Price Tracker integrates with the CoinCap API to fetch and display cryptocurrency data.

## CoinCap API Overview

The application uses the [CoinCap API](https://docs.coincap.io/) as its data source. CoinCap provides real-time cryptocurrency data including prices, market cap, volume, and other metrics.

### Key Endpoints Used

- **`/assets`**: Fetches a list of all cryptocurrencies
  - Example: `https://api.coincap.io/v2/assets?limit=20`

## API Integration Architecture

### Type Definitions

TypeScript interfaces were defined to ensure type safety when working with the API response data:

```typescript
export interface Crypto {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface CryptoApiResponse {
  data: Crypto[];
  timestamp: number;
}
```

### API Client

A simple fetcher function is use to handle API requests:

```typescript
import { CryptoApiResponse } from "@/types";

export const fetcher = (url: string): Promise<CryptoApiResponse> =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });
```

## Data Fetching with SWR

[SWR](https://swr.vercel.app/) (Stale-While-Revalidate) is use for data fetching:

```typescript
const { data, error, isLoading, isValidating, mutate } =
  useSWR<CryptoApiResponse>(
    "https://api.coincap.io/v2/assets?limit=20",
    fetcher,
    {
      refreshInterval: 0, // Disables automatic refreshing. We use a manual refresh button instead.
      revalidateOnFocus: false, // Prevents automatic data refetching when the browser window regains focus.
      dedupingInterval: 10000, // Prevents duplicate requests within a 10-second window.
    }
  );
```

## Manual Data Refresh

The application implements a manual refresh mechanism using SWR's `mutate` function:

```typescript
const handleRefresh = () => {
  mutate(); // This triggers revalidation
};
```

This is connected to the refresh button in the UI:

```jsx
<button
  onClick={handleRefresh}
  disabled={isValidating}
  className="px-4 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:bg-blue-300 transition-colors h-[38px] min-w-[90px] flex items-center justify-center"
>
  {isValidating ? "Refreshing..." : "Refresh"}
</button>
```

## Data Processing and Display

After fetching the data, we process it before displaying:

1. **Filtering**: Based on the search term entered by the user

   ```typescript
   const filteredData = cryptoData.filter(
     (crypto) =>
       searchTerm === "" ||
       crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
   );
   ```

2. **Formatting**: Currency values are formatted for display
   ```typescript
   function formatCurrency(value: string) {
     const numValue = parseFloat(value);
     return numValue.toLocaleString("en-US", {
       style: "currency",
       currency: "USD",
       minimumFractionDigits: numValue < 1 ? 4 : 2,
       maximumFractionDigits: numValue < 1 ? 6 : 2,
     });
   }
   ```

## Error Handling

The application implements error handling to gracefully manage API failures:

```typescript
if (error) {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="text-red-500">Error: {error.message}</div>
    </div>
  );
}
```

## API Rate Limiting Considerations

The CoinCap API has rate limits that need to be considered:

- Free Tier (No API Key)
  - 200 requests per minute
  - 11 years historical data
- To avoid hitting rate limits, we:
  - Use manual refresh instead of automatic polling
  - Implement deduplication of requests
  - Cache data with SWR
