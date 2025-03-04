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
}

export const fetcher = (url: string): Promise<CryptoApiResponse> => 
  fetch(url).then(res => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });
