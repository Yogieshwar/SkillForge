import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllRoadmaps, markStepComplete } from "../services/roadmapService";
import { CheckCircle, Circle } from "lucide-react";
import Header from "../components/Header";

const AllRoadMaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingStep, setLoadingStep] = useState(null);
  const [resources, setResources] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await getAllRoadmaps();
        setRoadmaps(res.data.roadMaps || []);
      } catch (err) {
        console.error("Failed to load roadmaps", err);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleMarkComplete = async (roadmapId, stepNum) => {
    setLoadingStep(stepNum);
    try {
      await markStepComplete({ roadmapId, stepNum });
      setRoadmaps((prevRoadmaps) =>
        prevRoadmaps.map((rm) =>
          rm._id === roadmapId
            ? {
                ...rm,
                steps: rm.steps.map((s) =>
                  s.stepNum === stepNum ? { ...s, completed: true } : s
                ),
              }
            : rm
        )
      );
    } catch (err) {
      console.error("Error marking step complete", err);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setLoadingStep(null);
    }
  };

  const handleViewResources = async (title) => {
    try {
      const res = await axios.get(
        `https://skillforge-backend-apz3.onrender.com/api/resources?topic=${title}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResources(res.data.results || []);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to fetch resources", err);
      alert("Unable to load resources. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setResources([]);
  };

  return (
    <>
    <Header/>
    <section className="p-6 bg-gray-900 text-white rounded-md max-w-6xl mx-auto mt-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Roadmaps</h2>

      {roadmaps.map((roadmap) => {
        const totalSteps = roadmap.steps.length;
        const completedSteps = roadmap.steps.filter((s) => s.completed).length;
        const progressPercentage = Math.round(
          (completedSteps / totalSteps) * 100
        );

        return (
          <div
            key={roadmap._id}
            className="mb-12 p-4 rounded-lg bg-white/5 border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-4 capitalize">
              {roadmap.goal} Roadmap
            </h3>

            {roadmap.steps.map((step) => (
              <div
                key={step.stepNum}
                className={`mb-4 p-4 rounded-lg bg-gray-800 border border-gray-700 ${
                  step.completed ? "ring-2 ring-green-500/30" : ""
                }`}
              >
                <div className="flex items-start space-x-4 mb-2">
                  <div
                    className="mt-1 cursor-pointer group relative"
                    onClick={() => handleMarkComplete(roadmap._id, step.stepNum)}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                    <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {step.completed ? "Completed" : "Click to Complete"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">
                      Step {step.stepNum}: {step.title}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-2">
                  Tools: {step.tools.join(", ")}
                </div>
                <button
                  onClick={() => handleViewResources(step.title)}
                  className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  View Resources
                </button>
              </div>
            ))}

            <div className="mb-6 mt-5">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>
                  {completedSteps} of {totalSteps} steps completed
                </span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Resource Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 mx-1">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl">
            {resources.length > 0 ? (
              <ul className="space-y-4">
                {resources.map((resource, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <img
                      src={resource.thumbnail}
                      alt="thumbnail"
                      className="w-20 h-14 rounded object-cover"
                    />
                    <div className="flex-1">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {resource.title}
                      </a>
                      <p className="text-gray-400 text-sm">
                        {resource.channelTitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No resources available for this step.</p>
            )}
            <button
              onClick={closePopup}
              className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default AllRoadMaps;
