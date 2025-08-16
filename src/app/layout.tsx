import "./globals.css";

export const metadata = {
  title: "No-Code Website Builder",
  description: "Drag and drop components to build your website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-gray-100">{children}</body>
    </html>
  );
}
