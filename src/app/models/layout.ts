// models/Layout.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ILayout extends Document {
  userId: string; // if you want layouts per user
  name: string; // optional (page name)
  layout: any[]; // array of components (your JSON)
  createdAt: Date;
  updatedAt: Date;
}

const LayoutSchema = new Schema<ILayout>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    layout: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Layout ||
  mongoose.model<ILayout>("Layout", LayoutSchema);
