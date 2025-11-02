export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white text-lg">Loading weather data...</p>
      </div>
    </div>
  );
};