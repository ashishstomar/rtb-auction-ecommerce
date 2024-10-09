const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { createUserToken } = require("../services/auth");

//Signin user
async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user[0]?.password))) {
      const { password, ...userData } = user[0].toObject(); // Exclude password field

      // Create a token
      const token = createUserToken({
        id: userData._id,
        email: userData.email,
      });
      res.json({
        user: userData,
        token: token,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    return res.json({
      error: "Incorrect Email or Password",
    });
  }
}

//signup user
async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    fullName,
    email,
    password: hashed_password,
  });

  return res.json({ status: "Successful" });
}

module.exports = { handleUserSignup, handleUserSignin };
