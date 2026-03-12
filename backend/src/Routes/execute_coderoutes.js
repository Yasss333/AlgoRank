import express from "express";
import { verfiyJWT } from "../Middleware/userverifymiddlware.js";
import  {executionRouter, submitCodeHandler}  from "../Controller/execute_code.js";
const  router=express.Router();

// Primary POST endpoints (used by frontend)
router.post("/", verfiyJWT, executionRouter);
router.post("/submit", verfiyJWT, submitCodeHandler);

// Friendly GET responses to avoid "Cannot GET /..." when visited in browser
router.get("/", (req, res) => {
	res.status(405).json({ message: "Method GET not allowed. Use POST /api/v1/execute-route/ to execute code." });
});

router.get("/submit", (req, res) => {
	res.status(405).json({ message: "Method GET not allowed. Use POST /api/v1/execute-route/submit to submit code." });
});

// Catch-all for other methods
router.all("/", (req, res, next) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: `Method ${req.method} not allowed on this endpoint.` });
	}
	next();
});

export default router;