**Backend:**
Tech Stack Overview

| **Backend** | Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, Bcrypt, Cloudinary,Zod validation |

note-organize-app-server-side
-backend/
│
├── controllers/        # Business logic for tasks, auth
├── models/             # Mongoose schemas (User, Task)
├── routes/             # Express routers
├── middlewares/        # Auth, error handler
├── config/             # DB and app config
├── utils/              # Helper functions
├── server.js           # Entry point
└── .env                # Environment variables

**Image Upload**

- Upload note images to **Cloudinary**
- Secure file handling using `multer`

## ⚙️ Environment Variables Example


PORT=

DATABASE_URL=

USER_NAME=

USER_PASS= 

BCRYPT_SALT_ROUND=

JWT_ACCESS_SECRET=

JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_SECRET=

JWT_REFRESH_EXPIRES_IN=

CLOUDINARY_NAME=

CLOUDINARY_KEY=

CLOUDINARY_SECRET=

git clone https://github.com/Shajadulhaqueemon111/note-organize-app-server-side.git
cd taskify-backend
npm install
npm run dev

