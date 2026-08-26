import { connectToDatabase } from "@/lib/mongoose";
import Link from "@/models/Link";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // Never allow the slug/id itself to be changed after creation —
    // it's the stable key other things (and URLs) might reference.
    delete updates.id;
    delete updates._id;

    await connectToDatabase();
    const updated = await Link.findOneAndUpdate({ id }, updates, { new: true }).lean();

    if (!updated) {
      return Response.json({ success: false, message: "Link not found" }, { status: 404 });
    }

    const { _id, __v, createdAt, updatedAt, ...rest } = updated;
    return Response.json({ success: true, link: rest });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to update link" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const result = await Link.deleteOne({ id });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, message: "Link not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to delete link" }, { status: 500 });
  }
}