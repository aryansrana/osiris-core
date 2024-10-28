import Function from '../models/functions';

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
                return "Function not found"; // Handle case where function does not exist
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

    static async invokeFunction(function_name: string, args: any[]) {
        try {
            // Check if the function exists in the database
            const functionData = await Function.findOne({ function_name });
            if (!functionData) {
                throw new Error("Function not found"); // Throw error if function does not exist
            }

            // Here you can implement your logic to actually invoke the function
            // For example, if you stored code as a string, you could evaluate it
            // WARNING: Evaluating code can be dangerous and should be handled carefully
            const result = eval(`(${functionData.code})`)(...args); // Simple example of invoking code
            return result; // Return the result of the invocation
        } catch (error) {
            console.error("Error invoking function:", (error as Error).message);
            return null; // Return null in case of an error
        }
    }
}

export default FunctionService;
