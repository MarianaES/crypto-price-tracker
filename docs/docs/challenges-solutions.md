---
id: challenges-solutions
title: Challenges & Solutions
sidebar_label: Challenges & Solutions
---

# Challenges & Solutions

During the development of the Crypto Price Tracker application, I encountered several technical challenges. This document outlines these challenges and the solutions implemented.

## Challenge 1: State Management and React 19 Compatibility

### Challenge

When starting the project, I planned to use React Query for data fetching and state management. However, I discovered compatibility issues with React 19. This was especially challenging because I had not previously used any third-party state management libraries, having mainly relied on React's Context API for theme and user preferences in past projects.

### Solution

After researching alternatives, I found that while there is a React Query v5 (@tanstack/react-query) that supports React 19, SWR (Stale-While-Revalidate) offered a simpler API with a lower learning curve while still meeting all the project requirements. SWR is maintained by Vercel, the creators of Next.js, ensuring good compatibility with the tech stack.

This was my first time implementing a dedicated data fetching library, which required learning new patterns.

## Challenge 2: Learning Multiple New Technologies

### Challenge

One significant challenge was working with several technologies I wasn't deeply familiar with simultaneously: Next.js, Tailwind CSS, and Docusaurus for documentation. Each has its own learning curve and paradigms, and integrating them together added complexity.

### Solution

I adopted a multi-faceted approach to learning and implementing these technologies:

1. **Next.js**: Started with the official documentation and tutorials, focusing first on the core concepts like routing and server/client components.

2. **Tailwind CSS**: Used basic layouts and styling, then refining the design as I became more comfortable with the class-based system.

3. **Docusaurus**: Approached documentation as a separate project, first setting up the basic structure and then incrementally adding detailed content for different aspects of the application.

4. **AI Assitance**: To be completely transparent, I also leveraged AI tools for clarifications when I encountered specific challenges or needed explanations about certain concepts. This helped bridge gaps in my understanding alongside the official documentation and tutorials.

This combined approach of using documentation, tutorials, and AI assistance allowed me to make steady progress while learning multiple new technologies simultaneously and overcome specific implementation challenges more efficiently.
