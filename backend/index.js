import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/route.js";
import "./model/index.js";
import authRoutes from "./routes/authRoute.js"

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
