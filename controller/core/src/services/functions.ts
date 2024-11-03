import { IFunction, functionRegistry } from '../models/functions';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

//comment
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

            switch (myFunction.runtime) {
                case "Python 3.8":
                    try {
                        const uniqueId = uuidv4();
                        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                        const functionFilePath = path.join(__dirname, `../../temp${myFunction.function_name}_${timestamp}_${uniqueId}.py`);
                        const resultFilePath = path.join(__dirname, `../../temp/${myFunction.function_name}_${timestamp}_${uniqueId}.json`);

                        const pyCode = 
`
import json
${myFunction.code}
result = ${myFunction.function_name}(${argsString})
with open('${resultFilePath}', 'w') as f:
    json.dump({'result': result}, f)`;

                        fs.writeFileSync(functionFilePath, pyCode);
                        
                        await new Promise((resolve, reject) => {
                            exec(`python3 ${functionFilePath}`, (error) => {
                                if (error) {
                                    console.error(`Error executing Python script: ${error.message}`);
                                    reject(error);
                                }
                                resolve(true);
                            });
                        });

                        const jsonData = fs.readFileSync(resultFilePath, 'utf-8');
                        const result = JSON.parse(jsonData).result;

                        fs.unlinkSync(functionFilePath);
                        fs.unlinkSync(resultFilePath);

                        return result;
                    } catch (error) {
                        console.error("Error invoking Python function:", (error as Error).message);
                        return null;
                    }
                case "Javascript":
                    try {
                        const jsCode = `${myFunction.code} ${myFunction.function_name}(${argsString});`;
                        const jsResult = eval(jsCode);
                        return jsResult;
                    } catch (error) {
                        console.error("Error invoking JavaScript function:", (error as Error).message);
                        return null;
                    }
                default:
                    console.error("Unsupported runtime");
                    return null; // Runtime not supported
            }
        } catch (error) {
            console.error("Error invoking function:", (error as Error).message);
            return null;
        }
    }
}

export default FunctionService;
