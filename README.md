# Drop Me - Recycling Backend

## 📌 Overview
This project is a simple backend system for a recycling machine flow where users can recycle items and earn points.  
The system simulates a real-world product flow: scan → recycle → reward points.

---

## 🚀 Features
- User identification (by userId)
- Recycling transaction creation
- Points system based on item type
- Persistent storage using MongoDB

---

## 🧠 Points System
- Plastic → 5 points  
- Glass → 10 points  
- Metal → 15 points  

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure
- models → Database schemas (User, Transaction)
- controllers → Business logic
- routes → API routes
- utils → Logger (wild card feature)
- config → Database connection

---

## ⚙️ Setup Instructions


### 1. Install dependencies
```bash
npm install

npx nodemon app.js

### 2. Environment Variables
Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000



API Endpoint
♻️ Recycle Item
POST /api/recycle
Request Body:

{
  "userId": "USER_ID_HERE",
  "itemType": "plastic"
}


Response
{
  "message": "Recycling successful",
  "transaction": {
    "userId": "...",
    "itemType": "plastic",
    "pointsEarned": 5
  },
  "totalPoints": 5
}



### 3. 🚀 Add a “future improvements” section (VERY good for internships)

```md
## 🚀 Future Improvements
- Add authentication (JWT)
- Add QR code scanning simulation
- Add admin dashboard for monitoring users
- Add leaderboard for users based on points
