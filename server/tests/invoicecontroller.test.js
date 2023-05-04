const { getAllInvoices, getInvoice, createInvoice } = require('../controllers/invoice.controller');
const { invoice } = require('../models');
const httpMocks = require('node-mocks-http');

describe('getAllInvoices', () => {
  it('should return all invoices', async () => {
    const account_id = 'c736472345';
    const invoices = [
        { id: 1, account_id: 'c736472345', amount: 30, reference: 'AEDF234', paid: true, type: 2, book_id: 3, course_id: null, createdAt: "2023-05-01T09:50:38.119Z", updatedAt: "2023-05-01T09:50:38.119Z" },
        { id: 2, account_id: 'c736472345', amount: 300, reference: 'YKDF23H', paid: false, type: 1, book_id: null, course_id: 3, createdAt: "2023-05-02T09:50:38.119Z", updatedAt: "2023-05-02T09:50:38.119Z" }
    ];
    jest.spyOn(invoice, 'findAll').mockResolvedValue(invoices);

    const req = httpMocks.createRequest({ account_id });
    const res = httpMocks.createResponse();

    await getAllInvoices(req, res);

    expect(invoice.findAll).toHaveBeenCalledWith({ where: { account_id } });
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({
      success: true,
      count: invoices.length,
      data: invoices
    });
  });

  afterAll(async () => {
    await invoice.sequelize.close();
  });

  it('should return an error if there is an issue with the database', async () => {
    const account_id = 'c736472345';
    const error = 'Database error';
    jest.spyOn(invoice, 'findAll').mockRejectedValue(error);

    const req = httpMocks.createRequest({ account_id });
    const res = httpMocks.createResponse();

    await getAllInvoices(req, res);

    expect(invoice.findAll).toHaveBeenCalledWith({ where: { account_id } });
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toEqual({
      success: false,
      error
    });
  });
});


describe('getInvoice', () => {
    it('should return specific invoice for specific account', async () => {
      const id = "YREXN14";
      const inv = { 
        id: 1, 
        account_id: 'c736472345', 
        amount: 30, 
        reference: 'YREXN14', 
        paid: true, 
        type: 2, 
        book_id: 3, 
        course_id: null, 
        createdAt: "2023-05-01T09:50:38.119Z", 
        updatedAt: "2023-05-01T09:50:38.119Z" 
      };
      jest.spyOn(invoice, 'findOne').mockResolvedValue(inv);
  
      const req = httpMocks.createRequest({ params: { id } });
      const res = httpMocks.createResponse();
  
      await getInvoice(req, res);
  
      expect(invoice.findOne).toHaveBeenCalledWith({ where: { reference: id } });
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toEqual({
        success: true,
        data: inv
      });
    });

    afterAll(async () => {
        await invoice.sequelize.close();
      });
  
    it('should return an error if there is no invoice with the given id', async () => {
      const id = "wrong_id";
      const error = `Invoice with reference: ${id} does not exist`;
      jest.spyOn(invoice, 'findOne').mockResolvedValue(null);
  
      const req = httpMocks.createRequest({ params: { id } });
      const res = httpMocks.createResponse();
  
      await getInvoice(req, res);
  
      expect(invoice.findOne).toHaveBeenCalledWith({ where: { reference: id } });
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toEqual({
        success: false,
        message: error
      });
    });
  
    it('should return an error if there is an issue with the database', async () => {
      const id = "YREXN14";
      const error = 'Database error';
      jest.spyOn(invoice, 'findOne').mockRejectedValue(error);
  
      const req = httpMocks.createRequest({ params: { id } });
      const res = httpMocks.createResponse();
  
      await getInvoice(req, res);
  
      expect(invoice.findOne).toHaveBeenCalledWith({ where: { reference: id } });
      expect(res.statusCode).toBe(400);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toEqual({
        success: false,
        error
      });
    });
  
    afterAll(async () => {
      await invoice.sequelize.close();
    });
  });
  

describe('createInvoice', () => {
    it('should create a new invoice', async () => {
        const body = {
            account_id: 'c736472345',
            amount: 30,
            reference: 'YREXN14',
            paid: true,
            type: 2,
            book_id: 3,
            course_id: null,
        }

        const data = {
            id: 1,
            account_id: 'c736472345',
            amount: 30,
            reference: 'YREXN14',
            paid: true,
            type: 2,
            book_id: 3,
            course_id: null,
            createdAt: "2023-05-04T10:00:00.000Z",
            updatedAt: "2023-05-04T10:00:00.000Z"
          };

        jest.spyOn(invoice, 'findOne').mockResolvedValue(null).mockResolvedValue(null)
        jest.spyOn(invoice, 'create').mockResolvedValue(data);

        const req = httpMocks.createRequest({ body });
        const res = httpMocks.createResponse();

        await createInvoice(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toEqual({
            success: true,
            data
        });
    });

    it('should return 400: bad request if there are empty fields', async () => {
        const body = {
            account_id: '',
            amount: '',
            reference: '',
            paid: '',
            type: ''
        };

        const req = httpMocks.createRequest({ body });
        const res = httpMocks.createResponse();

        await createInvoice(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getData()).toEqual({
         success: false,
         message: 'Fields cannot be empty',
        });
    });

    it('should return status 406: not acceptable if reference already exists', async () => {
          const body = {
            account_id: 'c736472345',
            type: 2,
            amount: 30,
            reference: 'YREXN14',
            paid: true,
            book_id: 3,
            course_id: null
          }

        const req = httpMocks.createRequest({ body });
        const res = httpMocks.createResponse();
        jest.spyOn(invoice, 'findOne').mockResolvedValue({ id: 1 });
    
        await createInvoice(req, res);
    
        expect(res.statusCode).toBe(406);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getData()).toEqual({
          success: false,
          message: 'Invoice with this reference: YREXN14 already exists'
        });
      });

      it('should return an error if there is an issue with the database', async () => {
        const body = {
            account_id: 'c736472345',
            type: 2,
            amount: 30,
            reference: 'YREXN14',
            paid: true,
            book_id: 3,
            course_id: null
        };
        const error = 'Database error';
        
        const req = httpMocks.createRequest({ body });
        const res = httpMocks.createResponse();
        jest.spyOn(invoice, 'findOne').mockRejectedValue(error);
    
        await createInvoice(req, res);
    
        expect(res.statusCode).toBe(500);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toEqual({
          success: false,
          error
        });
      });
});
