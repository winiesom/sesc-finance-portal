const invoiceService = require('../services/invoice.service');
const invoiceController = require('../controllers/invoice.controller');
const httpMocks = require('node-mocks-http');

describe('getInvoice', () => {
  it('should return specific invoice for specific account', async () => {
    const id = "YREXN14";

    const invoice = [
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
          }
    ];
    jest.spyOn(invoiceService, 'getInvoice').mockResolvedValue(invoice);
    const req = httpMocks.createRequest({ params: { id } });
    const res = httpMocks.createResponse();

    // Mock the status function
    res.status = jest.fn().mockReturnValue(res);
    
    await invoiceController.getInvoice(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({
      success: true,
      data: invoice
    });
  });

    it('should handle a non-existing invoice and return a 404 status', async () => {
      const req = { params: { id: 'YREXN17' } };
      const res = { status: jest.fn(), json: jest.fn() };
      res.status.mockReturnValue(res);

      jest.spyOn(invoiceService, 'getInvoice').mockResolvedValue(null);

      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invoice with reference: YREXN17 does not exist'
      });
    });

    it('should handle errors and return a 400 status', async () => {
      const req = { params: { id: 'YREXN14' } };
      const res = { status: jest.fn(), json: jest.fn() };
      res.status.mockReturnValue(res);

      jest.spyOn(invoiceService, 'getInvoice').mockRejectedValue(new Error('Test Error'));

      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: new Error('Test Error') });
    });
  
});
