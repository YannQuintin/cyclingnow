import User from "../models/User.js";

//* READ USER */
// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch {
//     res.status(404).json({ message: err.message });
//   }
// };
//! TO BE UPDATED TO REMOVE CONSOLE LOGS
export const getUser = async (req, res) => {
  const { id } = req.params;
  // console.log(`Fetching user with ID: ${id}`); // Log the userId being requested
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error('Error in getUser:', err);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//* UPDATE USER */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friendID) => friendID !== friendId);
      friend.friends = friend.friends.filter((friendID) => friendID !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    // if (user.friends.includes(friendId)) {
    //   // this checks if a friendID is contained or not and if it is, then removes from both user and friend's friend lists
    //   user.friends = user.friends.filter((id) => id !== friendId);
    //   friend.friends = friend.friends.filter((id) => id !== id);
    // } else {
    //   // if the above is false, then the user and friend receive a new friend each
    //   user.friends.push(friendId);
    //   friend.friends.push(id);
    // } //this makes sure the lists are updated on both users
    // await user.save();
    // await friend.save(); 

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)) //
    );
    const formattedFriends = friends.map( // this formats the friends list to only include the following fields
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      } 
    ); // this returns the updated friend list
    res.status(200).json(formattedFriends); 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//* DELETE USER */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


