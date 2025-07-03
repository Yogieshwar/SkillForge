import { createContext, useContext, useState } from "react";

const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  const [roadmap, setRoadmap] = useState(null);

  const updateRoadmap = (data) => {
    setRoadmap(data);
  };

  return (
    <RoadmapContext.Provider value={{ roadmap, setRoadmap }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => useContext(RoadmapContext);
