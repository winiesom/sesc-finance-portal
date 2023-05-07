const invoiceService = require('../services/invoice.service');
const invoiceController = require('../controllers/invoice.controller');
const httpMocks = require('node-mocks-http');

describe('getAllInvoices', () => {
  it('should get all invoices for an account', async () => {
    const account_id = 'c736472345';
    
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
    const req = httpMocks.createRequest({ account_id });
    const res = httpMocks.createResponse();

    // Mock the status function
    res.status = jest.fn().mockReturnValue(res);
    
    await invoiceController.getAllInvoices(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({
      success: true,
      count: invoices.length,
      data: invoices
    });
  });

  it('should return an error if there is an issue', async () => {
    const account_id = 'c736472345';
    const error = 'Internal Server Error';
    
    jest.spyOn(invoiceService, 'getAllInvoices').mockRejectedValue(error);
    
    const req = httpMocks.createRequest({ account_id });
    const res = httpMocks.createResponse();  
  
    await invoiceController.getAllInvoices(req, res);
  
    expect(res.statusCode).toBe(500);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({ success: false, error });
  });
  
});
