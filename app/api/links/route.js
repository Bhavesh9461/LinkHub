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
    const {
      id,
      name,
      description,
      visibility,
      show,
      kind,
      iconType,
      iconUrl,
      iconName,
      hasLink,
      url,
      copyValue,
      liveUrl,
      liveCopyValue,
      githubUrl,
      githubCopyValue,
      members,
      startDate,
      completionDate,
    } = body;

    if (!id || !name) {
      return Response.json({ success: false, message: "id and name are required" }, { status: 400 });
    }

    const resolvedKind = kind === "project" ? "project" : "link";

    if (resolvedKind === "link" && !copyValue) {
      return Response.json({ success: false, message: "copyValue is required for a Link" }, { status: 400 });
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
      visibility: visibility === "private" ? "private" : "public",
      show: show ?? true,
      kind: resolvedKind,
      iconType: iconType || "none",
      iconUrl: iconUrl || "",
      iconName: iconName || "",
      hasLink: hasLink ?? true,
      url: url || "",
      copyValue: copyValue || "",
      liveUrl: liveUrl || "",
      liveCopyValue: liveCopyValue || "",
      githubUrl: githubUrl || "",
      githubCopyValue: githubCopyValue || "",
      members: members || "",
      startDate: startDate || "",
      completionDate: completionDate || "",
      order: count + 1,
    });

    return Response.json({ success: true, link: created.toObject() });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to create link" }, { status: 500 });
  }
}