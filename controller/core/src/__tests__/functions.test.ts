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
    
        it('deploy subNumbers, testing invalid syntax', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "subNumbers",
                    "runtime": "Python 3.8",
                    "code": "def subNumbers(a, b) return a - b"
                  })
                .expect(201);
        });
    
        it('deploy multNumbers, testing Javascript code', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "multNumbers",
                    "runtime": "Javascript",
                    "code": "function multNumbers(a, b){ return a * b; }"
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
                    "functionname": "sort",
                    "runtime": "Python 3.8",
                    "code": "def sort(a): return ''.join(sorted(a))"
                  })
                .expect(400);
        });
        it ('deploy averageOfNumbers, multiline Javascript program', async () => {
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "averageOfNumbers",
                    "runtime": "Javascript",
                    "code": `function averageOfNumbers(a, b){
                                let x = a;
                                let y = b;
                                let res = x + y;
                                let ans = res / 2;
                                return ans;}
                            `
                })
                .expect(201)
            expect(response.body.result).toBe(true);
        })

        it('deploy divNumbers, test floats', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "divNumbers",
                    "runtime": "Python 3.8",
                    "code": "def divNumbers(a, b): return a / b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })

        it('deploy boolNumbers, test bool', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "boolNumbers",
                    "runtime": "Python 3.8",
                    "code": "def boolNumbers(a, b): return a == b"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })

        it('deploy noneFunction, test None return type', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "noneFunction",
                    "runtime": "Python 3.8",
                    "code": "def noneFunction(): return"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })

        it('deploy lstFunction, test lists', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "lstFunction",
                    "runtime": "Python 3.8",
                    "code": "def lstFunction(a): return a"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })

        it('deploy dictFunction, test dictionaries', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "dictFunction",
                    "runtime": "Python 3.8",
                    "code": "def dictFunction(a): return a"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })
        /*
        it('deploy setFunction, test sets', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "setFunction",
                    "runtime": "Python 3.8",
                    "code": "def setFunction(a): return a"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })
        */

        /*
        it('deploy bufferFunction, test buffers', async () =>{
            const response = await request(app)
                .post('/api/functions/deploy')
                .send({
                    "function_name": "bufferFunction",
                    "runtime": "Python 3.8",
                    "code": "def bufferFunction(a): return a"
                  })
                .expect(201);
    
            expect(response.body.result).toBe(true);
        })
        */
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
        
        it ('getFunctionStatus for non-deployed function', async () =>{
            const function_name = "someFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(404);
            expect(response.body.status).toBe("error")
        })

        it ('getFunctionStatus for averageOfNubmers', async () =>{
            const function_name = "averageOfNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });

        it ('getFunctionStatus for divNumbers', async () =>{
            const function_name = "divNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });

        it ('getFunctionStatus for boolNumbers', async () =>{
            const function_name = "boolNumbers"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });

        it ('getFunctionStatus for noneFunction', async () =>{
            const function_name = "noneFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });

        it ('getFunctionStatus for lstFunction', async () =>{
            const function_name = "lstFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });

        it ('getFunctionStatus for dictFunction', async () =>{
            const function_name = "dictFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
        /*
        it ('getFunctionStatus for setFunction', async () =>{
            const function_name = "setFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
        */

        /*
        it ('getFunctionStatus for bufferFunction', async () =>{
            const function_name = "bufferFunction"
            const response = await request(app)
                .get(`/api/functions/status/${function_name}`)
                .expect(200);
            expect(response.body.status).toBe("deployed")
        });
        */
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
                .expect(400);
        })
    
        it('invokeFunction multNumbers, Javascript code', async () =>{
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
        })

        it('invoke averageOfNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "averageOfNumbers",
                    "args": [3, 5]
                })
                .expect(200);
            expect(response.body.result).toBe(4)
        })

        it('invoke divNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "divNumbers",
                    "args": [6, 4]
                })
                .expect(200);
            expect(response.body.result).toBe(1.5)
        })

        it('invoke boolNumbers', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "boolNumbers",
                    "args": [4, 4]
                })
                .expect(200);
            expect(response.body.result).toBe(true)
        })

        it('invoke noneFunction', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "noneFunction",
                    "args": []
                })
                .expect(200);
            expect(response.body.result).toBe(null)
        })

        it('invoke lstFunction', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "lstFunction",
                    "args": [[1, 2, 3]]
                })
                .expect(200);
            expect(response.body.result).toStrictEqual([1, 2, 3])
        })

        it('invoke dictFunction', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "dictFunction",
                    "args": [{1: "h", 2: "e", 3: "q"}]
                })
                .expect(200);
            expect(response.body.result).toStrictEqual({1: "h", 2: "e", 3: "q"})
        })
        
        /*
        it('invoke setFunction', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "setFunction",
                    "args": [{1, 2, 3}]
                })
                .expect(200);
            expect(response.body.result).toStrictEqual({1, 2, 3})
        })
        */

        /*
        it('invoke bufferFunction', async () =>{
            const response = await request(app)
                .get('/api/functions/invoke/')
                .send({
                    "function_name": "bufferFunction",
                    "args": [b"hello"]
                })
                .expect(200);
            expect(response.body.result).toStrictEqual(b"hello")
        })
        */
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

        it('remove averageOfNumbers', async () =>{
            const function_name = "averageOfNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })

        it('remove divNumbers', async () =>{
            const function_name = "divNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })

        it('remove boolNumbers', async () =>{
            const function_name = "boolNumbers"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })

        it('remove noneFunction', async () =>{
            const function_name = "noneFunction"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })

        it('remove lstFunction', async () =>{
            const function_name = "lstFunction"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })

        it('remove dictFunction', async () =>{
            const function_name = "dictFunction"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
        /*
        it('remove setFunction', async () =>{
            const function_name = "setFunction"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
        */

        /*
        it('remove bufferFunction', async () =>{
            const function_name = "bufferFunction"
            const response = await request(app)
                .delete(`/api/functions/remove/${function_name}`)
                .expect(200);
            expect(response.body.result).toBe(true);
        })
        */

    });
});