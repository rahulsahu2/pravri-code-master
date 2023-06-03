import pdf from 'pdf-creator-node';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname,'invoice.html');

export const generateInvoice = async (invoiceNumber,releaseTime) => {
  try {

    const html = await fs.readFile(filePath, 'utf-8');

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      header: {
        height: '0mm',
        contents: '',
      },
      footer: {
        height: '10mm',
        contents: '<div style="text-align: center;">Page {{page}} of {{pages}}</div>',
      },
    };

    const data = {
      title: 'My PDF Document',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];

    const document = {
      html,
      data: { users,invoiceNumber,releaseTime },
      path: "./Controller/orders/invoice.pdf",
      type: "",
    };

    const result = await pdf.create(document, options);

    await fs.writeFile('invoice.pdf', result);
  } catch (error) {
    console.error(error);
  }
};

