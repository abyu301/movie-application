import React from 'react';
import { useState } from "react";
import Background from "./assets/background.png";
import Banner from "./assets/banner.png";
import Search from "./components/Search.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <header className="min-h-screen text-white overflow-x-hidden">
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

                <img src={Background} alt="background" className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 w-full max-w-7xl text-center flex flex-col items-center gap-8">

                    <img src={Banner} alt="Top Movies Banner" className="w-full max-w-[500px] sm:max-w-[700px] md:max-w-3xl mx-auto object-contain"
                    />

                    <h1 className="heading">
                        Find <span className="text-gradient">Movies</span> You Will Enjoy Without the Hassle
                    </h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <h1 className="text-white">{searchTerm}</h1>
                </div>

            </section>
        </header>

    );
};

export default App;
