const {
  getAllUser,
  getUserByEmail,
  insertUser,
  updateUser,
  deleteUser,
} = require("../db/mysqlConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username , email , password);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    let encryptedPassword = await bcrypt.hash(password, 8);

    const userId = await insertUser(username, email, encryptedPassword);

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });

    res.status(201).json({ userId, token });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Email alread exists" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ error: "Invalid Email & Password" });
    }

    user.password = undefined;

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });

    res.status(200).json({ user, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutController = (req, res) => {
  try {
    res.clearCookie("token");

    // Check if the "Set-Cookie" header is present in the response
    if (!res.get("Set-Cookie")) {
      return res.status(200).json({ message: "Successfully Logout" });
    }

    // If the "Set-Cookie" header is present, the cookie was not cleared
    res.status(404).json({ error: "Not Found" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { registerController, loginController, logoutController };
