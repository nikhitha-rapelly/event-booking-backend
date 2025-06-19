const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/usermodel');

const UserController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    UserModel.register(name, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User registered successfully' });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    UserModel.login(email, async (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ message: 'Invalid email' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, 'secret_key', { expiresIn: '1d' });

      res.json({ token, user: { id: user.id, name: user.name, is_admin: user.is_admin } });
    });
  }
};

module.exports = UserController;
