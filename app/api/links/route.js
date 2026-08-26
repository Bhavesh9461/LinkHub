import { connectToDatabase } from "@/lib/mongoose";
import Link from "@/models/Link";
import { getAllLinksForAdmin } from "@/lib/getLinks";

export async function GET() {
  const links = await getAllLinksForAdmin();
  return Response.json({ success: true, links });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, name, description, url, copyValue, hasLink, show, visibility, iconType, iconUrl, iconName } = body;

    if (!id || !name || !copyValue) {
      return Response.json({ success: false, message: "id, name, and copyValue are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await Link.findOne({ id }).lean();
    if (existing) {
      return Response.json({ success: false, message: `A link with id "${id}" already exists` }, { status: 409 });
    }

    const count = await Link.countDocuments();

    const created = await Link.create({
      id,
      name,
      description: description || "",
      url: url || "",
      copyValue,
      hasLink: hasLink ?? true,
      show: show ?? true,
      visibility: visibility === "private" ? "private" : "public",
      iconType: iconType || "none",
      iconUrl: iconUrl || "",
      iconName: iconName || "",
      order: count + 1,
    });

    return Response.json({ success: true, link: created.toObject() });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to create link" }, { status: 500 });
  }
}