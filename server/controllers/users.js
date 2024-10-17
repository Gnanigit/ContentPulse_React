import User from "../models/User.js";
import Post from "../models/Post.js";
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

    const user = await User.findById(id);

    const friendIds = user.friends;

    // Find all users who are not in the user's friends list
    const notFriends = await User.find({
      _id: { $nin: [...friendIds, user._id] }, // Exclude friends and the current user
    });

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

    // Filter out empty values and email from being updated
    const filteredValues = Object.fromEntries(
      Object.entries(userValues).filter(
        ([key, value]) => value !== "" && key !== "email"
      )
    );

    // Update the user's details
    const user = await User.findByIdAndUpdate({ _id: id }, filteredValues, {
      new: true,
    }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare an object for updating the user's details in the posts
    const postUpdateFields = {};
    if (filteredValues.firstName) {
      postUpdateFields.firstName = filteredValues.firstName;
    }
    if (filteredValues.lastName) {
      postUpdateFields.lastName = filteredValues.lastName;
    }
    if (filteredValues.location) {
      postUpdateFields.location = filteredValues.location;
    }

    // Update the user's details in the posts collection if there are any changes
    if (Object.keys(postUpdateFields).length > 0) {
      await Post.updateMany({ userId: id }, postUpdateFields);
    }

    // Remove the password field from the user object
    delete user.password;

    // Generate a new token
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);

    // Send the updated user data and token in the response
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
  console.log("hello");
  try {
    const { id } = req.params;
    const picturePath = req.body.picture;
    console.log(picturePath);

    // Update the user's profile picture
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { picturePath },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the profile picture in all the user's posts
    await Post.updateMany({ userId: id }, { userPicturePath: picturePath });

    // Remove the password field from the user object
    delete user.password;

    // Generate a new token
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET);

    // Send the updated user data and token in the response
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove this user's ID from their friends' friends array
    for (let friendId of user.friends) {
      await User.findByIdAndUpdate(friendId, {
        $pull: { friends: id },
      });
    }
    await Post.deleteMany({ userId: id });
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user account", error });
  }
};
