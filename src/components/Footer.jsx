export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-center text-gray-400 text-sm z-50 shadow-md">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Movie Watchlist. All rights reserved.</p>
      </div>
    </footer>
  );
}
