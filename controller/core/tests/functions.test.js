// Unit tests for automated grading of the User Management API
const request = require('supertest');
const app = require('../dist/index');

describe('Functions API test', () => {
    it('Dummy test', () => {
        expect(true).toBe(true); // Dummy test that always passes
    });

    // deployfunction test
    it('deployFunction /deploy', async () => {
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
    
    //getFunctionStatus test
    it ('getFunctionStatus /status', async () =>{
        const function_name = "addNumbers"
        const response = await request(app)
            .get(`/api/functions/status/${function_name}`)
            .expect(200);
        expect(response.body.status).toBe("deployed")
    })

    //removeFunction test

    it('removeFunction /remove', async () =>{
        const function_name = "addNumbers"
        const response = await request(app)
            .delete(`/api/functions/remove/${function_name}`)
            .expect(200);
        expect(response.body.result).toBe(true);
    })

    //invokeFunction test

    it('invokeFunction /invoke', async () =>{
        const response = await request(app)
            .post('/api/functions/invoke')
            .send({
                "function_name": "addNumbers",
                "args": [3, 5]
            })
            .expect(200);
        
    })

});