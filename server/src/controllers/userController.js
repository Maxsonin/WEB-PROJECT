import {
  getUserByIdDb,
  getUserByPhoneNumberDb,
  createUserDb,
  updateUserDb,
  deleteUserDb,
} from '../models/userModel.js';

import jwt from 'jsonwebtoken';

const createJwtToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '3h',
    }
  );
};

export const loginUser = async (req, res, next) => {
  const { phone_number } = req.body;
  try {
    const user = await getUserByPhoneNumberDb(phone_number);

    const token = createJwtToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });
    console.log(token);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, phone_number } = req.body;
  if (!name || !phone_number) {
    return res
      .status(400)
      .json({ message: 'Name and phone number are required' });
  }

  try {
    const newUser = await createUserDb(name, phone_number);

    const token = createJwtToken(newUser);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
    });
    console.log(token);

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserByIdDb(userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { user_id } = req.user;
  const { name, phone_number } = req.body;

  if (!user_id || !name || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedUser = await updateUserDb(user_id, name, phone_number);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { user_id } = req.user;
  try {
    const deletedUser = await deleteUserDb(user_id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
