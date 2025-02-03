import Product from "../models/product.js";
import Sales from "../models/sales.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({}).populate("productName", "name");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Sales.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addSale = async (req, res) => {
  try {
    const {
      name,
      email,
      image,
      phone,
      productName,
      quantity: saleQuantity,
    } = req.body;
    const product = await Product.findById(productName);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (product.quantity < saleQuantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }
    const price = product.price;
    const totalPrice = saleQuantity * price;

    const newSale = new Sales({
      name,
      email,
      image,
      phone,
      productName,
      quantity: saleQuantity,
      price,
      totalPrice,
    });
    product.quantity -= saleQuantity;
    await product.save();
    await newSale.save();
    res
      .status(201)
      .json({ message: "Sales record added successfully", newSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const isFound = await Sales.findById(id);
    if (!isFound) {
      return res.status(400).json({ message: "Sale not found" });
    }

    const { phone, productName, quantity: saleQuantity } = req.body;
    const product = await Product.findById(productName);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (product.quantity < saleQuantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    const price = product.price;
    const totalPrice = saleQuantity * price;

    const updatedSale = await Sales.findByIdAndUpdate(
      id,
      { phone, productName, quantity: saleQuantity, price, totalPrice },
      { new: true }
    );

    product.quantity -= saleQuantity;
    await product.save();

    res
      .status(200)
      .json({ message: "Sales record updated successfully", updatedSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await Sales.findById(id);
    if (!sales) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    await Sales.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Successful" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
