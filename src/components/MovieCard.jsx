import React from "react";

const MovieCard = ({ movie }) => {
    const { title, vote_average, poster_path, release_date, original_language } = movie;

    return (
        <div className="movie-card bg-gray-800 p-4 rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Movie Poster */}
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/no-movie.png"}
                alt={title}
                className="rounded-lg object-cover w-full h-[300px]"
            />

            {/* Movie Info */}
            <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-white font-bold text-lg line-clamp-1">{title}</h3>
                <p className="text-gray-300 text-sm">
                    Rating: {vote_average} | {release_date?.slice(0, 4)} | {original_language?.toUpperCase()}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
