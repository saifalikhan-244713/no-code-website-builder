"use client";

interface HeaderProps {
  id: string;
  title: string;
  subtitle: string;
  onUpdate: (id: string, newProps: Record<string, unknown>) => void;
}

export default function HeaderComponent({
  id,
  title,
  subtitle,
  onUpdate,
}: HeaderProps) {
  return (
    <header className="bg-gray-200 p-6 text-center">
      <h1
        className="text-3xl font-bold inline-block border border-dashed border-gray-400 px-1 rounded-sm"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdate(id, { title: e.currentTarget.textContent })}
      >
        {title}
      </h1>
      <p
        className="mt-2 text-gray-700 inline-block border border-dashed border-gray-400 px-1 rounded-sm"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdate(id, { subtitle: e.currentTarget.textContent })}
      >
        {subtitle}
      </p>
    </header>
  );
}
