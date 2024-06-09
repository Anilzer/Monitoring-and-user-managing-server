import express from 'express';
import bcrypt from 'bcrypt';
import { body } from 'express-validator';
import { createUser, getUserFromDatabase } from '../../services/users/index.js';
import { generateJwt } from '../../services/shared/index.js';
import { isAuthenticated } from '../../../middlewares/isAuthenticated/index.js';

const router = express.Router();

//  nouvel utilisateur
router.post('/register',
  body('username')
    .isString().withMessage('Username must be a string')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
    .isStrongPassword().withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await createUser(username, password);

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: `Failed to create user: ${error.message}` });
    }
  }
);

router.post('/login',
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  async (req, res) => {
    

    const { username, password } = req.body;
    try {
      // Récupérer l'utilisateur de la base de données
      const user = await getUserFromDatabase(username);
      if (!user) {
        throw new Error('User not found');
      }
      // Vérifier le mot de passe
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        console.log(password, user.password)
        throw new Error('Invalid password');
      }
      // Générer le token JWT
      const tokenPayload = { userId: user.id, username: user.username };
      const jwtToken = await generateJwt(tokenPayload);

      // Envoyer le token dans un cookie HTTP Only
      res.cookie('token', jwtToken, { httpOnly: true });
      res.status(200).json({ message: 'Authentification successful', token: jwtToken });
    } catch (error) {
      res.status(401).json({ message: `Authentification failed: ${error.message}` });
    }
  }
);


// Route pour déconnecter un utilisateur
// détruire le token
// Supprimer le cookie
router.post('/logout', isAuthenticated, async (req, res) => {
    
  try {

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: `Failed to logout: ${error.message}` });
  }
});

export default router;
