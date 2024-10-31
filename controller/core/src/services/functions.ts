import { IFunction, functionRegistry } from '../models/functions';
import { exec } from 'child_process';

class FunctionService {
    static async deployFunction(function_name: string, runtime: string, code: string) {
        try {
            if(functionRegistry.hasOwnProperty(function_name)){
                console.error("Function already exists in functionRegistry");
                return false;
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
            console.error("Error deploying function:", (error as Error).message);
            return false;
        }
    }

    static async getFunctionStatus(function_name: string) {
        try {
            return functionRegistry[function_name].status;
        } catch (error) {
            console.error("Error fetching function status:", (error as Error).message);
            return "error";
        }
    }

    static async removeFunction(function_name: string) {
        try {
            if(!functionRegistry.hasOwnProperty(function_name)){
                console.error("Function doesn't exist in functionRegistry");
                return false;
            }
            delete functionRegistry[function_name];
            return true;
        } catch (error) {
            console.error("Error removing function:", (error as Error).message);
            return false;
        }
    }

    static async invokeFunction(function_name: string, args: any[]): Promise<any> {
        try {
            if(!functionRegistry.hasOwnProperty(function_name)){
                console.error("Function doesn't exist in functionRegistry");
                return null;
            }
            const myFunction = functionRegistry[function_name];
            //Code for invoking function goes here
            switch(myFunction.runtime){
                case "Python 3.8":
                    //do stuff
                    break;
                case "Javascript":
                    //do stuff
                    const argsString = args.map(arg => JSON.stringify(arg)).join(', ');
                    const myCode = `${myFunction.code} ${myFunction.function_name}(${argsString});`
                    const myResult = eval(myCode);
                    return myResult;
                default:
                    //do stuff
                    break;
            }
        } catch (error) {
            console.error("Error invoking function:", (error as Error).message);
            return null;
        }
    }
}

export default FunctionService;
