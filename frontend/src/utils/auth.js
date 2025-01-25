import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem("auth_token");

    // Make an HTTP request with the bearer token (using GET method)
    const response = await axios.get("http://localhost:8080/api/bid/placeBid", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // if the server responds with a status code indicating success (e.g., 200)
    if (response.status === 200) {
      return true; // Token is valid
    } else {
      return false; // Token is invalid
    }
  } catch (error) {
    // Handling any errors
    console.error("Error verifying token:", error);
    return false; // Token verification failed
  }

  // const token = localStorage.getItem("auth_token");
  // return token ? true : false; // If there's a token, the user is authenticated
};
