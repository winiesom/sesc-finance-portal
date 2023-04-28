const request = require('supertest')

const server = require('../index')
const mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMTcsImZpcnN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMiLCJsYXN0bmFtZSI6Ik5ldmVyIGV4cGlyZXMgbGFzdG5hbWUiLCJwYXNzd29yZCI6IiQyYiQxMCRaZFhrMzVNRDhFSVNXTU5QTml4T3EuNjIyb1ZYOXpsdWl5RHdKQUQ2Zmc3YjJUcW83NHdjTyJ9LCJpYXQiOjE2NzUxNzc0MTYsImV4cCI6MzE3MjE5NjE5ODE2fQ.PLkLL4KQnC3boA-3SUDGtVqNZimayZKSMFyIPEFAoXM'


describe('GET invoice api', () => {
    it('should return all invoices if authorized', async() => {
        const response = await request(server).get('/invoices')
        expect(response.status).toBe(200)
          expect(response.body).toHaveProperty('data')
    })
})

describe('Post invoive route', () => {
    it('should add new invoice to invoice table', async() => {
        const response = await request(server).post("/invoices")
        // .set('Authorization', `Bearer ${mockedToken}`)
        .send({account_id:1223, type:2, amount:1000, paid:false,createdAt:new Date(), updatedAt: new Date() })
        expect(response.status).toBe(201)
    })
})