import "server-only";
import { connectToDatabase } from "@/lib/mongoose";
import Link from "@/models/Link";

function serialize(doc) {
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return rest;
}

async function findLinks(filter) {
  try {
    await connectToDatabase();
    const docs = await Link.find(filter).sort({ order: 1 }).lean();
    return docs.map(serialize);
  } catch (err) {
    console.error(`Failed to fetch links (${JSON.stringify(filter)}):`, err.message);
    return [];
  }
}

export async function getPublicLinks() {
  return findLinks({ visibility: "public", show: true, kind: "link" });
}

export async function getPrivateVisibleLinks() {
  return findLinks({ visibility: "private", show: true, kind: "link" });
}

export async function getPublicProjects() {
  return findLinks({ visibility: "public", show: true, kind: "project" });
}

export async function getPrivateProjects() {
  return findLinks({ visibility: "private", show: true, kind: "project" });
}

/** Used only by the manage page's API — every entry, any kind/visibility/show state. */
export async function getAllLinksForAdmin() {
  return findLinks({});
}