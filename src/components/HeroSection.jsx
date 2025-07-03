import React,{useState} from 'react'
import { Sparkles, Brain, TrendingUp, Zap } from 'lucide-react'
import RoadmapGenerator from './RoadmapGenerator';

const HeroSection = ({ onRoadmapGenerated }) => {
     const [showGenerator, setShowGenerator] = useState(false);

//      const handleRoadmapGenerated = (roadmapId) => {
//   console.log("Roadmap generated with ID:", roadmapId);

//   // If you're passing onRoadmapGenerated as a prop
//   if (typeof onRoadmapGenerated === 'function') {
//     onRoadmapGenerated(roadmapId);
//   }

//   setShowGenerator(false);
// };


      const handleQuickStart = () => {
    setShowGenerator(true);

  };
  return (
   <>
   <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-skill-gradient p-4 rounded-full animate-pulse">
            <Brain className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          AI-Powered Career Roadmaps
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Get personalized learning paths tailored to your career goals. 
          Our AI analyzes your current skills and creates a step-by-step roadmap to success.
        </p>

        {!showGenerator ? (
          <div className="bg-white/5 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold text-white">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          Get Started in Seconds
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Experience the power of AI-driven learning paths
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* AI Analysis */}
        <div className="flex items-center space-x-3 p-4 bg-white/10 border border-gray-600 rounded-lg">
          <Brain className="h-8 w-8 text-indigo-400" />
          <div>
            <h3 className="font-semibold text-white">AI Analysis</h3>
            <p className="text-sm text-gray-400">Smart skill assessment</p>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="flex items-center space-x-3 p-4 bg-white/10 border border-gray-600 rounded-lg">
          <TrendingUp className="h-8 w-8 text-green-400" />
          <div>
            <h3 className="font-semibold text-white">Progress Tracking</h3>
            <p className="text-sm text-gray-400">Visual progress charts</p>
          </div>
        </div>

        {/* Curated Resources */}
        <div className="flex items-center space-x-3 p-4 bg-white/10 border border-gray-600 rounded-lg">
          <Zap className="h-8 w-8 text-yellow-400" />
          <div>
            <h3 className="font-semibold text-white">Curated Resources</h3>
            <p className="text-sm text-gray-400">Best learning materials</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleQuickStart}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Generate My AI Roadmap
      </button>
    </div>
        ) : (
          <RoadmapGenerator  />
        )}
      </div>
    </div>
   </>
  )
}

export default HeroSection
