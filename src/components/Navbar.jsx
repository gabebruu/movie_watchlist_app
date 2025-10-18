import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold metal-mania-regular">
            Movie Watchlist
        </Link>
        <div className="space-x-4">
          {/* Add navigation links here if needed */}
          {/* <Link href="/about" className="text-gray-300 hover:text-white">About</Link> */}
          {/* <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link> */}
        </div>
      </div>
    </nav>
  );
}
