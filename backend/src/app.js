import express, { json, urlencoded } from 'express';
import cors from "cors" ;
import analyzeRoute from "./routes/analyzeRoutes.js"

const app = express() ;

app.use(cors());
app.use(express.json()) ;

// routes...
app.use("/api/analyze" , analyzeRoute);

export default app;