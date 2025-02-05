// import mongoose from "mongoose";
import Product from "../models/product.js";
import Sales from "../models/sales.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({}).populate({
      path: "selectedProducts.productId",
      select: "name price",
    });

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
    const { name, email, image, phone, selectedProducts } = req.body;
    let totalPrice = 0;
    for (let i = 0; i < selectedProducts.length; i++) {
      const { productId, quantity: saleQuantity } = selectedProducts[i];
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${productId} not found` });
      }
      if (product.quantity < saleQuantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product ${product.name}`,
        });
      }
      const price = product.price;
      const productTotalPrice = saleQuantity * price;
      totalPrice += productTotalPrice;
      product.quantity -= saleQuantity;
      await product.save();
    }
    const newSale = new Sales({
      name,
      email,
      image,
      phone,
      selectedProducts,
      totalPrice,
    });
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

    const { name, image, email, phone, selectedProducts } = req.body;

    const previousSelectedProducts = isFound.selectedProducts;

    let totalPrice = 0;
    const updatedProductQuantities = [];

    for (let i = 0; i < selectedProducts.length; i++) {
      const { productId, quantity: saleQuantity } = selectedProducts[i];
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${productId} not found` });
      }
      const previousProduct = previousSelectedProducts.find(
        (p) => p.productId.toString() === productId.toString()
      );
      const quantityDifference =
        saleQuantity - (previousProduct ? previousProduct.quantity : 0);

      if (product.quantity < quantityDifference) {
        return res.status(400).json({
          message: `Insufficient quantity for product ${product.name}`,
        });
      }

      const price = product.price;
      const productTotalPrice = saleQuantity * price;
      totalPrice += productTotalPrice;
      product.quantity -= quantityDifference;
      await product.save();

      updatedProductQuantities.push({ productId, quantity: saleQuantity });
    }
    const updatedSale = await Sales.findByIdAndUpdate(
      id,
      {
        name,
        image,
        phone,
        email,
        selectedProducts: updatedProductQuantities,
        totalPrice,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Sales record updated successfully", updatedSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const updateSale = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const isFound = await Sales.findById(id);
//     if (!isFound) {
//       return res.status(400).json({ message: "Sale not found" });
//     }
//     const { name, image, email, phone, selectedProducts } = req.body;
//     let totalPrice = 0;
//     for (let i = 0; i < selectedProducts.length; i++) {
//       const { productId, quantity: saleQuantity } = selectedProducts[i];
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res
//           .status(400)
//           .json({ message: `Product with ID ${productId} not found` });
//       }
//       if (product.quantity < saleQuantity) {
//         return res.status(400).json({
//           message: `Insufficient quantity for product ${product.name}`,
//         });
//       }
//       const price = product.price;
//       const productTotalPrice = saleQuantity * price;
//       totalPrice += productTotalPrice;
//       product.quantity -= saleQuantity;
//       await product.save();
//     }

//     const updatedSale = await Sales.findByIdAndUpdate(
//       id,
//       { name, image, phone, email, selectedProducts, totalPrice },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({ message: "Sales record updated successfully", updatedSale });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
