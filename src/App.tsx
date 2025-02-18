import { useState } from "react";


export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [playerData, setPlayerData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchPlayer = async () => {
    setError("");
    setPlayerData(null);

    if (!firstName || !lastName) {
      setError("Please enter both first and last names.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/player?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`
      );
      const data = await response.json();

      if (response.ok) {
        setPlayerData(data.player);
      } else {
        setError(data.message || "Player not found.");
      }
    } catch (err) {
      setError("Error fetching player data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">NBA Player Search</h1>
      <div className="bg-white shadow-md p-6 rounded-lg w-96">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={fetchPlayer}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Search Player
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {playerData && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-bold">{playerData.first_name} {playerData.last_name}</h2>
            <p>Team: {playerData.team.full_name}</p>
            <p>Position: {playerData.position || "N/A"}</p>
            <p>Height: {playerData.height_feet ? `${playerData.height_feet}' ${playerData.height_inches}"` : "N/A"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
