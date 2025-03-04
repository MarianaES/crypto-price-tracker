"use client";

import { useState } from "react";

interface SearchProps {
  onSearch: (term: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm);
  };

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={handleChange}
          className="w-full h-[38px] px-3 pl-8 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
