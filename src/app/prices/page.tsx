"use client";

import { useState } from "react";
import Search from "./search";
import useSWR from "swr";
import { Crypto, CryptoApiResponse, fetcher } from "../api/crypto";

function formatCurrency(value: string) {
  const numValue = parseFloat(value);
  return numValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: numValue < 1 ? 4 : 2,
    maximumFractionDigits: numValue < 1 ? 6 : 2,
  });
}

export default function CryptoPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<CryptoApiResponse>(
      "https://api.coincap.io/v2/assets?limit=5",
      fetcher,
      {
        refreshInterval: 0,
        revalidateOnFocus: false,
        dedupingInterval: 10000,
      }
    );

  const cryptoData = data?.data || [];
  const filteredData = cryptoData.filter(
    (crypto) =>
      searchTerm.trim() === "" ||
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastUpdated = data
    ? new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "Not yet updated";

  const handleRefresh = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-500">
          Failed to fetch data.{" "}
          <button onClick={handleRefresh} className="text-blue-500 underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-xl font-medium mb-5 text-center text-gray-800 dark:text-gray-100">
        Crypto Prices
      </h1>

      <div className="max-w-2xl mx-auto mb-4 flex gap-2">
        <div className="flex-grow">
          <Search onSearch={setSearchTerm} />
        </div>
        <button
          onClick={handleRefresh}
          disabled={isValidating}
          className="px-4 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:bg-blue-300 transition-colors h-[38px] min-w-[90px] flex items-center justify-center"
        >
          {isValidating ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="py-2 px-3 text-left text-gray-500 dark:text-gray-400 font-medium text-xs">
                Coin
              </th>
              <th className="py-2 px-3 text-right text-gray-500 dark:text-gray-400 font-medium text-xs">
                Price
              </th>
              <th className="py-2 px-3 text-right text-gray-500 dark:text-gray-400 font-medium text-xs">
                24h
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((crypto: Crypto) => {
                const changePercent = parseFloat(crypto.changePercent24Hr);
                const isPositive = changePercent > 0;

                return (
                  <tr
                    key={crypto.id}
                    className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="py-2 px-3">
                      <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mr-2 text-xs dark:text-gray-300">
                          {crypto.symbol.charAt(0)}
                        </span>
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-white">
                            {crypto.name}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {crypto.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right font-medium text-sm text-gray-900 dark:text-white">
                      {formatCurrency(crypto.priceUsd)}
                    </td>
                    <td
                      className={`py-2 px-3 text-right text-xs ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? "↑" : "↓"}{" "}
                      {Math.abs(changePercent).toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-4 px-3 text-center text-gray-400 dark:text-gray-500"
                >
                  No cryptocurrencies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center max-w-2xl mx-auto mt-3">
        <div className="text-gray-400 dark:text-gray-500 text-xs">
          Last updated on {lastUpdated}
        </div>
      </div>
    </div>
  );
}
