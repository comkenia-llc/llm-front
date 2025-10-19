import SearchBox from "./SearchBox";

export default function Hero() {
    return (
        <section
            className="relative flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20 md:py-24 lg:py-28 
      bg-gradient-to-r from-blue-900 via-indigo-800 to-sky-700"
        >
            {/* Overlay for soft visual depth */}
            <div className="absolute inset-0 bg-blue-900/40"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-white">
                <h1
                    className="text-lg sm:text-xl md:text-4xl font-extrabold leading-tight tracking-tight"
                    style={{ textShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                >
                    PURSUE YOUR PASSION,{" "}
                    <span className="text-red-400">SHAPE YOUR FUTURE</span>
                </h1>

                <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-gray-100 font-light">
                    Find Thousands of Universities, Programmes, and Much More
                </p>

                {/* SearchBox */}
                <div className="mt-8 sm:mt-10 flex justify-center">
                    <SearchBox />
                </div>
            </div>
        </section>
    );
}
