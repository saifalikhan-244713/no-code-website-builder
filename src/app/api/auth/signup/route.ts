import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );

    const user = await User.create({ name, email, password });
    const token = signToken({ userId: user._id.toString(), email: user.email });

    return NextResponse.json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup failed:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
