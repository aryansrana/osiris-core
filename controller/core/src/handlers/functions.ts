import { Request, Response } from 'express';
import FunctionService from '../services/functions';

class FunctionHandler {
    static async deploy(req: Request, res: Response){
        try {
            const { function_name, runtime, code } = req.body;
            if (!function_name || !runtime || !code) {
                res.status(400).json({ error: 'Missing required fields.' });
                return;
                
            }
            const result = await FunctionService.deployFunction(function_name, runtime, code);
            res.status(result ? 200 : 400).json({ result });
            return;
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            return;
        }
    }

    static async status(req: Request, res: Response) {
        try {
            const { function_name } = req.params; // Changed to params to match route
            if (!function_name) {
                res.status(400).json({ error: 'Missing required fields.' });
                return;
            }
            const status = await FunctionService.getFunctionStatus(function_name);
            res.status(status === "error" ? 400 : 200).json({ status });
            return;
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            return;
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const { function_name } = req.params; // Changed to params to match route
            if (!function_name) {
                res.status(400).json({ error: 'Missing required fields.' });
                return;
            }
            const result = await FunctionService.removeFunction(function_name);
            //May need to redo output formatting
            res.status(result ? 200 : 400).json({ result });
            return;
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            return;
        }
    }

    static async invoke(req: Request, res: Response) {
        try {
            const { function_name, args } = req.body;
            if (!function_name) {
                res.status(400).json({ error: 'Missing required fields.' });
                return;
            }
            // Note: if args is not an array or not provided, it will be set to []
            const argsArray = Array.isArray(args) ? args : [];
            const result = await FunctionService.invokeFunction(function_name, argsArray);
            //May need to redo output formatting
            res.status(200).json({ result });
            return;
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
            return;
        }
    }
}

export default FunctionHandler;
