export function BookDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Books */}
      <div className="absolute top-20 left-16 animate-float-slow book-glow">
        <div className="w-12 h-16 bg-gradient-to-b from-amber-600 to-amber-800 dark:from-cyan-400 dark:to-cyan-600 rounded-sm shadow-lg transform rotate-12 opacity-20 dark:opacity-30 hover:opacity-40 dark:hover:opacity-60 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-amber-900 dark:bg-cyan-800 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-40 right-24 animate-float-medium book-glow">
        <div className="w-10 h-14 bg-gradient-to-b from-orange-600 to-orange-800 dark:from-purple-400 dark:to-purple-600 rounded-sm shadow-lg transform -rotate-6 opacity-15 dark:opacity-25 hover:opacity-35 dark:hover:opacity-50 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-orange-900 dark:bg-purple-800 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-1/4 animate-float-fast book-glow">
        <div className="w-14 h-18 bg-gradient-to-b from-yellow-700 to-yellow-900 dark:from-pink-400 dark:to-pink-600 rounded-sm shadow-lg transform rotate-45 opacity-10 dark:opacity-20 hover:opacity-30 dark:hover:opacity-45 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-yellow-950 dark:bg-pink-800 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-20 right-1/3 animate-float-slow book-glow">
        <div className="w-11 h-15 bg-gradient-to-b from-amber-700 to-amber-900 dark:from-green-400 dark:to-green-600 rounded-sm shadow-lg transform -rotate-12 opacity-20 dark:opacity-30 hover:opacity-40 dark:hover:opacity-60 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-amber-950 dark:bg-green-800 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-1/2 left-8 animate-float-medium book-glow">
        <div className="w-13 h-17 bg-gradient-to-b from-orange-700 to-orange-900 dark:from-blue-400 dark:to-blue-600 rounded-sm shadow-lg transform rotate-6 opacity-15 dark:opacity-25 hover:opacity-35 dark:hover:opacity-50 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-orange-950 dark:bg-blue-800 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-1/3 right-12 animate-float-fast book-glow">
        <div className="w-9 h-13 bg-gradient-to-b from-yellow-600 to-yellow-800 dark:from-indigo-400 dark:to-indigo-600 rounded-sm shadow-lg transform -rotate-45 opacity-25 dark:opacity-35 hover:opacity-45 dark:hover:opacity-65 transition-opacity duration-300 cursor-pointer">
          <div className="w-full h-2 bg-yellow-900 dark:bg-indigo-800 rounded-t-sm"></div>
        </div>
      </div>

      {/* Book Stack */}
      <div className="absolute bottom-10 left-10 opacity-10 dark:opacity-20 book-glow">
        <div className="relative cursor-pointer hover:opacity-30 dark:hover:opacity-40 transition-opacity duration-300">
          <div className="w-16 h-3 bg-amber-800 dark:bg-cyan-600 rounded-sm"></div>
          <div className="w-15 h-3 bg-orange-800 dark:bg-purple-600 rounded-sm mt-0.5 ml-0.5"></div>
          <div className="w-14 h-3 bg-yellow-800 dark:bg-pink-600 rounded-sm mt-0.5 ml-1"></div>
        </div>
      </div>

      {/* Open Book */}
      <div className="absolute top-16 right-16 opacity-15 dark:opacity-25 book-glow">
        <div className="relative w-20 h-12 cursor-pointer hover:opacity-35 dark:hover:opacity-45 transition-opacity duration-300">
          <div className="absolute left-0 w-10 h-12 bg-gradient-to-r from-amber-600 to-amber-700 dark:from-cyan-500 dark:to-cyan-600 rounded-l-lg transform -rotate-6"></div>
          <div className="absolute right-0 w-10 h-12 bg-gradient-to-l from-amber-600 to-amber-700 dark:from-cyan-500 dark:to-cyan-600 rounded-r-lg transform rotate-6"></div>
          <div className="absolute top-2 left-2 w-6 h-8 bg-amber-100 dark:bg-cyan-100 rounded-sm opacity-50"></div>
          <div className="absolute top-2 right-2 w-6 h-8 bg-amber-100 dark:bg-cyan-100 rounded-sm opacity-50"></div>
        </div>
      </div>
    </div>
  )
}
