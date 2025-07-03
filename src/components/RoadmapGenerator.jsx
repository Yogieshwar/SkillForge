import { useState } from "react";
import { generateAiRoadmap } from "../services/roadmapService";
import { useRoadmap } from "../context/RoadmapContext";

const RoadmapGenerator = ({ onRoadmapGenerated }) => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
 const {setRoadmap} =useRoadmap();

  const handleGenerate = async () => {
    if (!goal.trim()) {
      setError("Please enter your career goal.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await generateAiRoadmap(goal);
      // console.log(res)
      setRoadmapData(res.data.roadMap); 
      if (onRoadmapGenerated) {
        onRoadmapGenerated(res.data.roadmap._id); 
      }
      if (res.data && res.data.roadMap) {
      setRoadmap(res.data.roadMap);  
    }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white shadow-lg rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4">AI Roadmap Generator</h2>

      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your career goal (e.g. Frontend Developer)"
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {/* {roadmapData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Roadmap Preview:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {roadmapData.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default RoadmapGenerator;
