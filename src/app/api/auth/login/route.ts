import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ userId: user._id });

    return NextResponse.json({ token, user: { _id: user._id, email } });
  } catch (err) {
    console.error("Login failed:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
