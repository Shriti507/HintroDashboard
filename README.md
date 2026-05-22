# Hintro Dashboard

This project is a modern, responsive frontend application for the Hintro Dashboard. It features a scalable UI, data visualization, and consumes a mock backend API to demonstrate both empty and populated data states.

## Links

- **Live Demo:** https://hintro-dashboard-two.vercel.app/
- **Video Walkthrough:** https://drive.google.com/file/d/1n2brykLUYSMtYReRpO4S6JMZG2NcdXJ2/view?usp=sharing

## Setup Instructions

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, v16.2)
- **UI Library:** [React](https://react.dev/) (v19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `date-fns` (date formatting), `clsx` & `tailwind-merge` (dynamic class name composition)

## Key Features Implemented

1. **Responsive Dashboard Layout:**
   - **Desktop:** Fixed sidebar navigation with consistent content spacing.
   - **Tablet/Mobile:** Collapsible sidebar with an overlay backdrop, activated via a hamburger menu. Fully responsive grid layouts for data cards and recent calls to prevent overflow.

2. **API Integration:**
   - Consumes data from external mock endpoints.
   - Incorporates loading skeletons and error states with retry mechanisms.

3. **User State Switching:**
   - The UI supports dynamic state toggling via the "Demo User" dropdown in the top navigation:
     - **Empty State (`u1`):** Demonstrates the UI when no data is present (0 hours used, no recent calls, etc.).
     - **Active User (`u2`):** Demonstrates the populated dashboard with actual usage metrics and call history.

4. **Data Visualization & Usage Indicators:**
   - Stats cards dynamically calculate and format metrics (e.g., converting seconds to minutes/seconds).
   - Sidebar includes a dynamic usage indicator (e.g., "181 of 1000 hours used") fetching directly from the user's data context.

5. **Feedback Loop:**
   - Interactive feedback submission form and feedback history display.
   - Utilizes browser `localStorage` to persist submitted feedback data locally.

## Assumptions Made

1. **Data Layer:** The application relies on a public mock API. It uses the `x-user-id` header to fetch different user profiles without requiring formal authentication tokens (JWTs, OAuth).
2. **Environment Variables:** Because the API is public, no `.env` setup is strictly required to run the project locally.
3. **Routing:** Built on the Next.js App Router. Navigation routes are integrated seamlessly into the main dashboard navigation structure.
