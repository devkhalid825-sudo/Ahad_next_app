import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-8xl font-black text-[#4169E1]">404</h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-gray-400 text-sm">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white font-semibold px-8 py-3 rounded-full transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
