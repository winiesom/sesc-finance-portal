const testInvoices = [
    { id: 1, account_id: 'c736472345', amount: 30, type: 1, reference: 'YREXN14', paid: false, book_id: null, course_id: 3, createdAt: '2023-05-01T09:50:38.119Z', updatedAt:'2023-05-01T09:50:38.119Z' },
    { id: 2, account_id: 'c736472346', amount: 30, type: 1, reference: 'YREXN15', paid: false, book_id: null, course_id: 3, createdAt: '2023-05-01T09:50:38.119Z', updatedAt:'2023-05-01T09:50:38.119Z' },
    { id: 3, account_id: 'c736472345', amount: 30, type: 1, reference: 'YREXN16', paid: false, book_id: null, course_id: 3, createdAt: '2023-05-01T09:50:38.119Z', updatedAt:'2023-05-01T09:50:38.119Z' },
  ];

const accountId = 'c736472345';
const id = 'YREXN14';
  
  const getAllInvoices = async () => {
    return testInvoices.filter((invoice) => invoice.account_id === accountId);
  };
  const getInvoice = async () => {
    return testInvoices.filter((invoice) => invoice.reference === id);
  };
  const createInvoice = async (newInvoiceData) => {
    const newInvoice = {
      id: testInvoices.length + 1,
      account_id: newInvoiceData.account_id,
      amount: newInvoiceData.amount,
      type: newInvoiceData.type,
      reference: newInvoiceData.reference,
      paid: newInvoiceData.paid,
      book_id: newInvoiceData.book_id,
      course_id: newInvoiceData.course_id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  
    testInvoices.push(newInvoice);
  
    return newInvoice;
  };

  const payInvoice = async (id, updatedInvoiceData) => {
    const invoiceIndex = testInvoices.findIndex((invoice) => invoice.reference === id);
  
    if (invoiceIndex === -1) {
      throw new Error(`Invoice with reference: ${id} not found`);
    }
  
    testInvoices[invoiceIndex] = {
      ...testInvoices[invoiceIndex],
      ...updatedInvoiceData,
      updatedAt: new Date().toISOString(),
    };
  
    return testInvoices[invoiceIndex];
  };

    
module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  payInvoice
};
  