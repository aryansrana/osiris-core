import { IFunction, functionRegistry } from '../models/functions';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Ensure the temp directory exists
const tempDir = path.join(__dirname, '../../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

class FunctionService {
    static async deployFunction(function_name: string, runtime: string, code: string) {
        try {
            if (functionRegistry.hasOwnProperty(function_name)) {
                return false; // Function already exists
            }
            const newFunction: IFunction = {
                function_name,
                runtime,
                code,
                status: 'deployed',
            } as IFunction;

            functionRegistry[function_name] = newFunction;
            return true;
        } catch (error) {
            return false; // Error deploying function
        }
    }

    static async getFunctionStatus(function_name: string) {
        try {
            if (!functionRegistry.hasOwnProperty(function_name)) {
                return "error"; // Function doesn't exist
            }
            return functionRegistry[function_name].status;
        } catch (error) {
            return "error"; // Error fetching function status
        }
    }

    static async removeFunction(function_name: string) {
        try {
            if (!functionRegistry.hasOwnProperty(function_name)) {
                return false; // Function doesn't exist
            }
            delete functionRegistry[function_name];
            return true;
        } catch (error) {
            return false; // Error removing function
        }
    }

    static async invokeFunction(function_name: string, args: any[]): Promise<any> {
        try {
            if (!functionRegistry.hasOwnProperty(function_name)) {
                return null; // Function doesn't exist
            }
            const myFunction = functionRegistry[function_name];
            const argsString = args.map(arg => JSON.stringify(arg)).join(', ');

            // Generate unique filename components
            const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Format timestamp
            const uniqueId = uuidv4();
            const uniqueFileName = `${function_name}_${timestamp}_${uniqueId}`;

            // Define file paths in core/temp directory
            const functionFilePath = path.join(tempDir, `${uniqueFileName}.py`);
            const resultFilePath = path.join(tempDir, `${uniqueFileName}.json`);

            // Write the Python function to a file
            const pyCode = `
import json
${myFunction.code}
result = ${myFunction.function_name}(${argsString})
with open('${resultFilePath}', 'w') as f:
    json.dump({'result': result}, f)
`;

            fs.writeFileSync(functionFilePath, pyCode);

            // Execute the Python script
            await new Promise((resolve, reject) => {
                exec(`python ${functionFilePath}`, (error) => {
                    if (error) {
                        console.error(`Error executing Python script: ${error.message}`);
                        reject(error);
                    }
                    resolve(true);
                });
            });

            // Read the result from the JSON file
            const jsonData = fs.readFileSync(resultFilePath, 'utf-8');
            const result = JSON.parse(jsonData).result;

            // Clean up the temporary files
            fs.unlinkSync(functionFilePath);
            fs.unlinkSync(resultFilePath);

            return result;

        } catch (error) {
            console.error("Error invoking function:", (error as Error).message);
            return null;
        }
    }
}

export default FunctionService;
