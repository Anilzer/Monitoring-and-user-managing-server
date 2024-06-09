import User from "../../../models/user/index.js";
import { hashPassword } from '../shared/index.js';

async function createUser(username, password) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User already exists');
    }
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);
    // Créer un nouvel utilisateur
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

async function getUserFromDatabase(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error('Database error: ' + error.message);
  }
}

export { createUser, getUserFromDatabase };

