import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Layout from "@/app/models/layout";
import { verifyToken } from "@/app/lib/jwt";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded?.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(req.url).pathname.split("/").pop();
    const layout = await Layout.findOne({ _id: id, userId: decoded.userId });

    if (!layout) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(layout);
  } catch (err) {
    console.error("Failed to fetch layout:", err);
    return NextResponse.json({ error: "Failed to fetch layout" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded?.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(req.url).pathname.split("/").pop();
    const body = await req.json();

    const updatedLayout = await Layout.findOneAndUpdate(
      { _id: id, userId: decoded.userId },
      { layout: body.layout },
      { new: true }
    );

    if (!updatedLayout) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updatedLayout);
  } catch (err) {
    console.error("Failed to update layout:", err);
    return NextResponse.json({ error: "Failed to update layout" }, { status: 500 });
  }
}
