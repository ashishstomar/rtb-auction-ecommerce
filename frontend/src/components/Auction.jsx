import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Navigate } from "react-router-dom";

const socket = io("http://localhost:8080"); // Backend URL

const Auction = () => {
  const [highestBid, setHighestBid] = useState(500);
  const [currentBidder, setCurrentBidder] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [auctionActive, setAuctionActive] = useState(true);
  const [buyNowVisible, setBuyNowVisible] = useState(false);
  const [purchaseTimeLeft, setPurchaseTimeLeft] = useState(null);
  const [user, setUser] = useState("user"); // Example user
  useEffect(() => {
    socket.on("auctionState", (data) => {
      console.log(data);
      setHighestBid(data.highestBid);
      setCurrentBidder(data.currentBidder);
      setAuctionActive(data.auctionActive);
      setBuyNowVisible(data.buyNowAvailable);
    });

    socket.on("newBid", (data) => {
      setHighestBid(data.highestBid);
      setCurrentBidder(data.currentBidder);
      setTimeLeft(30);
    });

    socket.on("timerUpdate", (data) => {
      setTimeLeft(data.countdown);
    });

    // Listen for toast event from the server
    socket.on("showToast", (message) => {
      toast.success(message);
    });

    socket.on("purchaseTimeExpired", (data) => {
      setBuyNowVisible(false);
    });

    socket.on("purchaseTimerUpdate", (data) => {
      setPurchaseTimeLeft(data.countdown);
    });

    socket.on("auctionEnded", (data) => {
      setAuctionActive(false);
      if (data.currentBidder === user) {
        setBuyNowVisible(true); // Only visible to the highest bidder
      } else {
        setBuyNowVisible(false); // Hide for others
      }
    });

    return () => {
      socket.off("auctionState");
      socket.off("newBid");
      socket.off("timerUpdate");
      socket.off("auctionEnded");
      socket.off("showToast");
      socket.off("purchaseTimeExpired");
      socket.off("purchaseTimerUpdate");
    };
  }, [user]);

  const handlePlaceBid = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert("You need to sign in to place a bid!");
        Navigate("/signin"); // Redirect to signin if not authenticated
        return;
      }

      // Make an HTTP request with the bearer token (using GET method)
      const response = await axios.post(
        "http://localhost:8080/api/bid/placeBid",
        {
          // Include any data you want to send in the body of the request
          // For example:
          bidAmount: bidAmount,
          auctionItemId: "12345",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful response
      console.log("Response:", response.data.message);
      alert(response.data.message); // Display success message

      const bidValue = parseInt(bidAmount);

      if (auctionActive && bidValue >= highestBid + 5) {
        socket.emit("placeBid", { bidAmount: bidValue, user });
        setBidAmount("");
      } else {
        alert(`Your bid must be higher than $${highestBid + 5}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert("Error placing bid:", error.response.data.message); // Display error message
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleBuyNow = () => {
    alert("Congratulations! You've bought the product!");
    setBuyNowVisible(false);
  };

  return (
    <div className=" p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Product Auction</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <main className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Product Image */}
        <div className="mb-4 bg-cover">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg/1200px-Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg"
            alt="Product"
            className="rounded-md w-60 md:w-96"
          />
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">
            The Original Macintosh 128K (1984)
          </h2>

          <p className="text-xl font-semibold mb-2">
            Current Highest Bid: ${highestBid}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Current Bidder: {currentBidder || "None"}
          </p>
          <p className="text-lg font-semibold mb-6">Time Left: {timeLeft}s</p>

          {auctionActive ? (
            <div>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <button
                onClick={handlePlaceBid}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-200"
              >
                Place Bid
              </button>
            </div>
          ) : buyNowVisible ? (
            <div>
              <p className="text-green-500 mb-4">You are the winner!</p>
              <button
                onClick={handleBuyNow}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition duration-200"
              >
                Buy Now
              </button>
              <p className="text-red-500">
                Time left to purchase: {Math.floor(purchaseTimeLeft / 60)}:{" "}
                {String(purchaseTimeLeft % 60).padStart(2, "0")}
              </p>
            </div>
          ) : (
            <p className="text-red-500 text-center mt-4">Auction has ended.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Auction;
