import express, { json, urlencoded } from 'express';
import cors from "cors" ;
import analyzeRoute from "./routes/analyzeRoutes.js"
import chatRoute from "./routes/chatRoute.js";

const app = express() ;

app.use(cors());
app.use(express.json()) ;

// routes...
app.use("/api/analyze" , analyzeRoute);
app.use("/chat" ,chatRoute);

export default app;