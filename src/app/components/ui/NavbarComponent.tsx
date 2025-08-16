export default function NavbarComponent() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <span className="font-bold">My Website</span>
      <div className="space-x-4">
        <a href="#">Home</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}
