"use client";

interface NavbarProps {
  id: string;
  brand: string;
  links: string[];
  onUpdate: (id: string, newProps: Record<string, unknown>) => void;
}

export default function NavbarComponent({
  id,
  brand,
  links,
  onUpdate,
}: NavbarProps) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <span
        className="font-bold inline-block border border-dashed border-gray-300 px-1 rounded-sm"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdate(id, { brand: e.currentTarget.textContent })}
      >
        {brand}
      </span>
      <div className="space-x-4">
        {links.map((link, i) => (
          <a
            key={i}
            href="#"
            className="inline-block border border-dashed border-gray-300 px-1 rounded-sm"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const updated = [...links];
              updated[i] = e.currentTarget.textContent || "";
              onUpdate(id, { links: updated });
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
