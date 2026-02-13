import React, { useEffect, useState } from "react";
import Background from "./assets/background.png";
import Banner from "./assets/banner.png";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [moviesList, setMoviesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const endPoint = query
                ? `${API_BASE_URL}/search/movie?query=${query}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            setMoviesList(data.results || []);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error fetching movies. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch movies on mount or when searchTerm changes
    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Global background */}
            <img
                src={Background}
                alt="background"
                className="fixed inset-0 w-full h-full object-cover z-0"
            />
            <div className="fixed inset-0 bg-black/60 z-0"></div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-4 py-8">
                {/* Hero Section */}
                <section className="w-full max-w-7xl text-center flex flex-col items-center gap-8">
                    <img
                        src={Banner}
                        alt="Top Movies Banner"
                        className="w-full max-w-[500px] sm:max-w-[700px] md:max-w-3xl mx-auto object-contain"
                    />

                    <h1 className="heading text-2xl sm:text-4xl md:text-6xl text-white">
                        Find <span className="text-gradient">Movies</span> You Will Enjoy
                        Without the Hassle
                    </h1>

                    {/* Search */}
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </section>

                {/* Movie List Section */}
                <section className="w-full max-w-7xl mt-12">
                    <h2 className="text-white text-2xl mb-4">All Movies</h2>

                    {isLoading ? (
                        <div className="flex justify-center mt-6">
                            <Spinner />
                        </div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
                            {moviesList.map((movie) => (
                                <div key={movie.id} className="text-center">
                                    {movie.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="rounded-lg object-cover w-full h-[300px]"
                                        />
                                    ) : (
                                        <div className="bg-gray-700 w-full h-[300px] rounded-lg flex items-center justify-center">
                                            <p className="text-gray-300">No Image</p>
                                        </div>
                                    )}
                                    <p className="mt-2 text-white">{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    )}


                </section>
            </div>
        </div>
    );
};

export default App;
