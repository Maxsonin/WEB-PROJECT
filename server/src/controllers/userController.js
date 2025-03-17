import {
  getUserDb,
  createUserDb,
  updateUserDb,
  deleteUserDb,
} from '../models/userModel.js';

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserDb(userId);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res) => {
  const { name, phone_number } = req.body;
  if (!name || !phone_number) {
    return res
      .status(400)
      .json({ message: 'Name and phone number are required' });
  }

  try {
    const newUser = await createUserDb(name, phone_number);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, phone_number } = req.body;

  if (!userId || !name || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedUser = await updateUserDb(userId, name, phone_number);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await deleteUserDb(userId);
    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
