import React, { useState } from "react";
import { useRoadmap } from "../context/RoadmapContext";
import { Circle, CheckCircle } from "lucide-react";
import { markStepComplete } from "../services/roadmapService";
import axios from "axios";

const RoadmapDisplay = () => {
  const { roadmap, setRoadmap } = useRoadmap();
  const [loadingStep, setLoadingStep] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!roadmap) {
    return <p className="text-center"></p>;
  }
  const totalSteps = roadmap.steps.length;
  const completedSteps = roadmap.steps.filter((s) => s.completed).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const handleMarkComplete = async (stepNum) => {
    setLoadingStep(stepNum);
    try {
      console.log(roadmap._id, stepNum)
      await markStepComplete({ roadmapId:roadmap._id, stepNum });

      const updateSteps = roadmap.steps.map((step) =>
       step.stepNum === stepNum ? { ...step, completed: true } : step
      );
      setRoadmap({ ...roadmap, steps: updateSteps });
    } catch (err) {
      console.error("Error marking step complete", err);
      alert("Failed to mark as complete. Please try again.");
    } finally {
      setLoadingStep(null);
    }
  };

  const handleViewResources = async (title) => {
    try {
      console.log(title)
      const res = await axios.get(
        `https://skillforge-backend-apz3.onrender.com/api/resources?topic=${title}`,
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        
      );
      console.log(res)
      setResources(res.data.results || []);
      // setSelectedStep(stepNum);
      setShowPopup(true);
    } catch (err) {
      console.error("Failed to fetch resources", err);
      alert("Unable to load resources. Please try again.");
    }
  };
   const closePopup = () => {
    setShowPopup(false);
    setResources([]);
    setSelectedStep(null);
  };

   const handleSaveRoadmap = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const { goal, steps } = roadmap;

      await axios.post(
        "https://skillforge-backend-apz3.onrender.com/api/roadmap/save",
        { goal, steps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Roadmap saved successfully.");
    } catch (err) {
      console.error("Failed to save roadmap", err);
      alert("Saving failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="p-6 bg-gray-900 text-white rounded-md max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Your AI Career Roadmap</h2>
      <p className="mb-6 font-semibold">Goal: {roadmap.goal}</p>

      {roadmap.steps.map((step, id) => (
        <div
          key={id}
          className={`m-3 rounded-lg border border-gray-700 p-4 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
            step.completed ? "ring-2 ring-green-500/20" : ""
          }`}
        >
          <div className="flex items-start justify-between pb-4">
            <div className="flex items-start space-x-4">
              <div
                className="mt-1 cursor-pointer group relative"
                onClick={() => handleMarkComplete(step.stepNum)}
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
                <h2 className="text-white font-semibold flex items-center gap-2">
                  {step.stepNum}: {step.title}
                  {step.difficulty && (
                    <span className={getDifficultyColor(step.difficulty)}>
                      {step.difficulty}
                    </span>
                  )}
                </h2>
                <p className="mt-2 text-sm text-gray-300">{step.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Recommended Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {step.tools.length > 0 &&
                  step.tools.map((tool, id) => (
                    <button
                      key={id}
                      className="w-full flex items-center space-x-2 p-3 rounded-md bg-white/10 border border-gray-600 hover:bg-white/20 text-sm text-white truncate"
                    >
                      <span className="truncate">{tool}</span>
                    </button>
                  ))}
              </div>
              <button
                onClick={() => handleViewResources(step.title)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                View Resources
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Progress Bar */}
      <div className="mb-6 mt-7">
        <h3 className="mb-6 font-semibold text-3xl">Your {roadmap.goal} RoadMap Overall Progress</h3>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>{completedSteps} of {totalSteps} steps completed</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleSaveRoadmap}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Roadmap"}
        </button>
      </div>
      {/* Resource Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 mx-1.5">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl">
            {/* <h3 className="text-xl font-bold mb-4 text-white">
              Resources for Step {selectedStep}
            </h3> */}
            {resources.length > 0 ? (
              <ul className="space-y-4">
                {resources.map((resource, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <img src={resource.thumbnail} alt="thumbnail" className="w-20 h-14 rounded object-cover" />
                    <div className="flex-1">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {resource.title}
                      </a>
                      <p className="text-gray-400 text-sm">{resource.channelTitle}</p>
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
  );
};

export default RoadmapDisplay;
