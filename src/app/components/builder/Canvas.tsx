"use client";

import { useEffect, useState } from "react";
import NavbarComponent from "../ui/NavbarComponent";
import HeaderComponent from "../ui/HeaderComponent";
import CardsSection from "../ui/CardsSection";
import DroppableArea from "./DroppableArea";
import {
  addComponentToLayout,
  updateComponentProps,
} from "../../controllers/builderController";
import type { LayoutNode } from "../../models/layoutModel";

export default function Canvas({
  siteId,
  setSiteId,
  layout,
  setLayout,
}: {
  siteId: string | null;
  setSiteId: (id: string) => void;
  layout: LayoutNode[];
  setLayout: React.Dispatch<React.SetStateAction<LayoutNode[]>>;
}) {
  const [loading, setLoading] = useState(true);

  // --- Fetch or create layout on mount ---
  useEffect(() => {
    const fetchOrCreateLayout = async () => {
      try {
        if (!siteId) {
          // check localStorage first
          const storedId = localStorage.getItem("siteId");
          if (storedId) {
            setSiteId(storedId);
            const res = await fetch(`/api/layout/${storedId}`);
            const data = await res.json();
            if (!data.error) setLayout(data.layout || []);
            setLoading(false);
            return;
          }

          // first-time creation
          const res = await fetch("/api/layout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Untitled Page", layout: [] }),
          });
          const newLayout = await res.json();
          if (!newLayout._id) throw new Error("Failed to create layout");

          setSiteId(newLayout._id);
          localStorage.setItem("siteId", newLayout._id); // save for refresh
          setLayout(newLayout.layout || []);
          setLoading(false);
          return;
        }

        // fetch existing layout
        const res = await fetch(`/api/layout/${siteId}`);
        const data = await res.json();
        if (!data.error) setLayout(data.layout || []);
      } catch (err) {
        console.error("Failed to fetch/create layout", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrCreateLayout();
  }, [siteId, setLayout, setSiteId]);

  // --- Save layout whenever it changes ---
  useEffect(() => {
    if (loading || !siteId) return;

    const timeout = setTimeout(async () => {
      try {
        await fetch(`/api/layout/${siteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ layout }),
        });
      } catch (err) {
        console.error("Failed to save layout", err);
      }
    }, 1000); // debounce saving

    return () => clearTimeout(timeout);
  }, [layout, siteId, loading]);

  // --- Builder actions ---
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

  if (loading) return <p>Loading...</p>;

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
