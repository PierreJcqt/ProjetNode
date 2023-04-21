const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
    req.flash('error', 'Les mots de passe ne correspondent pas !');
    return res.redirect('/register');
    }
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          req.flash('error', 'This user already exists !');
          res.redirect('/register');
        } else {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
              });
              user.save()
                .then(() => res.redirect('/dashboard'))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        }
      })
  .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    req.flash('error', 'Veuillez remplir tous les champs');
    return res.redirect('/login');
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
          }
          req.session.user = user;
          res.redirect('/dashboard'); // Redirection vers le dashboard
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
