import React from "react";
import Background from "./assets/background.png";
import Banner from "./assets/banner.png";

const App = () => {
    return (
        <main className="min-h-screen text-white">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center">

                {/* Background Image */}
                <img src={Background} alt="background" className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark Overlay => This creates the dark transparent layer When i put white text directly on a colorful image, it becomes easy to read.*/}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 wrapper text-center flex flex-col items-center gap-8">

                    {/* Banner Image */}
                    <img src={Banner} alt="Top Movies Banner" className="w-full max-w-3xl mx-auto"
                    />

                    {/* Heading */}
                    <h1 className="heading">
                        Find <span className="text-gradient">Movies</span> You Will Enjoy Without the Hassle
                    </h1>

                </div>
            </section>

        </main>
    );
};

export default App;
