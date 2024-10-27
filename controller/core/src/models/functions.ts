import mongoose, { Schema, Document } from 'mongoose';

interface IFunction extends Document {
    function_name: string;   // Name of the function
    runtime: string;         // Runtime environment (e.g., Python 3.8, Node.js)
    code: string;            // Source code of the function
    status: string;          // Status of the function (e.g., deployed, running, error)
}

// Create the schema for the function
const functionSchema: Schema<IFunction> = new Schema({
    function_name: {
        type: String,
        required: true,
        unique: true,
    },
    runtime: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['deployed', 'running', 'error'], // Status options
        default: 'deployed', // Default status when function is deployed
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model
const FunctionModel = mongoose.model<IFunction>('Function', functionSchema);

export default FunctionModel;
