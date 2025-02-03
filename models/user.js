import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 chatacters long"],
      maxlength: [20, "Full name cannot exceed 20 character"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, //not accesible default if querying
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
