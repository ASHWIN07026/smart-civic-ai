# 🏙️ AI Smart Civic Complaint & Response System

**Team:** Smart Civic AI | **Hackathon:** India Innovates 2026 | **Domain:** Politics & Civic Tech  
**College:** Shree Venkateshwara Hi-Tech Engineering College, Tamil Nadu  
**Members:** Ashwin S, Yogeshwaran A, Ragul A, Sivasakthi S, Kaviraj M, Gaurav Pandey H

---

## 📌 Overview

An AI-powered full-stack web application that lets citizens report civic issues (garbage, potholes, streetlights, water leakage), automatically classifies them using computer vision + NLP, routes them to the correct municipal department, and tracks resolution in real time.

---

## 🏗️ Architecture

```
Citizen App (React)
    ↓
Node.js + Express REST API  ←→  Socket.io (real-time)
    ↓                 ↓
MongoDB            Python Flask AI Engine
                   (OpenCV + NLP + TensorFlow)
```

---

## 🚀 Quick Start — Docker (Recommended)

### Prerequisites
- Docker Desktop installed
- Git

### Run with Docker
```bash
git clone https://github.com/your-repo/smart-civic-ai.git
cd smart-civic-ai

# Set your Google Maps API key in client/.env
# VITE_GOOGLE_MAPS_KEY=your_key_here

docker-compose up --build
```

| Service    | URL                     |
|------------|-------------------------|
| Frontend   | http://localhost:3000   |
| Backend    | http://localhost:5000   |
| AI Engine  | http://localhost:8000   |
| MongoDB    | mongodb://localhost:27017 |

### Seed the database
```bash
docker exec civic-server node config/seed.js
```

---

## 🛠️ Manual Setup (No Docker)

### Prerequisites
- Node.js 20+
- Python 3.11+
- MongoDB running locally

### 1. Backend
```bash
cd server
npm install
cp .env.example .env    # Edit MONGO_URI, JWT_SECRET, AI_ENGINE_URL
node config/seed.js     # Seed sample data
npm run dev             # Starts on port 5000
```

### 2. AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
python app.py           # Starts on port 8000
```

### 3. Frontend
```bash
cd client
npm install
cp .env.example .env    # Add VITE_GOOGLE_MAPS_KEY
npm run dev             # Starts on port 3000
```

---

## 🔐 Demo Login Credentials

| Role      | Email                      | Password    |
|-----------|----------------------------|-------------|
| Citizen   | citizen@example.com        | password123 |
| Authority | officer@civic.gov.in       | password123 |
| Admin     | admin@civic.gov.in         | password123 |

---

## 🤖 Training the AI Model

```bash
cd ai-engine

# Organise your dataset:
# dataset/Garbage/       (100+ images)
# dataset/Pothole/       (100+ images)
# dataset/Streetlight/   (100+ images)
# dataset/Water Leakage/ (100+ images)
# dataset/Other/         (100+ images)

python model/train.py
# Saves model to model/civic_model.h5
```

**Without a trained model**, the system falls back to NLP keyword-based classification, which works out of the box.

---

## 📡 API Reference

### Auth
| Method | Endpoint              | Access  | Description        |
|--------|-----------------------|---------|--------------------|
| POST   | /api/auth/register    | Public  | Register new user  |
| POST   | /api/auth/login       | Public  | Login              |
| GET    | /api/auth/me          | Any     | Current user info  |

### Complaints
| Method | Endpoint                      | Access              | Description           |
|--------|-------------------------------|---------------------|-----------------------|
| POST   | /api/complaints               | Citizen             | Submit complaint      |
| GET    | /api/complaints               | Any (role-filtered) | List complaints       |
| GET    | /api/complaints/:id           | Any                 | Complaint detail      |
| PATCH  | /api/complaints/:id/status    | Authority / Admin   | Update status         |
| DELETE | /api/complaints/:id           | Admin only          | Delete complaint      |

### Admin Analytics
| Method | Endpoint           | Access              | Description           |
|--------|--------------------|---------------------|-----------------------|
| GET    | /api/admin/stats   | Admin / Authority   | Summary stats         |
| GET    | /api/admin/heatmap | Admin / Authority   | All complaint points  |
| GET    | /api/admin/trends  | Admin / Authority   | 30-day trend data     |

### AI Engine
| Method | Endpoint  | Description                             |
|--------|-----------|-----------------------------------------|
| POST   | /classify | Classify image + text → category + dept |

---

## ⚡ Real-Time Events (Socket.io)

| Event              | Direction      | Payload                              |
|--------------------|----------------|--------------------------------------|
| join:complaint     | Client → Server | complaintId                         |
| join:admin         | Client → Server | —                                   |
| complaint:updated  | Server → Client | { complaintId, status, note }       |
| complaint:new      | Server → Admin  | { complaintId, category, dept }     |

---

## 📁 Project Structure

```
smart-civic-ai/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/             # Login, Register, Dashboards, etc.
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # Auth context
│   │   ├── hooks/             # useSocket, useComplaints
│   │   └── api/               # Axios instance
│   └── Dockerfile
├── server/                    # Node.js backend
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express routers
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth, upload
│   └── Dockerfile
├── ai-engine/                 # Python Flask AI service
│   ├── app.py
│   ├── classifier.py          # NLP + image classification
│   ├── model/train.py         # MobileNetV2 training script
│   └── Dockerfile
└── docker-compose.yml
```

---

## 🏆 Key Features

- 🤖 **AI Classification** — MobileNetV2 + NLP keyword matching
- 📍 **GPS Location Tagging** — Browser geolocation + OpenStreetMap reverse geocoding
- ⚡ **Real-Time Updates** — Socket.io WebSocket events
- 📊 **Admin Analytics** — Trend charts, category pie charts, department breakdown
- 🔐 **Role-Based Access** — Citizen / Authority / Admin with JWT auth
- 📱 **Mobile-Friendly** — Responsive TailwindCSS UI
