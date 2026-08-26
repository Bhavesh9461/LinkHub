import "server-only";
import { connectToDatabase } from "@/lib/mongoose";
import Link from "@/models/Link";

function serialize(doc) {
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return rest;
}

/** Used by the public homepage (/) — Server Component, no auth needed. */
export async function getPublicLinks() {
  try {
    await connectToDatabase();
    const docs = await Link.find({ visibility: "public", show: true }).sort({ order: 1 }).lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("Failed to fetch public links:", err.message);
    return [];
  }
}

/** Used by /private-links — already behind Clerk via proxy.js. */
export async function getPrivateVisibleLinks() {
  try {
    await connectToDatabase();
    const docs = await Link.find({ visibility: "private", show: true }).sort({ order: 1 }).lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("Failed to fetch private links:", err.message);
    return [];
  }
}

/** Used only by the manage page's API — returns EVERY link regardless of visibility/show. */
export async function getAllLinksForAdmin() {
  try {
    await connectToDatabase();
    const docs = await Link.find({}).sort({ order: 1 }).lean();
    return docs.map(serialize);
  } catch (err) {
    console.error("Failed to fetch all links:", err.message);
    return [];
  }
}