import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
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
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    phone: {
      type: Number,
      required: [true, "Phone Number required"],
      min: 10,
    },
    selectedProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is required"],
          min: 1,
        },
        price: {
          type: Number,
          // required: [true, "Product price is required"],
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;
