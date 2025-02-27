import React from "react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "text-green-600";
    case "sold":
      return "text-red-600";
    case "rented":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

const PropertyCard = ({ title, price, location, status, description }) => (
  <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-95 min-h-full flex flex-col">
    <img
      className="w-full h-48 object-cover"
      src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="property"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{formatPrice(price)}</h3>
      <p className={`text-sm font-bold ${getStatusColor(status)}`}>{status.toUpperCase()}</p>
      <p className="mt-2 text-gray-800 font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default PropertyCard;
