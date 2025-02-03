import Product from "../models/product.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isFound = await Product.findById(id);
    if (!isFound) {
      return res.status(400).json([]);
    }
    const { name, image, description, price, quantity } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        description,
        price,
        quantity,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete Successful" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
