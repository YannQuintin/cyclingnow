// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(403).send("Access Denied");
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // Log for debugging purposes
    // console.log("Authorization Header:", token);

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
      // Log the trimmed token
      // console.log("Trimmed Token:", token);
    }

    // Verify the token and log the result
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Payload:", verified);

    req.user = verified;
    next();
  } catch (err) {
    // Log the error for debugging
    // console.error("Token verification failed:", err.message);

    // Send a more descriptive error message to the client
    res.status(500).json({ error: "Failed to authenticate token. Please try again." });
  }
};