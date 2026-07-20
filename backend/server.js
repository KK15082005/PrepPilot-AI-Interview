const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/authRoute");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const interviewRouter = require("./src/routes/interviewRoute");
const questionRouter = require("./src/routes/questionRoute");
const aiRouter = require("./src/routes/aiRoute");
const answerRouter = require("./src/routes/answerRoute");
const resultRouter = require("./src/routes/resultRoute");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(cors({ origin: "http://localhost:5173", credentials: true}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" ,authRoute ) ;
app.use("/api/interview" , interviewRouter) ;
app.use("/api/question" , questionRouter) ;
app.use("/api/ai" , aiRouter);
app.use("/api/answer" , answerRouter );
app.use("/api/result" , resultRouter);


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


