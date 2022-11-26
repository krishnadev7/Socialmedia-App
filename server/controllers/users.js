import { User } from '../models/UserModel.js';

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );
    const formatedFriends = friends.map(
      ({
        _id,
        firstname,
        lastname,
        email,
        location,
        occupation,
        picturePath,
      }) => {
        return {
          _id,
          firstname,
          lastname,
          email,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

/* if the users friends model includes freindId
       then will remove from the users list
       also from the friends list
   if it doesn't includes then will need to push to the 
   both lists
*/
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(id => id !== friendId);
      friend.friends = friend.friends.filter(id => id !== id);
    }else{
        user.friends.push(friendId);
        friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const formatedFriends = friends.map(
      ({
        _id,
        firstname,
        lastname,
        email,
        location,
        occupation,
        picturePath,
      }) => {
        return {
          _id,
          firstname,
          lastname,
          email,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
