import express, { json, urlencoded } from 'express';
import cors from "cors" ;

const app = express() ;

app.use(cors());
app.use(express.json()) ;

// routes...

export default app;