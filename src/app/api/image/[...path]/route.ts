import { NextRequest, NextResponse } from "next/server";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://learn.smktelkom-mlg.sch.id/toko/";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const imagePath = path.join("/");
  const targetUrl = `${IMAGE_BASE}${imagePath}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/*,*/*",
        "Referer": IMAGE_BASE,
      },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
