"use client";

import Sidebar from "./components/builder/Sidebar";
import Canvas from "./components/builder/Canvas";
import LogoutButton from "./components/ui/LogoutButton";
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
      <div className="flex h-screen w-full">
        <Sidebar />

        <div className="flex flex-col flex-1 w-full h-full">
          {/* ✅ Top bar with logout */}
          <div className="flex justify-end p-4 border-b">
            <LogoutButton />
          </div>

          {/* ✅ Canvas takes full remaining space */}
          <div className="flex-1 overflow-auto !w-full">
            <Canvas
              siteId={siteId}
              setSiteId={setSiteId}
              layout={layout}
              setLayout={setLayout}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
