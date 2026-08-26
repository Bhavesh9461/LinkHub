import { connectToDatabase } from "@/lib/mongoose";
import PrivateLink from "@/models/PrivateLink";

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await PrivateLink.find({}).sort({ order: 1 }).lean();
    const links = docs.map(({ _id, __v, createdAt, updatedAt, ...rest }) => rest);
    return Response.json({ success: true, links });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to fetch links" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, description, url, copyValue, hasLink, show } = body;

    if (!id || !name || !copyValue) {
      return Response.json(
        { success: false, message: "id, name, and copyValue are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await PrivateLink.findOne({ id }).lean();
    if (existing) {
      return Response.json({ success: false, message: `A link with id "${id}" already exists` }, { status: 409 });
    }

    const count = await PrivateLink.countDocuments();

    const created = await PrivateLink.create({
      id,
      name,
      description: description || "",
      url: url || "",
      copyValue,
      hasLink: hasLink ?? true,
      show: show ?? true,
      order: count + 1,
    });

    return Response.json({ success: true, link: created.toObject() });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to create link" }, { status: 500 });
  }
}