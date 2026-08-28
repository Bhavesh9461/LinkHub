import { connectToDatabase } from "@/lib/mongoose";
import Link from "@/models/Link";

export async function POST(request) {
  try {
    const { order } = await request.json();

    if (!Array.isArray(order) || order.length === 0) {
      return Response.json({ success: false, message: "order must be a non-empty array" }, { status: 400 });
    }

    await connectToDatabase();

    const operations = order.map(({ id, order: newOrder }) => ({
      updateOne: { filter: { id }, update: { $set: { order: newOrder } } },
    }));

    await Link.bulkWrite(operations);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to reorder links" }, { status: 500 });
  }
}