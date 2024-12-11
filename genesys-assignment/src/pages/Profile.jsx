import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // Access the character ID from the URL
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null); // State for character details
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch character details from the API
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        setCharacter(data); // Store character data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  // Show loading indicator
  if (loading) {
    return <div>Loading character details...</div>;
  }

  // Show an error if character data is unavailable
  if (!character) {
    return <div>Character not found.</div>;
  }

  // Render character details
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>
      <p>
        <strong>Location:</strong> {character.location.name}
      </p>
    </div>
  );
};

export default Profile;
