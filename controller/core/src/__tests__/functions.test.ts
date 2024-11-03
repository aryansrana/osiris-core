import request from "supertest";
import { type Express } from "express";
import { createApp } from "../createApp";

describe("/api/functions", () => {
    let app : Express;
    beforeAll(() => {
        app = createApp();

    });
    describe("/deploy", () => {
        it('deploy addNumbers', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "addNumbers",
                    "runtime": "Python 3.8",
                    "code": "def addNumbers(a, b): return a + b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        });
    
        it('deploy subNumbers', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "subNumbers",
                    "runtime": "Python 3.8",
                    "code": "def subNumbers(a, b): return a - b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        });
    
        it('deploy multNumbers', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "multNumbers",
                    "runtime": "Python 3.8",
                    "code": "def multNumbers(a, b): return a * b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        });
    
        it('deploy concatStrings', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "concatStrings",
                    "runtime": "Python 3.8",
                    "code": "def concatStrings(a, b): return a + b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        });
    
        it('deploy sortString', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "sortString",
                    "runtime": "Python 3.8",
                    "code": "def sortString(a): return ''.join(sorted(a))"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        });
        it('deploy missingRequirements, should not deploy', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "functionname": "hi",
                    "runtime": "Python 3.8",
                    "code": "def hi(a): return ''.join(sorted(a))"
                  })
                .expect(400);
    
            expect(response.body.result).toBe(false);
        });
    });

    describe("/status", () => {
        it ('getFunctionStatus for addNumbers', async () =>{
            const function_name = "addNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
        it ('getFunctionStatus for subNumbers', async () =>{
            const function_name = "subNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
    
        it ('getFunctionStatus for multNumbers', async () =>{
            const function_name = "multNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
    
        it ('getFunctionStatus for concatStrings', async () =>{
            const function_name = "concatStrings"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
    
        it ('getFunctionStatus for sortString', async () =>{
            const function_name = "sortString"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
        it ('getFunctionStatus for missingRequirements, status should be error', async () =>{
            const function_name = "missingRequirements"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(404);
            expect(response.body.status).toBe("error")
        });
    });
    describe("/invoke", () => {
        it('invoke addNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "addNumbers",
                    "args": [3, 5]
                })
                .expect(200);
            expect(response.body.result).toBe(8)
        })
    
        it('invokeFunction subNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "subNumbers",
                    "args": [5, 3]
                })
                .expect(200);
            expect(response.body.result).toBe(2)
        })
    
        it('invokeFunction multNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "multNumbers",
                    "args": [3, 5]
                })
                .expect(200);
            expect(response.body.result).toBe(15)
        })
    
        it('invokeFunction concatStrings', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "concatStrings",
                    "args": ["s", "t"]
                })
                .expect(200);
            expect(response.body.result).toBe("st")
        })
    
        it('invokeFunction sortString', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "sortString",
                    "args": ["ba"]
                })
                .expect(200);
            expect(response.body.result).toBe("ab")
        })
        it('invokeFunction missingRequirements, should result in null', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "missingRequirements",
                    "args": ["ba"]
                })
                .expect(400);
            expect(response.body.result).toBe(null)
        })

    });
    describe("/remove", () => {
        it('remove addNumbers', async () =>{
            const function_name = "addNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
    
        it('remove subNumbers', async () =>{
            const function_name = "subNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
    
        it('remove multNumbers', async () =>{
            const function_name = "multNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
    
        it('remove concatStrings', async () =>{
            const function_name = "concatStrings"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
    
        it('remove sortString', async () =>{
            const function_name = "sortString"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
        it('remove missingRequirements, should result in false', async () =>{
            const function_name = "sortString"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(400);
            expect(response.body.result).toBe(false);
        })
    });
});