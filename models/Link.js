import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    show: { type: Boolean, default: true },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    order: { type: Number, default: 0 },

    // What kind of card this renders as.
    kind: { type: String, enum: ["link", "project"], default: "link" },

    // Icon — same for both kinds.
    iconType: {
      type: String,
      enum: ["upload", "remix", "none"],
      default: "none",
    },
    iconUrl: { type: String, default: "" },
    iconName: { type: String, default: "" },

    // kind: "link" fields
    hasLink: { type: Boolean, default: true },
    url: { type: String, default: "" },
    copyValue: { type: String, default: "" },

    // kind: "project" fields — both groups fully optional
    liveUrl: { type: String, default: "" },
    liveCopyValue: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    githubCopyValue: { type: String, default: "" },

    // kind: "project" — info-popup fields, all optional
    members: { type: String, default: "" }, // comma-separated, e.g. "bhavesh,gautam"
    startDate: { type: String, default: "" }, // stored as "YYYY-MM-DD" from <input type="date">
    completionDate: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
