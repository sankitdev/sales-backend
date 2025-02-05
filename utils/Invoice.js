import easyinvoice from "easyinvoice";
import fs from "fs";
let data = {
  apiKey: "", // Please register to receive a production apiKey: https://app.budgetinvoice.com/register
  mode: "production", // Production or development, defaults to production
  images: {
    // The logo on top of your invoice
    // logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
    // The invoice background
    // background: "https://public.budgetinvoice.com/img/watermark-draft.jpg",
  },
  // Your own data
  sender: {
    company: "Sample Corp",
    address: "Sample Street 123",
    zip: "1234 AB",
    city: "Sampletown",
    country: "Samplecountry",
    // custom1: "custom value 1",
    // custom2: "custom value 2",
    // custom3: "custom value 3"
  },
  // Your recipient
  client: {
    company: "Client Corp",
    address: "Clientstreet 456",
    zip: "4567 CD",
    city: "Clientcity",
    country: "Clientcountry",
    // custom1: "custom value 1",
    // custom2: "custom value 2",
    // custom3: "custom value 3"
  },
  information: {
    // Invoice number
    number: "2021.0001",
    // Invoice data
    date: "12-12-2021",
    // Invoice due date
    dueDate: "31-12-2021",
  },
  // The products you would like to see on your invoice
  // Total values are being calculated automatically
  products: [
    {
      quantity: 2,
      description: "Product 1",
      taxRate: 6,
      price: 33.87,
    },
    {
      quantity: 4.1,
      description: "Product 2",
      taxRate: 6,
      price: 12.34,
    },
    {
      quantity: 4.5678,
      description: "Product 3",
      taxRate: 21,
      price: 6324.453456,
    },
  ],
  // The message you would like to display on the bottom of your invoice
  bottomNotice: "Kindly pay your invoice within 15 days.",
  // Settings to customize your invoice
  settings: {
    currency: "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
    // locale: "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
    // marginTop: 25, // Defaults to '25'
    // marginRight: 25, // Defaults to '25'
    // marginLeft: 25, // Defaults to '25'
    // marginBottom: 25, // Defaults to '25'
    // format: "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
    // height: "1000px", // allowed units: mm, cm, in, px
    // width: "500px", // allowed units: mm, cm, in, px
    // orientation: "landscape" // portrait or landscape, defaults to portrait
  },
  // Translate your invoice to your preferred language
  translate: {
    // invoice: "FACTUUR",  // Default to 'INVOICE'
    // number: "Nummer", // Defaults to 'Number'
    // date: "Datum", // Default to 'Date'
    // dueDate: "Verloopdatum", // Defaults to 'Due Date'
    // subtotal: "Subtotaal", // Defaults to 'Subtotal'
    // products: "Producten", // Defaults to 'Products'
    // quantity: "Aantal", // Default to 'Quantity'
    // price: "Prijs", // Defaults to 'Price'
    // productTotal: "Totaal", // Defaults to 'Total'
    // total: "Totaal", // Defaults to 'Total'
    // taxNotation: "btw" // Defaults to 'vat'
  },

  // Customize enables you to provide your own templates
  // Please review the documentation for instructions and examples
  // "customize": {
  //      "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
  // }
};

const result = await easyinvoice.createInvoice(data);
fs.writeFileSync("invoice.pdf", result.pdf, "base64");
