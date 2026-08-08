export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#4169E1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
