# Travel Agency and Accommodation Management for event project
# Project Preview




https://github.com/user-attachments/assets/aa33b476-c80a-45c1-88f6-71bab7ba286a

# 🌍 Travel and Accommodation Management for Events  

[![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-green)]()  
[![Made with React](https://img.shields.io/badge/Made%20with-React-blue)]()  

---

## 📌 Overview  
**Travel and Accommodation Management for Events** is a **web-based platform** that simplifies event logistics by connecting **Event Managers, Clients, Travel Agencies, Hotels, and Guests** on one platform.  
It provides **role-based portals, automated workflows, email notifications, and real-time dashboards** for efficient event planning and execution.  

---

## 👥 Stakeholders  
- **Admin** – System configuration and access control  
- **Event Manager** – Creates/manages events, budgets, and bookings  
- **Client (Sponsor)** – Reviews and approves travel & accommodation plans  
- **Travel Agency** – Provides travel options and estimates  
- **Hotel** – Provides accommodation options and budgets  
- **Guests** – Submit travel & stay preferences via a public form  

---

## 🎯 Business Objectives  
✔ Efficient event creation and management  
✔ Real-time visibility for clients  
✔ Easy guest submission of preferences  
✔ Automated communication & approvals  
✔ Interactive dashboards for tracking  

---

## ⚙️ Features & Functional Requirements  

### 🔐 Role-based Access  
- **Admin Portal** – User management & configuration  
- **Event Manager Portal** – Events, guests, budgets, vendors  
- **Client Portal** – Approvals & sponsorship management  
- **Guest Access** – Public form for preferences  
- **Travel Agency & Hotel Portals** – Budget & availability updates  

### 🔄 Workflow  
1. Event Manager creates event → Client notified  
2. Client shares public guest form → Guest submits details  
3. Travel Agency & Hotel provide estimates  
4. Client + Event Manager approve/decline  
5. Agencies/Hotels confirm bookings  
6. Guest receives email confirmation  
7. Dashboard updated with live progress  

---

## 🛡️ Non-Functional Requirements  
- **Performance** → Supports up to 10,000 concurrent users  
- **Security** → Role-based access & encrypted data  
- **Usability** → Responsive design for mobile & desktop  
- **Reliability** → 99.9% uptime with fallback mechanisms  

---

## 📊 Dashboard Insights  
- 📌 Events managed  
- 📌 Guest travel/accommodation status  
- 📌 Approved vs pending budgets  
- 📌 Overall event expenses  

---

## 🛠️ Tech Stack  
**Frontend:** React.js / Next.js, TailwindCSS  
**Backend:** Node.js (Express) / Django  
**Database:** MongoDB / PostgreSQL  
**Authentication:** JWT & RBAC  
**Emails:** Nodemailer / AWS SES / SendGrid  
**Deployment:** Docker, Kubernetes, AWS/GCP/Azure  

---

## 🚀 Installation & Setup  

```bash
# Clone the repository
git clone https://github.com/yourusername/travel-event-management.git

# Navigate into the project directory
cd travel-event-management

# Install dependencies
npm install

# Setup environment variables (.env)
# Example:
# DB_URI=mongodb+srv://...
# EMAIL_HOST=smtp.example.com
# JWT_SECRET=your_secret

# Run development server
npm run dev

# Build for production
npm run build
