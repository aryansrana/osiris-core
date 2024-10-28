import Function from '../models/functions';
import { exec } from 'child_process';
//NOTE: THE CODE BELOW IS AI GENERATED, I HAVEN'T READ OR TESTED ANY OF IT AND IT MAY NOT EVEN BE APPLYING THE CORRECT BUSINESS LOGIC, USE AT YOUR OWN DISCRETION
//BUT I WOULD LIKE YOU TO USE MONGOOSE TO EASILY DO CRUD OPERATIONS
class FunctionService {
    static async deployFunction(function_name: string, runtime: string, code: string) {
        try {
            // Create a new function document using the Mongoose model
            const newFunction = new Function({ function_name, runtime, code });
            await newFunction.save(); // Save to the database
            return true; // Indicate success
        } catch (error) {
            console.error("Error deploying function:", (error as Error).message);
            return false; // Indicate failure
        }
    }

    static async getFunctionStatus(function_name: string) {
        try {
            // Retrieve function by name from the database
            const functionData = await Function.findOne({ function_name });
            if (!functionData) {
                return "error"; // Handle case where function does not exist
            }
            return functionData.status || "unknown"; // Return the function's status or default to "unknown"
        } catch (error) {
            console.error("Error fetching function status:", (error as Error).message);
            return "error"; // Indicate an error occurred
        }
    }

    static async removeFunction(function_name: string) {
        try {
            // Remove function from the database
            const result = await Function.deleteOne({ function_name });
            return result.deletedCount > 0; // Return true if function was removed, false otherwise
        } catch (error) {
            console.error("Error removing function:", (error as Error).message);
            return false; // Indicate failure
        }
    }

    static async invokeFunction(function_name: string, args: any[]): Promise<any> {
        try {
            // Check if the function exists in the database
            const functionData = await Function.findOne({ function_name });
            if (!functionData) {
                throw new Error("Function not found");
            }

            // Execute based on runtime
            const { runtime, code } = functionData;
            return await new Promise((resolve, reject) => {
                if (runtime === "nodejs") {
                    try {
                        const result = eval(`(${code})`)(...args);
                        resolve(result); // Return the result directly
                    } catch (err) {
                        reject(new Error("Error executing Node.js code"));
                    }
                } else if (runtime === "python3") {
                    const pythonFunctionName = functionData.function_name;
                    const script = `
import sys, json
args = json.loads(sys.argv[1])
${code}
result = ${pythonFunctionName}(*args)
print(json.dumps(result))
                    `;

                    exec(`python3 -c "${script}" '${JSON.stringify(args)}'`, (error, stdout, stderr) => {
                        if (error) {
                            reject(new Error(`Python execution error: ${stderr}`));
                        } else {
                            try {
                                const output = JSON.parse(stdout);
                                
                                // Check if output is a number and convert if necessary
                                const parsedOutput = typeof output === 'string' && !isNaN(Number(output))
                                    ? Number(output)
                                    : output;

                                resolve(parsedOutput); // Return parsed output
                            } catch (parseError) {
                                reject(new Error("Failed to parse Python output"));
                            }
                        }
                    });
                } else {
                    reject(new Error("Unsupported runtime"));
                }
            });
        } catch (error) {
            console.error("Error invoking function:", (error as Error).message);
            return null;
        }
    }
}

export default FunctionService;
