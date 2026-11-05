require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./src/routes/authRoute");
const interviewRouter = require("./src/routes/interviewRoute");
const questionRouter = require("./src/routes/questionRoute");
const aiRouter = require("./src/routes/aiRoute");
const answerRouter = require("./src/routes/answerRoute");
const resultRouter = require("./src/routes/resultRoute");

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// Parse allowed frontend origins from CLIENT_URL / FRONTEND_URL or use local defaults
const parseAllowedOrigins = () => {
    const rawOrigins = [process.env.CLIENT_URL, process.env.FRONTEND_URL]
        .filter(Boolean)
        .join(",");

    const origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
    ];

    if (rawOrigins) {
        rawOrigins.split(",").forEach((item) => {
            const cleaned = item.trim().replace(/\/+$/, "");
            if (!cleaned) return;
            origins.push(cleaned);
            if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
                origins.push(`https://${cleaned}`);
                origins.push(`http://${cleaned}`);
            }
        });
    }

    return Array.from(new Set(origins));
};

const allowedOrigins = parseAllowedOrigins();

// Configure CORS with dynamic origin validation, credentials, and preflight support
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
        if (!origin) {
            return callback(null, true);
        }

        const normalizedOrigin = origin.replace(/\/+$/, "");

        // Allow configured origins and local development hosts
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }

        // Allow any Vercel deployment domain (*.vercel.app)
        try {
            const parsed = new URL(origin);
            if (parsed.hostname.endsWith(".vercel.app")) {
                return callback(null, true);
            }
        } catch {
            // Ignore URL parsing errors
        }

        // Reject other origins
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/interview", interviewRouter);
app.use("/api/question", questionRouter);
app.use("/api/ai", aiRouter);
app.use("/api/answer", answerRouter);
app.use("/api/result", resultRouter);

app.get("/", (req, res) => {
    res.send("PrepPilot is Working Successfully!");
});

mongoose
    .connect(uri)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(PORT, () => {
            console.log(`PrepPilot is listening on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
