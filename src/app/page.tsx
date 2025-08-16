"use client";

import Sidebar from "./components/builder/Sidebar";
import Canvas from "./components/builder/Canvas";
import { useState } from "react";
import type { LayoutNode } from "./models/layoutModel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HomePage() {
  const [layout, setLayout] = useState<LayoutNode[]>([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar 
        // layout={layout} 
        // setLayout={setLayout}
         />
        <Canvas layout={layout} setLayout={setLayout} />
      </div>
    </DndProvider>
  );
}
