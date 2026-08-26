import { connectToDatabase } from "@/lib/mongoose";
import PrivateLink from "@/models/PrivateLink";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const result = await PrivateLink.deleteOne({ id });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, message: "Link not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "Failed to delete link" }, { status: 500 });
  }
}