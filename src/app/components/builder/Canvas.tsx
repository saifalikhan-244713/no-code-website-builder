"use client";

import { LayoutNode } from "../../models/layoutModel";
import NavbarComponent from "../ui/NavbarComponent";
import HeaderComponent from "../ui/HeaderComponent";
import DroppableArea from "./DroppableArea";
import {
  addComponentToLayout,
  updateComponentProps,
} from "../../controllers/builderController";
import CardsSection from "../ui/CardsSection";

interface CanvasProps {
  layout: LayoutNode[];
  setLayout: React.Dispatch<React.SetStateAction<LayoutNode[]>>;
}

export default function Canvas({ layout, setLayout }: CanvasProps) {
  const onDrop = (type: LayoutNode["type"]) => {
    setLayout((prev) => addComponentToLayout(prev, type));
  };

  const handleUpdate = (id: string, newProps: Record<string, unknown>) => {
    setLayout((prev) => updateComponentProps(prev, id, newProps));
  };

  const renderComponent = (node: LayoutNode) => {
    switch (node.type) {
      case "navbar":
        return (
          <NavbarComponent
            key={node.id}
            id={node.id}
            brand={node.props?.brand || ""}
            links={node.props?.links || []}
            onUpdate={handleUpdate}
          />
        );
      case "header":
        return (
          <HeaderComponent
            key={node.id}
            id={node.id}
            title={node.props?.title || ""}
            subtitle={node.props?.subtitle || ""}
            onUpdate={handleUpdate}
          />
        );
      case "cardsContainer":
        return (
          <CardsSection
            key={node.id}
            id={node.id}
            cards={node.props?.cards || []}
            title={node.props?.containerTitle || ""}
            onUpdate={handleUpdate}
          />
        );
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
