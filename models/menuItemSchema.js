import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  menuId:{type :String}
});

export default mongoose.models.menuItem || mongoose.model('menuItem', menuItemSchema);
