import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; //with useNavigate you can go back to the last page in the browser stack making it more dynamic
import "./Profile.css";

const Profile = () => {
  const { id } = useParams(); // set id we get from the URL
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null); // useState for the page character, initial state is null
  const [loading, setLoading] = useState(true);

  // fetch character details from API
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setCharacter(data); // store retrieved character data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []); //nothing in the dependency array, you can't change the character in this page, you can only go back to home

  if (loading) {
    return <div>Loading character details...</div>;
  }

  // show an error if character data is unavailable
  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="profile-container">
      <img
        className="profile-image"
        src={character.image}
        alt={character.name}
      />
      <h1 className="profile-name">{character.name}</h1>
      <div className="profile-details">
        <p>
          <span>Species:</span> {character.species || "Unknown"}
        </p>
        <p>
          <span>Status:</span> {character.status || "Unknown"}
        </p>
        <p>
          <span>Gender:</span> {character.gender || "Unknown"}
        </p>
        <p>
          <span>Origin:</span> {character.origin.name || "Unknown"}
        </p>
        <p>
          <span>Location:</span> {character.location.name || "Unknown"}
        </p>
        <button className="profile-back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        {/*use navigate(-1) to go back to the previous page in the browser stack */}
      </div>
    </div>
  );
};

export default Profile;
