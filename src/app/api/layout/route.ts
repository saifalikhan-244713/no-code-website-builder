import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Layout from "@/app/models/layout";
import { verifyToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded?.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, layout } = await req.json();
    const newLayout = await Layout.create({ name, layout, userId: decoded.userId });

    return NextResponse.json(newLayout);
  } catch (err) {
    console.error("Failed to create layout:", err);
    return NextResponse.json({ error: "Failed to create layout" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded?.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch only layouts for this user
    const layouts = await Layout.find({ userId: decoded.userId });
    return NextResponse.json(layouts);
  } catch (err) {
    console.error("Failed to fetch layouts:", err);
    return NextResponse.json({ error: "Failed to fetch layouts" }, { status: 500 });
  }
}
