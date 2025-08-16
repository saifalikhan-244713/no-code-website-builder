import type { LayoutNode } from "../models/layoutModel";

export const DND_TYPES = {
  PALETTE_COMPONENT: "PALETTE_COMPONENT",
} as const;

export type DragItem = {
  componentType: LayoutNode["type"];
};
