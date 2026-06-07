import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:      { type: String, required: true },
  whatsapp:      { type: String, default: "" },
  university:    { type: String, default: "" },
  branch:        { type: String, default: "" },
  year:          { type: String, default: "" },
  referral_code: { type: String, default: "" },
  telegram_id:   { type: String, default: null, index: true, unique: true, sparse: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Never return password in JSON responses
userSchema.set("toJSON", {
  transform: (_, obj) => { delete obj.password; return obj; },
});

export default mongoose.model("User", userSchema);
