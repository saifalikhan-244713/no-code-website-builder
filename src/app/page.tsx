"use client";

import Sidebar from "./components/builder/Sidebar";
import Canvas from "./components/builder/Canvas";
import { useCallback, useState } from "react";
import type { LayoutNode } from "./models/layoutModel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HomePage() {
  const [layout, setLayout] = useState<LayoutNode[]>([]);
  const [siteId, setSiteIdState] = useState<string | null>(null);
  const setSiteId = useCallback((id: string) => setSiteIdState(id), []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar />
        <Canvas
          siteId={siteId} // ✅ pass siteId
          setSiteId={setSiteId} // ✅ so Canvas can update it
          layout={layout}
          setLayout={setLayout}
        />
      </div>
    </DndProvider>
  );
}
