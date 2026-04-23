import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const BASE_URL = process.env.API_BASE_URL || "https://learn.smktelkom-mlg.sch.id/toko/api";

export async function ANY(req: NextRequest, { params }: { params: { path: string[] } }) {
  // Wait, Next.js route handlers need specific exports for GET, POST, PUT, DELETE, etc.
  return handleProxy(req, params);
}

async function handleProxy(req: NextRequest, params: { path: string[] }) {
  const session = await getServerSession(authOptions);
  
  // Reconstruct the external path
  const path = params.path ? params.path.join("/") : "";
  const searchParams = req.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : "";
  const targetUrl = `${BASE_URL}/${path}${queryString}`;

  const headers = new Headers();
  
  // We need to carefully proxy headers, especially Content-Type
  // For FormData, we should NOT set Content-Type manually, fetch will do it with the correct boundary
  const reqContentType = req.headers.get("content-type");
  if (reqContentType && !reqContentType.includes("multipart/form-data")) {
    headers.set("Content-Type", reqContentType);
  }
  
  headers.set("Accept", "application/json");

  // Attach token if user is logged in
  if (session?.user?.token) {
    headers.set("Authorization", `Bearer ${session.user.token}`);
  }

  try {
    let body: FormData | string | null = null;
    
    // For GET/HEAD requests, body cannot be included
    if (req.method !== "GET" && req.method !== "HEAD") {
      // If it's form data, we need to extract and forward it properly
      if (reqContentType?.includes("multipart/form-data") || reqContentType?.includes("application/x-www-form-urlencoded")) {
        body = await req.formData();
      } else {
        const text = await req.text();
        if (text) body = text;
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { status: response.status });
    }
  } catch (error: unknown) {
    console.error("Proxy error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Proxy Error", details: errorMessage }, { status: 500 });
  }
}

export const GET = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => handleProxy(req, await params);
export const POST = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => handleProxy(req, await params);
export const PUT = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => handleProxy(req, await params);
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => handleProxy(req, await params);
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => handleProxy(req, await params);
