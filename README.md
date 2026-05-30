# Habit Tracker - Life Analytics & Efficiency Engine

A comprehensive personal time management and academic performance tracking system that monitors every hour of the day and measures how time usage affects learning, productivity, and academic performance.

## 🎯 Features

### 📊 Daily 24-Hour Analysis
- Track all activities across 16 predefined categories
- Visualize hourly breakdown via pie charts and timeline views
- Automatic 24-hour accounting

### 📚 Learning Time Calculator
- Monitor learning hours across multiple dimensions:
  - Daily learning hours
  - Weekly learning hours
  - Monthly learning hours
  - Semester learning hours
  - Yearly learning hours

### ⚡ Efficiency Score (0-100)
- Daily efficiency scoring based on:
  - Study hours
  - Sleep quality
  - Phone usage
  - Productivity ratings
  - Assignment completion
  - Class attendance
- Ratings: Poor, Average, Good, Excellent

### 🎓 Academic Performance Analytics
- Track CGPA progress
- Manage course grades and scores
- Predict academic performance
- Analyze trends (Improving, Stable, Declining)
- Monitor confidence levels

### 🔗 Success Correlation Engine
- Analyze relationships between:
  - Study hours vs GPA
  - Attendance vs GPA
  - Sleep vs GPA
  - Phone usage vs GPA
  - Skill learning vs GPA
- Generate actionable insights

### 📋 Reports
- Monthly observation reports
- Semester performance reports
- Personal insights and recommendations

## 📁 Project Structure

```
Habit_tracker/
├── server/
│   ├── models/
│   │   ├── User.js              # User authentication & profile
│   │   ├── Activity.js          # Daily activities (16 categories)
│   │   ├── AcademicRecord.js    # Academic data & CGPA tracking
│   │   └── DailyStats.js        # Daily efficiency metrics
│   ├── routes/
│   │   ├── auth.js              # Authentication (register/login)
│   │   ├── activities.js        # Activity CRUD operations
│   │   ├── analytics.js         # 24-hour tracking & efficiency
│   │   └── academic.js          # Academic records & CGPA
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   └── server.js                # Express server setup
├── package.json
└── .env.example
```

## 🛠 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT + Bcrypt
- **Validation**: Express-validator

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/alamin02/Habit_tracker.git
cd Habit_tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp server/.env.example server/.env
# Edit .env with your MongoDB URI and JWT secret
```

4. Start the server
```bash
npm run server
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Activities
- `POST /api/activities` - Create new activity
- `GET /api/activities` - Get activities (with date range filtering)
- `GET /api/activities/:id` - Get specific activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Analytics
- `GET /api/analytics/daily/:date` - 24-hour breakdown
- `GET /api/analytics/weekly/:weekStart` - Weekly summary
- `GET /api/analytics/learning/summary/:period` - Learning hours (daily/weekly/monthly)
- `POST /api/analytics/efficiency/calculate/:date` - Calculate efficiency score
- `GET /api/analytics/correlations/month` - Monthly correlations and insights

### Academic
- `POST /api/academic` - Create academic record
- `GET /api/academic` - Get all academic records
- `GET /api/academic/:semester` - Get specific semester
- `PUT /api/academic/:id` - Update academic record
- `GET /api/academic/progress/cgpa` - Get CGPA progress and trends

## 📝 Activity Categories

1. University Classes
2. Self Study
3. Assignment Work
4. Exam Preparation
5. Web Development Learning
6. Cybersecurity Learning
7. Coding Practice
8. Projects
9. Prayer
10. Exercise
11. Meals
12. Social Time
13. Phone Usage
14. Sleep
15. Commute
16. Other Activities

## 📊 Sample API Usage

### Create Activity
```bash
POST /api/activities
{
  "category": "Web Development Learning",
  "date": "2026-05-30",
  "startTime": "14:00",
  "endTime": "16:30",
  "description": "Learning React Hooks",
  "productivity": 4
}
```

### Get Daily Breakdown
```bash
GET /api/analytics/daily/2026-05-30
```

### Calculate Efficiency Score
```bash
POST /api/analytics/efficiency/calculate/2026-05-30
```

### Create Academic Record
```bash
POST /api/academic
{
  "semester": 1,
  "courses": [
    {
      "courseCode": "CSE101",
      "courseName": "Data Structures",
      "credits": 3,
      "gpa": 3.8
    }
  ]
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📈 Next Steps

- [ ] Build React frontend with dashboards
- [ ] Add data visualization (charts, heatmaps)
- [ ] Implement monthly/semester reports generation
- [ ] Add notification system
- [ ] Build mobile app

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Alamin** - [GitHub](https://github.com/alamin02)

---

**Start tracking your life today and optimize your academic performance! 🚀**
