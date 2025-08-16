"use client";

import DraggableItem from "./DraggableItem";

export default function Sidebar() {
  return (
    <aside className="w-[30%] bg-white shadow p-4 space-y-4 overflow-y-auto">
      <h2 className="font-semibold">Components</h2>

      <div className="space-y-2">
        <div className="space-y-2">
          <DraggableItem componentType="navbar" label="Navbar" />
          <DraggableItem componentType="header" label="Header" />
          <DraggableItem
            componentType="cardsContainer"
            label="Cards Container"
          />
        </div>
      </div>
    </aside>
  );
}
