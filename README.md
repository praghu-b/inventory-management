# Inventory Management

A React + Vite inventory management app with role-based access control, editable products, and localStorage-backed persistence.

## Overview

This project lets an admin manage inventory items from a dashboard. Products can be edited, disabled or re-enabled, and deleted. The dashboard also shows summary metrics for active inventory only.

Role state is shared globally with React Context and persisted in localStorage so the selected role survives page refreshes.

## Features

- Role toggle between admin and user
- Global role state using React Context
- Persistent role storage with localStorage
- Inventory loaded through a fake API layer backed by localStorage
- Edit product details in a modal popup
- Disable and re-enable products
- Delete products
- Summary widgets for total products, store value, out of stock, and category count
- Disabled rows are visually muted but still manageable
- Loading and pending states to prevent duplicate actions

## Tech Stack

- React 19
- Vite
- React Router
- Material UI
- React Icons
- Tailwind CSS
- localStorage for persistence

## Project Structure

- `src/main.jsx` - App bootstrap and providers
- `src/App.jsx` - Route definitions
- `src/context/RoleContext.jsx` - Global role state and persistence
- `src/pages/Dashboard.jsx` - Main dashboard page
- `src/components/Navbar.jsx` - Role toggle and header
- `src/components/Widgets.jsx` - Summary metric cards
- `src/components/InventoryTable.jsx` - Inventory table with actions
- `src/components/EditPopUp.jsx` - Edit modal
- `src/hooks/useInventoryHandlers.js` - Inventory CRUD handlers
- `src/services/inventoryApi.js` - Fake API using localStorage
- `src/mock/mockData.json` - Initial inventory seed data

## How It Works

1. The app loads inventory from localStorage.
2. If no saved data exists, it falls back to the seed data in `mockData.json`.
3. The dashboard filters out disabled products before calculating metrics.
4. Inventory actions update the stored data and refresh the UI.
5. Role changes are stored in localStorage and restored on refresh.

## Getting Started

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Key Implementation Notes

- Role state uses React Context instead of Redux.
- Inventory persistence is handled through a localStorage-based service layer.
- Disabled products can be enabled again using the same action button.
- Dashboard metrics are calculated from active products only.
- Inventory actions are separated into a custom hook to keep the dashboard component focused.
