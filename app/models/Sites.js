// const mongoose = require("mongoose");
import mongoose from "../utils/mongoose";
const SiteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  url: { type: String, required: true },
  imgs: { type: Array, required: true },
});
// const users = (module.exports = mongoose.model("Site", SiteSchema));
const model = mongoose.models.Site || mongoose.model("Site", SiteSchema);
// export default mongoose.models && mongoose.models.Sites
//   ? mongoose.models.Sites
//   : mongoose.model("Site", SiteSchema);
export default model;

// const mongoose = require("mongoose");

// const SiteSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: false },
//     url: { type: String, required: true },
//     imgs: { type: Array, required: true },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Site", SiteSchema);
