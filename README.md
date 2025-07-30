# NomadKing MVP

A networking platform tailored for digital nomads—enabling professionals working remotely to connect, share resources, post events, and collaborate globally.

## 🌍 Overview

NomadKing MVP is a community-driven web application where digital nomads can:
- Create profiles showcasing skills and location.
- Discover and connect with fellow nomads.
- Post events, meetups, and resource listings.
- Chat and collaborate across time zones.

Built with a modern tech stack for scalability and real‑time interaction.

## 🚀 Features

- User registration, profiles, and geolocation data
- Browse and search members by location, skill, or interests
- Event & meetup creation with RSVPs
- Direct chat or message system between users
- Responsive UI for mobile and desktop
- Backend validation and secure authorization

## 🧱 Technologies

- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Frontend**: React
- **Authentication**: JWT
- **Styling**: Tailwind CSS or Material UI (adjust as needed)
- **Environment**: dotenv for configuration

## 📦 Table of Contents

- [Installation](#installation)  
- [Environment Configuration](#environment-configuration)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [API Endpoints](#api-endpoints) *(optional)*
- [License](#license)  
- [Contact](#contact)

## 🛠️ Installation

1. Clone the repo:
 ```bash
 git clone https://github.com/carloslpz1/nomadking_mvp.git
 cd nomadking_mvp
 ```

2. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Copy `.env.example` to `.env` in both frontend and backend as needed, then configure:
```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nomadking_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
```

4. Set up the database:
```bash
createdb nomadking_db
# or run migrations / seeders
```

5. Launch the application:
```bash
# Backend
npm run dev

# Frontend (in another terminal)
cd ../frontend
npm start
```

Open your browser at `http://localhost:3000`.

## 💡 Usage

- Register or log in to create a profile with your bio, skills, and current (or planned) location.
- Browse other users on the map or via search filters.
- Post and RSVP for local or virtual events.
- Send messages and network in-app with other nomads.
- Share connections, gigs, or resources via your profile.

## 🗂️ Project Structure

```
nomadking_mvp/
├── backend/
│   ├── controllers/
│   ├── models/            # Sequelize or pg schema definitions
│   ├── routes/
│   ├── middleware/        # Auth, error handling, validation
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── migrations/            # DB migration scripts (optional)
├── seeders/               # Sample data (optional)
├── .env.example
├── README.md
└── package.json
```

## 🧾 API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/:id`
- `GET /api/users?location=&skill=`
- `POST /api/events, GET /api/events`
- `POST /api/messages/:userId`

## 📄 License

This project is licensed under MIT — see the LICENSE file.

## 📬 Contact

For feedback or support, open an issue on GitHub or drop a message via the contact channels.
