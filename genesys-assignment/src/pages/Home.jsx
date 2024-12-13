import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; //import Link, used when we click a character's name
import "./Home.css";

const Home = () => {
  const [characters, setCharacters] = useState([]); // useState for character data, initial state is empty

  const [currentPage, setCurrentPage] = useState(1); // useState for the currentPage, initial state is 1
  const [totalPages, setTotalPages] = useState(1); // useState for the totalPages, initial state is 1

  const [search, setSearch] = useState(""); // useState for the search box query, initial state is empty string
  const [loading, setLoading] = useState(true);

  // fetch API data
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${currentPage}`
        );

        const data = await response.json();

        setCharacters(data.results); // set character data
        setTotalPages(data.info.pages); // set number of total pages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character data:", error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]); // currentPage in the dependency array, so that we re-fetch whenever we change pages, setCurrentPage() is used by the page navigation buttons

  // filter characters based on the search box query
  const filteredCharacters = characters.filter(
    (character) => character.name.toLowerCase().includes(search.toLowerCase())
    //filter characters whose name includes what is typed in the search box by the user, '.includes()' method always returns true for an empty string (user types nothing)
  );

  if (loading) {
    return <div>Loading characters...</div>;
  }

  ////////////////////
  return (
    <div>
      <div className="header-container">
        {/*nameplate header*/}
        <h1>Rick & Morty Characters</h1>

        {/* search bar*/}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/*home table*/}
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
                  <img src={character.image} alt={character.name} width="80%" />
                </td>
                <td>
                  {/*the character name is also a link to the profile page of the character, sending a character id*/}
                  <Link to={`/profile/${character.id}`}>{character.name}</Link>
                </td>
                <td>{character.species}</td>
                <td>{character.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="pagination">
        {/*ensure we don't decrement past 1, and disable when we get to 1*/}
        <button
          onClick={() => setCurrentPage((current) => Math.max(current - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {/*ensure we don't increment past total nr. of pages, and disable when we get to max nr. of pages*/}
        <button
          onClick={() =>
            setCurrentPage((current) => Math.min(current + 1, totalPages))
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
