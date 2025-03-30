
# AquaWealth - Frontend

## 📚 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Project Outcome](#project-outcome)

---

## 🌍 Overview
**AquaWealth** is a fintech platform designed to enhance water sustainability and agricultural resilience. By combining **AI**, **data analytics**, and **financial services**, AquaWealth provides innovative financial solutions such as:
- **Smart Water Insurance**
- **Water Sustainability Investments**
- **Micro-Loans**
- **Water Credits**

The platform offers real-time data visualization, intuitive portfolio management tools, and a user-friendly interface for efficient financial tracking and decision-making.

---

## 🔑 Features

### 1. **Smart Water Insurance**
Protect agricultural assets from climate risks.
- **Apply for Insurance**: A seamless and simple insurance application process.
- **Claims & Verification**: Quick claim submission and verification for fast settlements.

### 2. **Investments**
Manage and track investments with ease.
- **Browse Projects**: Explore a variety of water sustainability investment opportunities.
- **Risk Filter**: Assess and filter investments based on risk levels.
- **My Investments**: Keep track of and manage your investment portfolio in one place.

### 3. **Micro-Loans**
Access hassle-free loans for your needs.
- **Apply for Loan**: Simple and fast loan applications.
- **Loan Status**: Real-time updates on loan approval and disbursement.
- **Repayment History**: Track your repayment schedules and transaction history.

### 4. **Water Credits**
Manage water usage through credits.
- **Usage Insights**: Get insights into water credit utilization.
- **Redeem Credits Now**: Instantly redeem earned water credits for sustainability.

---

## 💻 Installation

### Step 1: Clone the repository
```bash
git clone -b frontend https://github.com/yourusername/aquawealth.git
```

### Step 2: Navigate to the project folder
```bash
cd Aqua-Wealth/frontend-aqua-main/
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Start the development server
```bash
npm run dev
```

---

## 🗂️ Project Structure:




# 📂 Aqua-Wealth Project Structure



```bash
📂 Aqua-Wealth-frontend/
├── 📄 README.md
├── 📄 package-lock.json
└── 📂 frontend-aqua-main/
    ├── 📄 package-lock.json
    ├── 📂 frontend-aqua-main/
    │   ├── 📄 .gitignore
    │   ├── 📄 README.md
    │   ├── 📄 components.json
    │   ├── 📄 eslint.config.mjs
    │   ├── 📄 next.config.ts
    │   ├── 📄 package-lock.json
    │   ├── 📄 package.json
    │   ├── ⚙️ postcss.config.js
    │   ├── ⚙️ postcss.config.mjs
    │   ├── 📂 public/
    │   │   ├── 🖼️ Calendula-10.jpg
    │   │   ├── 🎨 chat-logo.svg
    │   │   ├── 📜 file.svg
    │   │   ├── 🌍 globe.svg
    │   │   ├── 🔄 next.svg
    │   │   ├── 🏞️ teodor-drobota.jpg
    │   │   ├── ⚡ vercel.svg
    │   │   ├── 📂 vouchers/
    │   │   │   └── 👤 user123/
    │   │   │       ├── 🖼️ 1.jpg
    │   │   │       ├── 🖼️ 2.jpg
    │   │   │       └── 🖼️ 3.png
    │   │   ├── 🌊 water-texture.png
    │   │   ├── 🖼️ window.svg
    │   │   └── 🏞️ zeynep-sumer.jpg
    │   ├── 📂 src/
    │   │   ├── 📂 Context/
    │   │   │   └── 📄 UserContext.tsx
    │   │   ├── 📂 app/
    │   │   │   ├── 📂 api/
    │   │   │   │   ├── 🧠 gemini/
    │   │   │   │   │   └── 🔄 route.ts
    │   │   │   │   └── 💳 vouchers/
    │   │   │   │       └── 👤 [userId]/
    │   │   │   │           └── 🔄 route.ts
    │   │   │   ├── 🛡️ apply-for-insurance/
    │   │   │   │   ├── 📝 form/
    │   │   │   │   │   └── 📄 page.tsx
    │   │   │   │   ├── 📄 page.tsx
    │   │   │   │   └── ✅ success/
    │   │   │   │       └── 📄 page.tsx
    │   │   │   ├── 📜 layout.tsx
    │   │   │   ├── 📊 dashboard/
    │   │   │   │   └── 📄 page.tsx
    │   │   │   ├── 🔐 login/
    │   │   │   │   └── 📄 page.tsx
    │   │   │   ├── 💰 investments/
    │   │   │   │   ├── 🔎 browse-projects/
    │   │   │   │   │   └── 📄 page.tsx
    │   │   │   │   ├── 💰 my-investments/
    │   │   │   │   │   ├── 📊 graph.tsx
    │   │   │   │   │   ├── 📄 page.tsx
    │   │   │   │   │   └── 📋 table.tsx
    │   │   │   │   ├── 📉 risk-filter/
    │   │   │   │   │   └── 📄 page.tsx
    │   │   ├── 📂 components/
    │   │   │   ├── 🛠️ AuthForm.tsx
    │   │   │   ├── 🤖 ChatbotWidget.tsx
    │   │   │   ├── 💳 LoanApplication.tsx
    │   │   │   ├── 💰 LoanPayment.tsx
    │   │   │   ├── 📄 LoginForm.tsx
    │   │   │   ├── 📊 investment-card.tsx
    │   │   │   ├── 📰 market-insights-placeholder.tsx
    │   │   │   ├── 📂 ui/
    │   │   │   │   ├── 🎨 FlipCard.module.css
    │   │   │   │   ├── 🔄 FlipCard.tsx
    │   │   │   │   ├── 🔘 button.tsx
    │   │   │   │   ├── 📄 card.tsx
    │   │   │   │   ├── 📋 table.tsx
    │   │   │   │   └── 📜 tabs.tsx
    │   │   ├── 📂 services/
    │   │   │   └── 🤖 geminiService.ts
    │   │   ├── 📂 utils/
    │   │   │   └── 🔐 auth.ts
    │   │   ├── 📂 styles/
    │   │   │   └── 🎨 globals.css
    │   │   ├── 📄 tailwind.config.js
    │   │   ├── 📄 tailwind.config.ts
    │   │   └── 📄 tsconfig.json
```







---

## 👥 Contributors
- **Khushi Verma**
- **Shubhanshi** 
- **Apoorva**
- **Anisha Kumari**
- **Ayushi Mehta**

---

## 🌱 Project Outcome
AquaWealth aims to enhance water security, boost agricultural resilience, and promote sustainable investments by integrating **fintech** solutions with **water conservation**. The platform offers innovative financial tools to support both farmers and investors.

---
