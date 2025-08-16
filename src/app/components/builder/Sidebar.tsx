"use client";

// import { addComponentToLayout } from "../../controllers/builderController";
// import { LayoutNode } from "../../models/layoutModel";
import DraggableItem from "./DraggableItem";

// interface SidebarProps {
//   layout: LayoutNode[];
//   setLayout: React.Dispatch<React.SetStateAction<LayoutNode[]>>;
// }

export default function Sidebar
(
  // { layout, setLayout }: SidebarProps

) {
  // Optional: still keep click-to-add for quick testing
  // const quickAdd = (type: LayoutNode["type"]) =>
  //   setLayout(addComponentToLayout(layout, type));

  return (
    <aside className="w-[30%] bg-white shadow p-4 space-y-4 overflow-y-auto">
      <h2 className="font-semibold">Components</h2>

      <div className="space-y-2">
        <div className="space-y-2">
          <DraggableItem componentType="navbar" label="Navbar" />
          <DraggableItem componentType="header" label="Header" />
        </div>
      </div>

      {/* <div className="pt-4 border-t">
        <p className="text-xs text-gray-500 mb-2">
          Tip: drag an item onto the canvas → or click to add fast:
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => quickAdd("navbar")}
            className="rounded bg-blue-600 px-3 py-1 text-white"
          >
            + Navbar
          </button>
          <button
            onClick={() => quickAdd("header")}
            className="rounded bg-emerald-600 px-3 py-1 text-white"
          >
            + Header
          </button>
        </div>
      </div> */}
    </aside>
  );
}
