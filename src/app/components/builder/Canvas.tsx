"use client";

import { LayoutNode } from "../../models/layoutModel";
import NavbarComponent from "../ui/NavbarComponent";
import HeaderComponent from "../ui/HeaderComponent";
import DroppableArea from "./DroppableArea";
import { addComponentToLayout } from "../../controllers/builderController";

interface CanvasProps {
  layout: LayoutNode[];
  setLayout: React.Dispatch<React.SetStateAction<LayoutNode[]>>;
}

export default function Canvas({ layout, setLayout }: CanvasProps) {
  const onDrop = (type: LayoutNode["type"]) => {
    setLayout((prev) => addComponentToLayout(prev, type));
  };

  const renderComponent = (node: LayoutNode) => {
    switch (node.type) {
      case "navbar":
        return <NavbarComponent key={node.id} />;
      case "header":
        return <HeaderComponent key={node.id} />;
      default:
        return null;
    }
  };

  return (
    <main className="w-[70%] bg-gray-50 p-4">
      <DroppableArea onDrop={onDrop}>
        {layout.length === 0 ? (
          <div className="grid h-[calc(100vh-2rem)] place-items-center text-center text-gray-500">
            <div>
              <p className="text-lg font-medium">Drop components here</p>
              <p className="text-sm">
                Try dragging <span className="font-semibold">Navbar</span> or{" "}
                <span className="font-semibold">Header</span> from the left.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {layout.map((node) => renderComponent(node))}
          </div>
        )}
      </DroppableArea>
    </main>
  );
}
