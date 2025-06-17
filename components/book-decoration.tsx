export function BookDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Books */}
      <div className="absolute top-20 left-16 animate-float-slow">
        <div className="w-12 h-16 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm shadow-lg transform rotate-12 opacity-20">
          <div className="w-full h-2 bg-amber-900 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-40 right-24 animate-float-medium">
        <div className="w-10 h-14 bg-gradient-to-b from-orange-600 to-orange-800 rounded-sm shadow-lg transform -rotate-6 opacity-15">
          <div className="w-full h-2 bg-orange-900 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-32 left-1/4 animate-float-fast">
        <div className="w-14 h-18 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-sm shadow-lg transform rotate-45 opacity-10">
          <div className="w-full h-2 bg-yellow-950 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute bottom-20 right-1/3 animate-float-slow">
        <div className="w-11 h-15 bg-gradient-to-b from-amber-700 to-amber-900 rounded-sm shadow-lg transform -rotate-12 opacity-20">
          <div className="w-full h-2 bg-amber-950 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-1/2 left-8 animate-float-medium">
        <div className="w-13 h-17 bg-gradient-to-b from-orange-700 to-orange-900 rounded-sm shadow-lg transform rotate-6 opacity-15">
          <div className="w-full h-2 bg-orange-950 rounded-t-sm"></div>
        </div>
      </div>

      <div className="absolute top-1/3 right-12 animate-float-fast">
        <div className="w-9 h-13 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-sm shadow-lg transform -rotate-45 opacity-25">
          <div className="w-full h-2 bg-yellow-900 rounded-t-sm"></div>
        </div>
      </div>

      {/* Book Stack */}
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="relative">
          <div className="w-16 h-3 bg-amber-800 rounded-sm"></div>
          <div className="w-15 h-3 bg-orange-800 rounded-sm mt-0.5 ml-0.5"></div>
          <div className="w-14 h-3 bg-yellow-800 rounded-sm mt-0.5 ml-1"></div>
        </div>
      </div>

      {/* Open Book */}
      <div className="absolute top-16 right-16 opacity-15">
        <div className="relative w-20 h-12">
          <div className="absolute left-0 w-10 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-l-lg transform -rotate-6"></div>
          <div className="absolute right-0 w-10 h-12 bg-gradient-to-l from-amber-600 to-amber-700 rounded-r-lg transform rotate-6"></div>
          <div className="absolute top-2 left-2 w-6 h-8 bg-amber-100 rounded-sm opacity-50"></div>
          <div className="absolute top-2 right-2 w-6 h-8 bg-amber-100 rounded-sm opacity-50"></div>
        </div>
      </div>
    </div>
  )
}
