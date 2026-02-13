import React from 'react';
import { useEffect, useState } from "react";
import Background from "./assets/background.png";
import Banner from "./assets/banner.png";
import Search from "./components/Search.jsx";


const API_BASE_URL = "https://api.themoviedb.org/3/";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers:{
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [moviesList, setMoviesList] = useState([]);
    const [isloading, setIsLoading] = useState(false);


    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Could not find movie?");
            }

            const data = await response.json();

            if(data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies')
                setMoviesList([]);
                return;
            }

            setMoviesList(data.results || []);

        } catch (error) {
            console.log(`Fetch movies error: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchMovies();

    }, []);
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


                <div className="all-movies relative flex items-center justify-center px-4 overflow-hidden">
                    <h2>All Movies</h2>

                    {isloading? (
                        <p className="text-white">Loading...</p>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {moviesList.map((movie) => (
                                <p className="text-white">{movie.title}</p>
                            ))}
                        </ul>
                    )}
                </div>
            </section>


        </header>

    );
};

export default App;
