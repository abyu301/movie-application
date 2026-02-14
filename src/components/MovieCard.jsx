import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import NoMovie from "../assets/no-movie.png";


const MovieCard = ({ movie }) => {
    const {
        title,
        vote_average,
        poster_path,
        release_date,
        original_language,
    } = movie;

    return (
        <div className="movie-card bg-gray-800 p-4 rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Movie Poster */}
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : NoMovie
                }
                alt={title}
                className="rounded-lg object-cover w-full h-[300px]"
            />


            {/* Movie Info */}
            <div className="mt-3 flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg line-clamp-1">
                    {title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <p className="text-white font-medium">
                        {vote_average ? vote_average.toFixed(1) : "N/A"}
                    </p>
                </div>

                {/* Extra Info */}
                <p className="text-gray-400 text-sm">
                    {release_date?.slice(0, 4) || "N/A"} | {" "}
                    {original_language?.toUpperCase() || "N/A"}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
