import mongoose from "mongoose";

const PrivateLinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    show: { type: Boolean, default: true },
    hasLink: { type: Boolean, default: true },
    url: { type: String, default: "" },
    copyValue: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevents Next.js dev hot-reload from redefining the model and throwing
// "Cannot overwrite model once compiled" errors.
export default mongoose.models.PrivateLink ||
  mongoose.model("PrivateLink", PrivateLinkSchema);