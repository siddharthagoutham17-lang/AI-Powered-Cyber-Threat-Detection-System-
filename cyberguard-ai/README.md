# CyberGuard AI – Enterprise SOC & Threat Detection Platform

CyberGuard AI is a modern full-stack Security Operations Center (SOC) dashboard that allows security analysts, administrators, and students to detect cyber threat indicators in real time. Powered by AI and heuristic Machine Learning models.

---

## 🚀 Key Features

1. **Phishing URL Detection Heuristics**: Calculates lengths, special symbols, subdomain densities, SSL certificates, and registered domain ages to flag deceptive impersonations.
2. **IP Reputation Assessment**: Geolocates IP origins, trace careers (ISPs), maps exposed administrative ports, and indexes historic bad listings.
3. **PCAP Log Parser**: Feeds network text captures or firewall syslog sheets using Area and Bar charts to track peak flooding times.
4. **Operations Security Copilot**: Context-aware ChatGPT-styled sandbox chatbot loaded with active workspace parameters to generate Mitigation SOPs.
5. **PDF/CSV Report Generator**: Consolidates alerts to produce downloadable text logs and spreadsheet CSV tables.
6. **Multi-Role Simulation Gate**: Emulates Admin, Analyst, and Viewer privilege clearances for fine-grained action handling.

---

## 🛠 Tech Stack

* **Frontend**: React 19, Vite, Tailwind CSS, Recharts, Framer Motion, Lucide icons.
* **Backend**: Node.js, Express, tsx.
* **AI Engine**: `@google/genai` TypeScript SDK utilizing the `gemini-3.5-flash` model.
* **Storage / Identity**: Simulated secure Firebase Authentication interfaces with relational localStorage memory state caches.

---

## 📦 File Structures

* `server.ts` - Master ES Modules Express backend serving port `3000`. Integrates Vite middleware in development in addition to hosting the core JSON API endpoints.
* `server/analyzer.ts` - Core threat analysis controllers implementing heuristic estimators and lazy-initialized Gemini AI custom explanations.
* `src/App.tsx` - App coordinator tying top stats widgets, Tab consoles, and state updates.
* `src/types.ts` - Declared platform structures maintaining strictly typed scan contracts.
* `src/components/` - Splitted modular views capturing statistics speedometers, log checkers, visual charts, and chatbot streams.

---

## ⚙️ Directives & Deployment Guide

### Credentials Configuration
To activate the fully fledged Gemini SOC explanation engines:
1. Access **Settings > Secrets** panel in Google AI Studio.
2. Set the `GEMINI_API_KEY` with an authorized Google AI Developer key.

### Local Installation Commands:
```bash
# 1. Populate Node packages
npm install

# 2. Fire full stack development servers (Express + Vite)
npm run dev

# 3. Create standalone production bundles
npm run build

# 4. Initiate standalone servers
npm run start
```
---
*Secured with CyberGuard Security Correlator Node active.*
