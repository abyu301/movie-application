import React, { useEffect, useState } from "react";
import Footer from "../Footer.jsx";
import Background from "./assets/background.png";
import Banner from "./assets/banner.png";
import Logo from "./assets/logo.svg";
import NoMovie from "./assets/no-movie.png";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";
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
    const [trendingMovieList, setTrendingMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");


    useDebounce( () => setDebouncedSearchTerm(searchTerm), 800, [searchTerm] );

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const endPoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            setMoviesList(data.results || []);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.log(error);
            setErrorMessage("Error fetching movies. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovieList(movies);
        } catch (error) {
            console.log("Error fetching trending movies:", error);
        }
    };


    // Fetch movies on mount or when searchTerm changes
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

  useEffect(() => {
      loadTrendingMovies();
  }, []);

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
                 {/*Hero Section */}

                <section>
                    <img
                        src={Logo}
                        alt="App Logo"
                        className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] mx-auto object-contain"
                    />
                </section>



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

                {trendingMovieList.length > 0 && (
                    <section className="w-full max-w-7xl mt-16 px-2 sm:px-4">
                        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-6 sm:mb-10">
                            Trending Searches
                        </h2>

                        {/* Horizontal scroll for screens >= 760px */}
                        <ul className="flex flex-row gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                            {trendingMovieList.map((movie, index) => (
                                <li
                                    key={movie.$id}
                                    className="relative group flex-shrink-0 w-36 sm:w-40 md:w-44 snap-start cursor-pointer"
                                >
                                    {/* Badge Number */}
                                    <span className="absolute top-1 left-1 bg-yellow-400 text-black font-bold text-sm sm:text-base px-2 py-1 rounded-md z-10">
            #{index + 1}
          </span>

                                    {/* Poster */}
                                    <img
                                        src={movie.poster_url ? movie.poster_url : NoMovie}
                                        alt={movie.movie_title || "No Image"}
                                        className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover rounded-xl transition duration-300 group-hover:scale-105"
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}




                {/* Movie List Section */}
                <section className="w-full max-w-7xl mt-12">
                    <h2 className="text-white text-4xl mb-8">All Movies</h2>

                    {isLoading ? (
                        <div className="flex justify-center mt-6">
                            <Spinner />
                        </div>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
                            {moviesList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </section>
                <Footer />

            </div>

        </div>
    );
};

export default App;
