---
id: state-management
title: State Management
sidebar_label: State Management
---

# State Management

This document explains the state management approach used in the Crypto Price Tracker application, including why we chose SWR over other alternatives.

## State Management Requirements

For this application, we needed a state management solution that could:

1. Handle asynchronous data fetching from external APIs
2. Provide loading and error states
3. Support manual refreshing of data
4. Enable local filtering of data
5. Be compatible with React 19 and Next.js
6. Maintain a small bundle size
7. Have a simple, declarative API

## Why We Chose SWR

During development, I initially planned to use React Query for state management. However, when attempting to install and implement it, I discovered compatibility issues with React 19 (the latest version of React used in this project).

After investigating further, I found that there is a newer version, [@tanstack/react-query v5](https://www.npmjs.com/package/@tanstack/react-query), which does support React 19 with all of its advanced features. While exploring options, I also discovered SWR, which offered a simpler API but with great capabilities that covered all the needs of this project.

Since I hadn't used either state management solution previously, I decided to choose the option that would cover all the requirements while having the lowest learning curve. This led me to select [SWR](https://swr.vercel.app/) (Stale-While-Revalidate) for data fetching and state management. Here's why:

### Advantages of SWR

- **Lightweight**: Small bundle size (~6KB min+gzip)
- **React Hooks Based**: Fits naturally with React's functional component model
- **Built-in Caching**: Automatic caching with configurable revalidation
- **Loading & Error States**: Provides simple flags for handling loading and error states
- **Created by Vercel**: Designed specifically to work well with Next.js
- **React 19 Compatible**: Works well with the latest React features
- **Focused API**: Specialized for data fetching with a clean API
- **Minimal Boilerplate**: Requires very little setup code

For the current scope of the application, SWR provides the optimal balance of features, simplicity, and performance.

### Implementation Example

Here's how we implement SWR in our application:

```jsx
import useSWR from "swr";
import { fetcher, Crypto } from "../api/crypto";

// In the component:
const { data, error, isLoading, isValidating, mutate } = useSWR(
  "https://api.coincap.io/v2/assets?limit=20",
  fetcher,
  {
    refreshInterval: 0,
    revalidateOnFocus: false,
  }
);

// Manual refresh function
const handleRefresh = () => mutate();

// Rest of the component...
```

## Alternatives Considered

I evaluated several alternatives before settling on SWR:

### TanStack Query (React Query)

**Pros:**

- More powerful and feature-rich
- Better for complex data fetching scenarios
- Comprehensive devtools
- Strong TypeScript support
- Version 5 supports React 19

**Cons:**

- Larger bundle size (~12KB min+gzip)
- More complex API for our simple use case
- Some features not needed for our application
- Steeper learning curve for someone new to both solutions

### Redux/Redux Toolkit

**Pros:**

- Industry standard with wide adoption
- Predictable state management with centralized store
- Extensive middleware ecosystem

**Cons:**

- Verbose with more boilerplate code
- Steeper learning curve
- Overkill for our simple data fetching needs

### Context API + useReducer

**Pros:**

- Built into React
- No additional dependencies
- Good for global app state

**Cons:**

- Requires more boilerplate code
- No built-in data fetching capabilities
- Manual handling of loading/error states
- No automatic caching

### Zustand

**Pros:**

- Extremely lightweight
- Simple, hook-based API
- No providers needed

**Cons:**

- No built-in data fetching capabilities
- Must handle loading/error states manually
- No automatic caching or stale data management

## Local UI State Management

For simple UI state that doesn't need to be shared across components, we use React's built-in `useState` hook:

```jsx
const [searchTerm, setSearchTerm] = useState("");
```
