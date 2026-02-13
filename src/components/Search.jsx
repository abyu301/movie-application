import searchIcon from "../assets/search.svg";

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="w-full px-4 mt-4">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-3 w-full max-w-3xl mx-auto">

                {/* Icon */}
                <img
                    src={searchIcon}
                    alt="search icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 mr-3 shrink-0"
                />

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-300 outline-none text-sm sm:text-base md:text-lg"
                />

            </div>
        </div>

    );
};

export default Search;
