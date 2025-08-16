"use client";

import { useDrop } from "react-dnd";
import { DND_TYPES, type DragItem } from "../../lib/dnd";
import type { ReactNode } from "react";
import type { LayoutNode } from "../../models/layoutModel";

interface DroppableAreaProps {
  onDrop: (type: LayoutNode["type"]) => void;
  children?: ReactNode;
}

export default function DroppableArea({ onDrop, children }: DroppableAreaProps) {

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: DND_TYPES.PALETTE_COMPONENT,
    drop: (item: DragItem) => {
      onDrop(item.componentType);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const highlight =
    isOver && canDrop
      ? "border-2 border-dashed border-blue-500 bg-blue-50"
      : "border-2 border-dashed border-gray-300";

  return (
    <div
      ref={dropRef}
      className={`min-h-full w-full rounded ${highlight} transition-colors`}
    >
      {children}
    </div>
  );
}
