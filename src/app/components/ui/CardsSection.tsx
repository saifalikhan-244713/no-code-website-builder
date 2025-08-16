"use client";

interface CardsSectionProps {
  id: string;
  title: string;
  cards: { heading: string; description: string }[];
  onUpdate: (id: string, newProps: Record<string, unknown>) => void;
}

export default function CardsSection({
  id,
  title,
  cards,
  onUpdate,
}: CardsSectionProps) {
  return (
    <section className="w-full bg-gray-100 py-12 px-6">
      {/* Section Title */}
      <h2
        className="text-3xl font-bold text-center mb-10 inline-block border border-dashed border-gray-400 px-1 rounded-sm"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdate(id, { title: e.currentTarget.textContent })}
      >
        {title}
      </h2>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col"
          >
            <h3
              className="text-xl font-semibold mb-2 inline-block border border-dashed border-gray-400 px-1 rounded-sm"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const updated = [...cards];
                updated[i].heading = e.currentTarget.textContent || "";
                onUpdate(id, { cards: updated });
              }}
            >
              {card.heading}
            </h3>
            <p
              className="text-gray-600 inline-block border border-dashed border-gray-400 px-1 rounded-sm"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const updated = [...cards];
                updated[i].description = e.currentTarget.textContent || "";
                onUpdate(id, { cards: updated });
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
