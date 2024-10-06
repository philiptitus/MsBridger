

---

# MsBridger - Your AI-Powered Budget Planner 📊

[![CircleCI](https://circleci.com/gh/infinitered/ignite.svg?style=svg)](https://circleci.com/gh/infinitered/ignite)

## Overview:

**MsBridger** is an AI-powered mobile application designed to help users efficiently manage their finances. From tracking income and expenses to managing budgets and savings plans, MsBridger offers a user-friendly, mobile-first solution for all financial needs.

The app is powered by the **Pirate API**, a Django-based server that manages data and interactions. You can find the backend source code [here](https://github.com/philiptitus/bridger.git).

---

## Tech Stack:

- **Frontend**: React Native
  - Responsive and high-performance mobile application built for both iOS and Android.
  - Utilizes the **Ignite** React Native template for efficient setup and consistent development practices.
  - Seamless integration of AI-powered features, ensuring an intuitive user experience.

- **AI Integration**: Google Gemini
  - Offers intelligent financial analysis and personalized budgeting advice.
  - Machine learning algorithms predict future expenses and provide insights based on spending habits.

- **Backend**: Django (via Pirate API)
  - Handles secure data processing, financial transactions, and RESTful API services.
  - Provides robust user management and financial reporting infrastructure.

---

## Quick Start 🚀

Here’s how the **MsBridger** mobile project is structured:

```
msbridger-project
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   └── app.tsx
├── assets
│   ├── icons
│   └── images
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── android
├── ios
├── index.js
└── package.json
```

### **./app directory**

- **components**: Reusable UI components to build screens.
- **i18n**: Contains translations for multi-language support.
- **models**: State management models using **MobX State Tree**.
- **navigators**: React Navigation setup for managing app screens.
- **screens**: Complete screens such as income tracking, expense reports, and savings plans.
- **services**: External service integrations, including the Pirate API.
- **theme**: Defines the app’s styling, including colors and typography.
- **utils**: Utility functions shared across the app.
- **app.tsx**: Entry point of the application.

---

## Features 🏆

- **Income & Expense Tracking**: 
  Easily log and categorize your income and expenses in one place.
  
- **Budget Management**:
  Set financial goals and monitor your progress. Get alerts when nearing budget limits.

- **Savings Plans**:
  Create and track savings plans with customizable goals.

- **AI Financial Insights**:
  AI-driven insights powered by **Google Gemini** help users make smarter financial decisions based on spending trends.

- **Responsive UI**:
  Smooth and user-friendly mobile interface for managing finances anytime, anywhere.

---

## Running the App

To get the mobile app running locally:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/philiptitus/msbridger-mobile.git
   cd msbridger-mobile
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Start the Application**  
   ```bash
   npx expo start
   ```

4. **Preview**  
   - Open in [Expo Go](https://expo.dev/go)
   - Run on an Android/iOS simulator.

---

## Additional Resources 📚

- [Expo Documentation](https://docs.expo.dev/)  
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

### **License**

**Copyright Philip Titus 2024**

---

