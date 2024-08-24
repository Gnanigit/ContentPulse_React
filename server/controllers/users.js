import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
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

export const getUserNotFriends = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the current user by ID
    const user = await User.findById(id);

    // Get the list of friend IDs
    const friendIds = user.friends;

    // Find all users who are not in the user's friends list
    const notFriends = await User.find({
      _id: { $nin: [...friendIds, user._id] }, // Exclude friends and the current user
    });

    // Format the response
    const formattedNotFriends = notFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );

    // Send the response
    res.status(200).json(formattedNotFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

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

export const updateGeneralDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userValues = req.body;
    const filteredValues = Object.fromEntries(
      Object.entries(userValues).filter(
        ([key, value]) => value !== "" && key !== "email"
      )
    );
    const user = await User.findByIdAndUpdate({ _id: id }, filteredValues, {
      new: true,
    }).lean();
    delete user.password;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(500)
        .json({ field: "oldPassword", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(500)
        .json({ field: "oldPassword", message: "Incorrect old password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ field: "oldPassword", message: err.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const picturePath = req.body.picture;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { picturePath },
      {
        new: true,
      }
    ).lean();
    delete user.password;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
