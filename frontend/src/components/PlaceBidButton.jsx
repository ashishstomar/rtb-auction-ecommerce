import React from "react";
import { Link } from "react-router-dom";

const PlaceBidButton = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      {isAuthenticated() ? (
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Place Bid
        </button>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">
            You need to{" "}
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
              Sign In
            </Link>{" "}
            to place a bid.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceBidButton;
