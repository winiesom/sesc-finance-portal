const invoiceService = require('../services/invoice.service');
const invoiceController = require('../controllers/invoice.controller');
const httpMocks = require('node-mocks-http');

describe('Invoice Integration Test', () => {
  it('should simulate user browsing invoice history and creating a new invoice', async () => {
    const account_id = 'c736472345';
    const createReq = {
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

    // Mock getAllInvoices response
    const invoices = [
      {
        id: 1,
        account_id: 'c736472345',
        amount: 30,
        type: 1,
        reference: 'YREXN14',
        paid: false,
        book_id: null,
        course_id: 3,
        createdAt: '2023-05-01T09:50:38.119Z',
        updatedAt: '2023-05-01T09:50:38.119Z'
      },
      {
        id: 2,
        account_id: 'c736472345',
        amount: 30,
        type: 1,
        reference: 'YREXN15',
        paid: false,
        book_id: 2,
        course_id: null,
        createdAt: '2023-05-02T09:50:38.119Z',
        updatedAt: '2023-05-02T09:50:38.119Z'
      }
    ];

    jest.spyOn(invoiceService, 'getAllInvoices').mockResolvedValue(invoices);
    
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
        createdAt: '2023-05-07T10:00:00.000Z',
        updatedAt: '2023-05-07T10:00:00.000Z'
      };
      jest.spyOn(invoiceService, 'createInvoice').mockResolvedValue(newInvoice);
  

    // Mock getInvoice response
    const invoice = {
        id: 1,
        account_id: 'c736472345',
        amount: 30,
        type: 1,
        reference: 'YREXN14',
        paid: false,
        book_id: null,
        course_id: 3,
        createdAt: '2023-05-01T09:50:38.119Z',
        updatedAt: '2023-05-01T09:50:38.119Z'
      };
      jest.spyOn(invoiceService, 'getInvoice').mockResolvedValue(invoice);
  

    // Simulate user browsing invoice history
    const req = httpMocks.createRequest({ account_id });
    const res = httpMocks.createResponse();

    res.status = jest.fn().mockReturnValue(res);

    await invoiceController.getAllInvoices(req, res);
    
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({
        success: true,
        count: invoices.length,
        data: invoices
        });


    // Simulate user getting the newly created invoice
    const createRes = { status: jest.fn(), json: jest.fn() };
    
    createRes.status.mockReturnValue(createRes);
 
    await invoiceController.createInvoice(createReq, createRes);
    
    expect(createRes.status).toHaveBeenCalledWith(201);
    expect(createRes.json).toHaveBeenCalledWith({
        success: true,
        data: newInvoice
    });
    
    
    // Simulate user getting the newly created invoice
    const getReq = httpMocks.createRequest({ params: { id: newInvoice.reference } });
    const getRes = httpMocks.createResponse();
    
    getRes.status = jest.fn().mockReturnValue(getRes);
    
    await invoiceController.getInvoice(getReq, getRes);
    
    expect(getRes.statusCode).toBe(200);
    expect(getRes._isEndCalled()).toBeTruthy();
    expect(getRes._getJSONData()).toEqual({
        success: true,
        data: invoice
        });
  });
});
