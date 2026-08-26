import "server-only";
import { connectToDatabase } from "@/lib/mongoose";
import PrivateLink from "@/models/PrivateLink";

/**
 * Fetches all private links, sorted by `order`. Returns an empty array
 * and logs the error on failure, so a DB hiccup fails safely instead of
 * crashing the page.
 */
export async function getPrivateLinks() {
  try {
    await connectToDatabase();
    const docs = await PrivateLink.find({}).sort({ order: 1 }).lean();

    // .lean() gives plain objects, but _id and timestamps aren't
    // serializable as-is for a Server Component — strip what the UI
    // doesn't need.
    return docs.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest);
  } catch (err) {
    console.error("Failed to fetch private links from MongoDB:", err.message);
    return [];
  }
}