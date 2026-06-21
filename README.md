# 🏥 City Care Clinic: Real-Time Queue Manager

An enterprise-grade, real-time patient queue management system built to eliminate waiting room friction. 

## 🚀 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose for schema validation)
* **Real-Time Engine:** Socket.io (WebSockets)
* **Frontend:** Next.js, React, Tailwind CSS

## 🗺️ The Three Interfaces
1. **Receptionist Dashboard** (`/receptionist`): The command center for adding patients and clearing rooms. Lightning fast and mistake-proof.
2. **Public TV Board** (`/tv`): A stunning dark-mode display for the waiting room showing active doctors and the upcoming queue.
3. **Live Patient Tracker** (`/track`): A mobile-first view for patients to track their personal wait time securely via a generated magic link.

## ✨ Key Features
* **Zero-Latency Sync:** WebSockets ensure the Receptionist, Public TV, and Patient mobile trackers update instantly without polling.
* **Auto-Routing Load Balancer:** Automatically detects empty doctor rooms and routes the next patient to the first available slot.
* **Dynamic Wait Time Analytics:** Calculates rolling averages from actual historical completion times to give patients accurate estimates.
* **Frictionless Onboarding:** QR Code generation and "Magic Link" system bypasses the need for patients to download apps or type complex passwords.

## 🛠️ How to Run Locally
1. Clone the repo.
2. Inside `/backend`, create a `.env` file with your `MONGO_URI`. Run `npm install` and `npm run dev`.
3. Inside `/frontend`, run `npm install` and `npm run dev`.
4. Open `http://localhost:3000/receptionist` and `http://localhost:3000/tv`.
