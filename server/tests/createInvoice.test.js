const invoiceService = require('../services/invoice.service');
const invoiceController = require('../controllers/invoice.controller');
const httpMocks = require('node-mocks-http');

describe('createInvoice', () => {
     it('should create a new invoice', async () => {
         const req = {
            body: {
            account_id: 'c736472345',
            amount: 50,
            type: 1,
            reference: 'YREXN18',
            paid: false,
            book_id: null,
            course_id: 3
            }
        };

        const res = { status: jest.fn(), json: jest.fn() };
     
        res.status.mockReturnValue(res);
        
        // Mock createInvoice response
        const newInvoice = {
            id: 4,
            account_id: 'c736472345',
            amount: 50,
            type: 1,
            reference: 'YREXN18',
            paid: false,
            book_id: null,
            course_id: 3,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        };      
       jest.spyOn(invoiceService, 'createInvoice').mockResolvedValue(newInvoice);      
       
       await invoiceController.createInvoice(req, res);      
       
       expect(res.status).toHaveBeenCalledWith(201);
       expect(res.json).toHaveBeenCalledWith({ success: true, data: newInvoice });
     }); 

     it('should handle empty fields and return a 400 status', async () => {
       const req = {
         body: {
           account_id: '',
           amount: '',
           type: '',
           reference: '',
           paid: ''
         }
       };
       const res = { status: jest.fn(), send: jest.fn() };
       res.status.mockReturnValue(res);      
       await invoiceController.createInvoice(req, res);      
       expect(res.status).toHaveBeenCalledWith(400);
       expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Fields cannot be empty' });
     });   

     it('should handle errors and return a 500 status', async () => {
       const req = {
         body: {
           account_id: 'c736472345',
           amount: 50,
           type: 1,
           reference: 'YREXN18',
           paid: false,
           book_id: null,
           course_id: 3
         }
       };

       const res = { status: jest.fn(), json: jest.fn() };
       res.status.mockReturnValue(res); 
            
       jest.spyOn(invoiceService, 'createInvoice').mockRejectedValue(new Error('Test Error'));      
       await invoiceController.createInvoice(req, res);      
       expect(res.status).toHaveBeenCalledWith(500);
       expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Test Error' });
     });
});