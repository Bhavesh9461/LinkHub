import crypto from "node:crypto";

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!privateKey || !publicKey || !urlEndpoint) {
    return Response.json({ success: false, message: "ImageKit is not configured" }, { status: 500 });
  }

  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 30 * 60; // 30 minutes

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return Response.json({
    success: true,
    token,
    expire,
    signature,
    publicKey,
    urlEndpoint,
  });
}