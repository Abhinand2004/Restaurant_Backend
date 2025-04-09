import mongoose from "mongoose";



const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.menu || mongoose.model('menu', menuSchema);

