import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      validate: {
        validator: (v) => /^[a-zA-Z\s]+$/.test(v),
        message: "Name should only contain alphabets and spaces",
      },
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: [true, "Description required"],
      trim: true,
      minlength: [10, "description must be at least 10 char long"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
      min: 5,
    },
    quantity: {
      type: Number,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
