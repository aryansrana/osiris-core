export interface IFunction {
    function_name: string;   // Name of the function
    runtime: string;         // Runtime environment (e.g., Python 3.8, Node.js)
    code: string;            // Source code of the function
    status: string;          // Status of the function (e.g., deployed, running, error)
}

export const functionRegistry: Record<string, IFunction> = {};
