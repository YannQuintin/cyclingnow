import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//* REGISTER USER */
//* Places to update the object and properties: 1. User Model / 2. Controllers / 3. */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const saverUser = await newUser.save();
        res.status(201).json(saverUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// //* LOGGING IN */
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             console.log('User does not exist');  // Log if the user does not exist
//             return res.status(400).json({ msg: "Uh-oh, User does not exist. Check your (booty), nah just your credentials and try again." });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Invalid credentials');  // Log if the credentials are invalid
//             return res.status(400).json({ msg: "Invalid Credentials." });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         delete user.password;
//         res.status(200).json({ token, user });

//     } catch (err) {
//         console.log(err);  // Log any errors
//         res.status(500).json({ error: err.message });
//     }
// };

//* LOGGING IN */
export const login = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body

    // Log the attempt with a timestamp and the email that is trying to log in
    console.log(`[${new Date().toISOString()}] Login attempt for email: ${email}`);

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log(`[${new Date().toISOString()}] Failed login - User not found: ${email}`);
            return res.status(400).json({ msg: "User does not exist. Check your credentials and try again." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`[${new Date().toISOString()}] Failed login - Invalid credentials for email: ${email}`);
            return res.status(400).json({ msg: "Invalid Credentials." });
        }

        // Log the successful login with a timestamp
        console.log(`[${new Date().toISOString()}] Successful login for email: ${email}`);

        // Create the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Assuming you have a method to clean the user object of sensitive data like passwords
        const userForResponse = sanitizeUser(user);

        // Send the response
        res.status(200).json({ token, user: userForResponse });

    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error during login for email: ${email}`, err);
        res.status(500).json({ error: "An error occurred during the login process." });
    }
};

// Helper function to sanitize user data before sending it to the client
function sanitizeUser(user) {
    const sanitizedUser = {...user._doc}; // Assuming user object comes from Mongoose and has _doc property
    delete sanitizedUser.password; // Remove password from the user object
    // Remove other sensitive fields if necessary
    return sanitizedUser;
}

