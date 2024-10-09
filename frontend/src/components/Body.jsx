import React, { useState, useEffect } from "react";
import { FaGavel } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation

const Body = () => {
  const [highestBid, setHighestBid] = useState(500); // Initial highest bid
  const [bidAmount, setBidAmount] = useState(""); // User's bid
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds auction timer
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlaceBid = () => {
    // Check if user is signed in by checking if the token exists in localStorage
    const token = localStorage.getItem("auth_token");

    if (!token) {
      alert("Please sign in to place a bid.");
      navigate("/signin"); // Redirect to sign-in page if not authenticated
      return;
    } else {
      //// Place bid logic
      const bidValue = parseInt(bidAmount);
      if (bidValue > highestBid) {
        setHighestBid(bidValue);
        alert(`Your bid of $${bidValue} has been placed!`);
      } else {
        alert(
          `Your bid must be higher than the current highest bid of $${highestBid}.`
        );
      }
      setBidAmount(""); // Reset the bid input field
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          The Original Macintosh 128K (1984)
        </h2>

        {/* Product Image */}
        <div className="mb-4 fill">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg/1200px-Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg"
            alt="Product"
            className="rounded-md"
          />
        </div>

        {/* Current Highest Bid */}
        <div className="text-lg mb-2">
          <strong>Current Highest Bid:</strong> ${highestBid}
        </div>

        {/* Auction Timer */}
        <div className="text-lg mb-4">
          <strong>Auction Ends In:</strong> {formatTime(timeLeft)}
        </div>

        {/* Bid Input */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          />
        </div>

        {/* Place Bid Button */}
        <button
          onClick={handlePlaceBid}
          className="w-full bg-indigo-600 text-white py-2 rounded-md flex items-center justify-center"
        >
          <FaGavel className="mr-2" />
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default Body;
