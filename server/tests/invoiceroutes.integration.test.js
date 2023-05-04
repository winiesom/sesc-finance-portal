const { invoice, account, sequelize } = require('../models');
const { getAllInvoices, getInvoice, createInvoice } = require('../controllers/invoice.controller');


describe('getAllInvoices', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // resets database tables
  });

  afterEach(async () => {
    await invoice.destroy({ where: {} });
  });

  afterAll(async () => {
    await invoice.sequelize.close();
    await account.sequelize.close();
    await sequelize.close();
  });

  it('should return all invoices for a given account ID', async () => {
    const accountData = await account.create({
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      account_id: 'c736472346',
      password: 'password',
      outstanding: false
    });

    const invoices = await invoice.bulkCreate([
      {
        account_id: accountData.account_id,
        amount: 10.00,
        type: 1,
        reference: 'YREXN15',
        paid: false,
        book_id: 1,
        course_id: 1
      },
      {
        account_id: accountData.account_id,
        amount: 20.00,
        type: 2,
        reference: 'YREXN16',
        paid: true,
        book_id: 2,
        course_id: 2
      },
      {
        account_id: 'c736472347',
        amount: 30.00,
        type: 1,
        reference: 'YREXN17',
        paid: false,
        book_id: 3,
        course_id: 3
      }
    ]);

    const req = { account_id: accountData.account_id };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    await getAllInvoices(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: true,
    //   count: invoices.filter(i => i.account_id === accountData.account_id).length,
    //   data: invoices.filter(i => i.account_id === accountData.account_id)
    // });
  });

});
