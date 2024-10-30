// Unit tests for automated grading of the User Management API
const request = require('supertest');
const app = require('../dist/index');

describe('Functions API test', () => {
    it('Dummy test', () => {
        expect(true).toBe(true); // Dummy test that always passes
    });

    // deployfunction test
    it('deployFunction /deploy 1', async () => {
        const response = await request(app)
            .post('/api/functions/deploy')
            .send({
                "function_name": "addNumbers",
                "runtime": "Python 3.8",
                "code": "def add_numbers(a, b): return a + b"
              })
            .expect(200);

        expect(response.body.result).toBe(true);
    });

    it('deployFunction /deploy 2', async () => {
        const response = await request(app)
            .post('/api/functions/deploy')
            .send({
                "function_name": "subNumbers",
                "runtime": "Python 3.8",
                "code": "def sub_numbers(a, b): return a - b"
              })
            .expect(200);

        expect(response.body.result).toBe(true);
    });

    it('deployFunction /deploy 3', async () => {
        const response = await request(app)
            .post('/api/functions/deploy')
            .send({
                "function_name": "multNumbers",
                "runtime": "Python 3.8",
                "code": "def mult_numbers(a, b): return a * b"
              })
            .expect(200);

        expect(response.body.result).toBe(true);
    });

    it('deployFunction /deploy 4', async () => {
        const response = await request(app)
            .post('/api/functions/deploy')
            .send({
                "function_name": "concatStrings",
                "runtime": "Python 3.8",
                "code": "def concat(a, b): return a + b"
              })
            .expect(200);

        expect(response.body.result).toBe(true);
    });

    it('deployFunction /deploy 5', async () => {
        const response = await request(app)
            .post('/api/functions/deploy')
            .send({
                "function_name": "sortString",
                "runtime": "Python 3.8",
                "code": "def sort(a): return ''.join(sorted(a))"
              })
            .expect(200);

        expect(response.body.result).toBe(true);
    });



    
    //getFunctionStatus test
    it ('getFunctionStatus /status 1', async () =>{
        const function_name = "addNumbers"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    });

    it ('getFunctionStatus /status 2', async () =>{
        const function_name = "subNumbers"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    });

    it ('getFunctionStatus /status 3', async () =>{
        const function_name = "multNumbers"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    });

    it ('getFunctionStatus /status 4', async () =>{
        const function_name = "concatStrings"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    });

    it ('getFunctionStatus /status 5', async () =>{
        const function_name = "sortString"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    });


    //invokeFunction test

    it('invokeFunction /invoke 1', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "addNumbers",
                "args": [3, 5]
            })
            .expect(200);
        expect(response.body.result).toBe(8)
    })

    it('invokeFunction /invoke 2', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "subNumbers",
                "args": [5, 3]
            })
            .expect(200);
        expect(response.body.result).toBe(2)
    })

    it('invokeFunction /invoke 3', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "multNumbers",
                "args": [3, 5]
            })
            .expect(200);
        expect(response.body.result).toBe(15)
    })

    it('invokeFunction /invoke 4', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "concatStrings",
                "args": ["s", "t"]
            })
            .expect(200);
        expect(response.body.result).toBe("st")
    })

    it('invokeFunction /invoke 5', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "sortString",
                "args": ["ba"]
            })
            .expect(200);
        expect(response.body.result).toBe("ab")
    })

    //removeFunction test

    it('removeFunction /remove 1', async () =>{
        const function_name = "addNumbers"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);

        await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(400);
    })

    it('removeFunction /remove 2', async () =>{
        const function_name = "subNumbers"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);

        await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(400);
    })

    it('removeFunction /remove 3', async () =>{
        const function_name = "multNumbers"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);

        await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(400);
    })

    it('removeFunction /remove 4', async () =>{
        const function_name = "concatStrings"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);

        await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(400);
    })

    it('removeFunction /remove 5', async () =>{
        const function_name = "sortString"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);

        await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(400);
    })

});