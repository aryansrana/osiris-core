import { Router } from "express";
import FunctionHandler from "../handlers/functions";

const router = Router();

// /api/functions/deploy (Info will be sent in request.body)
router.post('/deploy', FunctionHandler.deploy);

// /api/functions/status/:function_name
router.get('/status/:function_name', FunctionHandler.status);

// /api/functions/remove/:function_name
router.delete('/remove/:function_name', FunctionHandler.remove);

// /api/functions/invoke (Info will be sent in request.body)
router.get('/invoke', FunctionHandler.invoke);

export default router;