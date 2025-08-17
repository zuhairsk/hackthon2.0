# DebugQuest Backend

- Node.js + Express
- MongoDB (Mongoose)
- JWT Auth + bcrypt
- Socket.io

## Setup

1) Copy `.env.example` to `.env` and fill values.
2) Install deps: `npm i`
3) Run dev: `npm run dev`

API base: `/api`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/debug/analyze` (auth)
- `GET /api/history` (auth)
- `POST /api/history` (auth)
- `GET /api/leaderboard`
- `POST /api/leaderboard/update`