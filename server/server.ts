import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db.js";
import session from "express-session";
import MongoStore from "connect-mongo"; 
import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import Userrouter from "./routes/UserRoutes.js";

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }
}

await connectDB()


const app = express();

// Middleware
app.use(express.json());




app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false, // Set to true if using HTTPS
        sameSite: 'lax',
    } , // 7 days
    store: new MongoStore({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: 'sessions'
    })
}))


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use((req, res, next) => {
  const originalSetHeader = res.setHeader;

  res.setHeader = function (name, value) {
    if (name.toLowerCase().includes("access-control")) {
      console.log("SET HEADER:", name, value);
    }
    return originalSetHeader.apply(this, arguments as any);
  };

  next();
});

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, origin); // ✅ NOT true
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));


app.get('/', (req: Request, res: Response) => {
    console.log("Received request at /");
    res.send('Server is Live!');
});
app.use('/api/auth', AuthRouter)
app.use('/api/thumbnail', ThumbnailRouter)
app.use('/api/user', Userrouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});