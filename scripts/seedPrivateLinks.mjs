import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "linkhub";

if (!uri) {
  console.error("Set MONGODB_URI before running this script.");
  process.exit(1);
}

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

const PrivateLink = mongoose.model("PrivateLink", PrivateLinkSchema);

// Edit this array with your real private links, same shape as data/links.js
const links = [
  {
    id: "example",
    name: "Example Link",
    description: "Replace with your real private links",
    show: true,
    hasLink: true,
    url: "https://example.com",
    copyValue: "https://example.com",
    order: 1,
  },
];

async function run() {
  await mongoose.connect(uri, { dbName });
  await PrivateLink.deleteMany({});
  await PrivateLink.insertMany(links);
  console.log(`Inserted ${links.length} private links.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});