import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [characters, setCharacters] = useState([]); // State to hold character data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [totalPages, setTotalPages] = useState(1); // State for the total number of pages
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch data from the API
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true); // Show loading indicator while fetching
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${currentPage}`
        );
        const data = await response.json();
        setCharacters(data.results); // Store the character data
        setTotalPages(data.info.pages); // Store the total number of pages
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error("Error fetching character data:", error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]); // Re-fetch data when currentPage changes

  // Filter characters based on the search query
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (loading) {
    return <div>Loading characters...</div>;
  }

  // Table of characters
  return (
    <div>
      <div className="header-container">
        <h1>Rick & Morty Characters</h1>

        {/* Search Bar*/}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Species</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharacters.map((character) => (
              <tr key={character.id}>
                <td className="avatar">
                  <img src={character.image} alt={character.name} width="50" />
                </td>
                <td>
                  <Link to={`/profile/${character.id}`}>{character.name}</Link>
                </td>
                <td>{character.species}</td>
                <td>{character.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
