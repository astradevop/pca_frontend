# Payment Collection App (PCA)

A modern, high-performance Payment Collection application built with **React Native (Expo)** and **Django REST Framework**. This application provides a full-featured admin portal for managing customer personal loans, tracking EMIs, and processing payments with secure JWT authentication.

---

## 🚀 Key Features

- **Secure JWT Authentication**: Admin-only access with persistent session handling.
- **Customer Management**: Dashboard view of all customers, loan tenures, and EMI status.
- **New Customer Onboarding**: Add new customer loan records directly from the app.
- **Payment Processing**: Record EMI payments with transaction tracking.
- **Payment History**: Search and view historical payments for any specific account.
- **Responsive Design**: Premium "GitHub Dark" aesthetic, optimized for Web, Android, and iOS.

---

## 🛠️ Tech Stack

- **Frontend**: React Native, Expo, Axios, React Navigation.
- **Backend**: Django, Django REST Framework, SimpleJWT, MySQL.
- **DevOps**: GitHub Actions (CI/CD), AWS EC2 (Ubuntu), Nginx, Gunicorn.

---

## 🔑 Credentials & Access

- **Live Website**: `http://13.127.123.21`
- **Default Admin Account**:
  - **Username**: `admin`
  - **Password**: `admin123`
- **Backend API Root**: `http://13.127.123.21/api/`

---

## 📦 Project Structure

```bash
PCA_FRONTEND/
├── App.js                 # Application entry & Navigation
├── src/
│   ├── api.js             # Axios configuration & JWT handling
│   └── screens/
│       ├── LoginScreen.js      # Auth Portal
│       ├── DashboardScreen.js  # Main Overview
│       ├── AddCustomerScreen.js # Onboarding Form
│       ├── MakePaymentScreen.js # Transaction Form
│       └── PaymentHistoryScreen.js # Search & History
```

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)

### 2. Installation
```bash
git clone https://github.com/astradevop/pca_frontend.git
cd PCA_FRONTEND
npm install
```

### 3. Environment Config
Create a `.env` file in the root:
```ini
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 4. Start the App
```bash
npm start
```
- Press `w` to run in web browser.
- Scan QR code with **Expo Go** app for mobile testing.

---

## 🤖 CI/CD Workflow

The project uses **GitHub Actions** for automated deployment to AWS EC2:
1. **Push to Main**: Triggers the build.
2. **Build**: Expo exports the production web bundle.
3. **Deploy**: Static files are synchronized to AWS via SCP.

---

## 📄 License
MIT License. Created for SMEC PLACEMENTS portal evaluation.
