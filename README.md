
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

<style>
  /* Scrollable folder structure */
  .folder-structure {
      font-family: 'Courier New', Courier, monospace;
      background: #f6f8fa;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #d1d5da;
      overflow-x: auto;
      max-height: 400px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="folder-structure">

```bash
Aqua-Wealth-frontend/
├── README.md
├── package-lock.json
└── frontend-aqua-main/
    ├── package-lock.json
    ├── frontend-aqua-main/
    │   ├── .gitignore
    │   ├── README.md
    │   ├── components.json
    │   ├── eslint.config.mjs
    │   ├── next.config.ts
    │   ├── package.json
    │   ├── public/
    │   │   ├── assets/
    │   │   │   ├── chat-logo.svg
    │   │   │   ├── file.svg
    │   │   │   ├── globe.svg
    │   │   │   ├── next.svg
    │   │   │   ├── vercel.svg
    │   │   │   ├── window.svg
    │   │   │   ├── water-texture.png
    │   │   │   ├── vouchers/
    │   │   │   │   └── user123/
    │   │   │   │       ├── 1.jpg
    │   │   │   │       ├── 2.jpg
    │   │   │   │       └── 3.png
    │   │   ├── images/
    │   │   │   ├── Calendula-10.jpg
    │   │   │   ├── teodor-drobota-uyyRJA2an4o-unsplash.jpg
    │   │   │   ├── zeynep-sumer-lk3F07BN8T8-unsplash.jpg
    │   ├── src/
    │   │   ├── Context/
    │   │   ├── app/
    │   │   ├── components/
    │   │   ├── data/
    │   │   ├── lib/
    │   │   ├── services/
    │   │   ├── styles/
    │   │   └── utils/
    │   ├── tailwind.config.js
    │   ├── tsconfig.json
Aqua-Wealth-backend/
├── .gitignore
├── README.md
├── pom.xml
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/aquawealth/
    │   │       ├── config/
    │   │       ├── controller/
    │   │       ├── model/
    │   │       ├── repository/
    │   │       ├── service/
    │   │       └── util/
    │   ├── resources/
    │   │   ├── application.properties
    │   │   └── webapp/WEB-INF/views/
    │   │       ├── apply-loan.jsp
    │   │       ├── claimInsurance.jsp
    │   │       ├── index.jsp
    │   │       ├── notifications.jsp
    │   │       └── payment-success.jsp
    ├── test/
    │   └── java/com/
    │       └── AquawealthApplicationTests.java

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
