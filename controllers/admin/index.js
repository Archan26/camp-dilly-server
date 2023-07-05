const { randomBytes, pbkdf2Sync } = require('crypto');
const { Admin } = require('../../model/index.js');
// const { secretKey } = require('../../utils/middleware.js')
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, password } = req.body;

  const salt = randomBytes(16).toString('hex');
  const passwordHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  const newUser = new Admin({
    username,
    password: passwordHash,
    salt,
  });

  newUser.save().then(() => {
    res.status(200).send('User registered successfully');
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  })
}

exports.login = (req, res) => {
  const { username, password } = req.body;
  // console.log('password :>> ', password)
  Admin.findOne({ username }).then((user) => {
    if (!user) {
      res.status(401).send('Invalid username');
      return;
    }
    // console.log('user :>> ', user)
    const passwordHash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (passwordHash === user.password) {
      const token = jwt.sign({ userId: user._id, username: user.username }, "campdilly", { expiresIn: '1h' });
      res.status(200).send({ token, msg: 'Login successful' });
    } else {
      res.status(401).send({ msg: 'Invalid email-id and password' });
    }
  })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};