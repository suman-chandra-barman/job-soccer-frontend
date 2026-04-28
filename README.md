<div align="center">

# Job Soccer ⚽️💼

> ⚡ Production-ready job + networking platform frontend built with Next.js

**Job Soccer** is a modern **Next.js App Router** web application for a job marketplace + professional network experience—supporting authentication, profiles (candidate/employer), job discovery & hiring flows, real-time messaging, notifications, and LinkedIn OAuth.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-149ECA)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC)

</div>

---

## 📚 Table of Contents

- 📖 Project Overview
- 🧰 Tech Stack
- ✨ Key Features
- 🗂️ Project Structure
- 🛠️ Installation
- 🔐 Environment Variables
- 📦 Scripts
- 🚀 Build & Deployment
- 🔐 Security Notes

---

## 📖 Project Overview

This repository contains the **frontend** of **Job Soccer**, built using **Next.js App Router** and a scalable component + Redux architecture.

It includes:

- Auth flows (signup/signin, forgot password, email verification)
- Candidate & employer profiles
- Jobs module (browse, post/manage, hiring-related screens)
- Messaging + notifications with Socket.IO
- Social/networking screens (my network, requests)
- LinkedIn OAuth login/signup

---

## 🧰 Tech Stack

### Core

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**

### UI & Styling

- **Tailwind CSS 4**
- **shadcn/ui** (project configured via `components.json`)
- **Radix UI**
- **lucide-react** (icons)
- **react-icons**
- **tw-animate-css**
- **class-variance-authority**, **clsx**, **tailwind-merge**

### State, Data & Forms

- **Redux Toolkit** + **RTK Query**
- **react-redux**
- **redux-persist**
- **react-hook-form**
- **@hookform/resolvers**
- **zod**

### Realtime & UX Utilities

- **socket.io-client** (real-time chat + notifications)
- **sonner** (toast notifications)
- **date-fns** (date formatting)

### Tooling

- **ESLint 9** + `eslint-config-next`

### Libraries (from `package.json`)

**Dependencies**

- `next`, `react`, `react-dom`
- `tailwind-merge`, `clsx`, `class-variance-authority`
- `@reduxjs/toolkit`, `react-redux`, `redux-persist`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `socket.io-client`
- `sonner`
- `date-fns`
- `lucide-react`, `react-icons`
- Radix UI:
  - `@radix-ui/react-alert-dialog`
  - `@radix-ui/react-avatar`
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-label`
  - `@radix-ui/react-popover`
  - `@radix-ui/react-radio-group`
  - `@radix-ui/react-scroll-area`
  - `@radix-ui/react-select`
  - `@radix-ui/react-separator`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-tabs`

**Dev Dependencies**

- `typescript`
- `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css`
- `eslint`, `eslint-config-next`, `@eslint/eslintrc`
- `@types/node`, `@types/react`, `@types/react-dom`

---

## ✨ Key Features

- 🔐 **Authentication**: signup/signin, email verification, password reset flows
- 🧑‍💼 **Profiles**: candidate + employer profile experiences
- 💼 **Jobs**: browse jobs, job cards, employer job management
- 🤝 **Networking**: my network, friend requests, candidate/employer public pages
- 💬 **Real-time Messaging**: chat UI backed by Socket.IO
- 🔔 **Real-time Notifications**: live unread count + notifications stream
- ⭐ **Agent Rating System**: candidates can rate employer “agents” (1–5 stars)
- 🔗 **LinkedIn OAuth**: login/signup with LinkedIn (with callback handler)

> 📌 Feature docs: [AGENT_RATING_FEATURE.md](AGENT_RATING_FEATURE.md), [LINKEDIN_OAUTH_SETUP.md](LINKEDIN_OAUTH_SETUP.md)

---

## 🗂️ Project Structure

```bash
src/
	app/
		(auth)/
			signin/ signup/ forgot-password/
			email-verification/ create-new-password/
			create-profile/
		(main)/
			page.tsx
			candidates/ employers/ jobs/
			messages/ my-network/ notification/
			profile/ upgrade/
		api/
			linkedin/
	assets/
	components/
		auth/ cards/ form/ forms/ messaging/ modals/
		profile/ providers/ shared/ sidebars/ ui/
	redux/
		api/ features/ store.ts
	hooks/
	lib/
	types/
```

---

## 🛠️ Installation

### 1) Prerequisites

- **Node.js** (18+ recommended)
- **npm** (comes with Node)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create `.env.local` in the project root (see the next section).

### 4) Run the development server

```bash
npm run dev
```

Open: http://localhost:3000

---

## 🔐 Environment Variables

You can start from the included example file: [.env.example](.env.example).

### Option A (recommended): copy the template

```bash
# Windows PowerShell
Copy-Item .env.example .env.local
```

```bash
# macOS / Linux
cp .env.example .env.local
```

### Required (Backend + Realtime)

```env
# Backend API base URL
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# Socket.IO server URL (real-time messaging/notifications)
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Optional: image/file host URL (if different from NEXT_PUBLIC_BASE_URL)
NEXT_PUBLIC_IMAGE_URL=http://localhost:5000

# Used by next.config.ts for next/image remotePatterns
NEXT_PUBLIC_HOSTNAME=localhost
```

### LinkedIn OAuth (optional)

If you want LinkedIn login/signup enabled, add:

```env
NEXT_PUBLIC_CLIENT_ID=your_linkedin_client_id
NEXT_PUBLIC_PRIMARY_CLIENT_SECRET=your_linkedin_client_secret

# Local:  http://localhost:3000/api/linkedin/callback
# Prod:   https://yourdomain.com/api/linkedin/callback
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

Setup guide: see [LINKEDIN_OAUTH_SETUP.md](LINKEDIN_OAUTH_SETUP.md).

---

## 📦 Scripts

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Lint the codebase
```

---

## 🚀 Build & Deployment

```bash
npm run build
npm run start
```

Make sure your deployment platform has the same environment variables configured (especially `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_SOCKET_URL`).

---

## 🔐 Security Notes

- ⚠️ **Do not commit real secrets** to git. Use `.env.local` (and keep it out of version control).
- ⚠️ The current LinkedIn configuration uses `NEXT_PUBLIC_PRIMARY_CLIENT_SECRET`. In production, consider moving token exchange/secret usage entirely to server-only env vars.

---

## 🙌 Final Note

This project demonstrates a scalable Next.js App Router frontend with real-time features, Redux Toolkit state management, and a modern UI stack (Tailwind + shadcn/ui).
