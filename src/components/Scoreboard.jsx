function ScoreBoard({ currentScore, bestScore }) {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-700 rounded-xl shadow-lg overflow-hidden mb-8 mt-4">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Current Score</p>
            <p className="text-3xl font-bold text-green-400">{currentScore}</p>
          </div>
          
          <div className="h-12 w-px bg-gray-600 mx-4"></div>
          
          <div className="text-center flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Best Score</p>
            <p className="text-3xl font-bold text-amber-400">{bestScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;