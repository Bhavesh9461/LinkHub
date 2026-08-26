import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    show: { type: Boolean, default: true },
    hasLink: { type: Boolean, default: true },
    url: { type: String, default: "" },
    copyValue: { type: String, required: true },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
    order: { type: Number, default: 0 },

    // Icon: either an uploaded image (ImageKit) or a Remix Icon class name.
    // If neither is set, the UI falls back to a generic default icon.
    iconType: { type: String, enum: ["upload", "remix", "none"], default: "none" },
    iconUrl: { type: String, default: "" }, // set when iconType === "upload"
    iconName: { type: String, default: "" }, // set when iconType === "remix", e.g. "ri-github-line"
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);