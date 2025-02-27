import React from "react";

const FeatureCard = ({ icon, title, onClick }) => (
  <div
  className="flex flex-col items-center justify-center w-full h-full p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-center cursor-pointer"
  onClick={onClick}
  >
    <div className="flex items-center justify-center w-12 h-12 mb-2 bg-gray-100 rounded-full">
      <img src={icon} alt={title} className="w-6 h-6" />
    </div>
    <p className="text-sm text-gray-800 font-medium">{title}</p>
  </div>
);


export default FeatureCard;
