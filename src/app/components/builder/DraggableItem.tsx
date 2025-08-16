"use client";

import { useDrag } from "react-dnd";
import { DND_TYPES, type DragItem } from "../../lib/dnd";
import type { LayoutNode } from "../../models/layoutModel";

interface DraggableItemProps {
  componentType: LayoutNode["type"]; // strict type - means the type of component must be of only "type" defined in lsyoutModel.ts
  label: string;
}

export default function DraggableItem({
  componentType,
  label,
}: DraggableItemProps) {

  
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DND_TYPES.PALETTE_COMPONENT,
    item: { componentType } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
      className={[
        "cursor-grab select-none rounded border p-2 text-sm shadow-sm transition",
        "active:cursor-grabbing",
        isDragging ? "opacity-50" : "opacity-100",
        "bg-white hover:shadow",
      ].join(" ")}
    >
      {label}
    </div>
  );
}
