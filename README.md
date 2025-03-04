# Crypto Price Tracker

A cryptocurrency price tracking application built with Next.js and SWR. Track real-time prices of top 5 cryptocurrencies.

![Crypto Price Tracker Screenshot](docs/screenshot.png)

## Features

- **Real-time data**: Fetch cryptocurrency prices from the CoinCap API
- **Search functionality**: Filter cryptocurrencies by name or symbol
- **Manual refresh**: Update prices on-demand with a refresh button
- **Efficient state management**: Using SWR for data fetching and caching

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SWR](https://swr.vercel.app/) - Data fetching and state management
- [CoinCap API](https://docs.coincap.io/) - Cryptocurrency data

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MarianaES/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── crypto.ts     # API utilities and types
│   ├── prices/
│   │   ├── page.tsx      # Main crypto prices page
│   │   └── search.tsx    # Search component
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page (redirects to /prices)
└── ...
```

## Usage

- View the list of top 5 cryptocurrencies sorted by market cap
- Use the search bar to filter coins by name or symbol
- Click the "Refresh" button to get the latest price data
- See the timestamp of when the data was last updated
