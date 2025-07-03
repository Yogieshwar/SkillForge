import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/roadmap",
});

export const generateAiRoadmap = (goal) => {
  const token = localStorage.getItem("token"); 

  return API.post(
    "/generate",
    { goal },
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
};
// export const markStepComplete = ({ roadmapId, stepId }) =>
//   API.post("/mark-complete", { roadmapId, stepId });
export const markStepComplete=({roadmapId, stepNum})=>{
  const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

  return API.patch(
    "/mark",
    { roadmapId, stepNumber: stepNum },
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
}

export const  getAllRoadmaps=()=>{
  const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;

  return API.get(
    "/roadmaps",
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
}