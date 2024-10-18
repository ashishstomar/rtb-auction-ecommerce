const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { createUserToken } = require("../services/auth");
const { validateToken } = require("../services/auth");

//Signin user
async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (await bcrypt.compare(password, user[0]?.password)) {
      const userData = user[0].toObject();
      // Create a token
      const token = createUserToken(userData);
      return res.status(200).json({
        user: userData,
        token: token,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//signup user
async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({
      fullName,
      email,
      password: hashed_password,
    });

    return res.status(201).json({ status: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleAuth(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const userPayload = await validateToken(token);

    if (userPayload) {
      return res.status(200).json({ message: "authorized: Token verified" });
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = { handleUserSignup, handleUserSignin, handleAuth };
