const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
.then(hash => {
const user = new Users({
email: req.body.email,
password: hash
});
user.save()
.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
.catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));
};



exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,   
      { expiresIn: '24h' }
    );

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.log('Login error:', error); 
    res.status(500).json({ error: error.message });
  }
};
