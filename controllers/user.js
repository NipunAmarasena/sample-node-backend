const db = require('../util/database');
const jwt = require('jsonwebtoken');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content }
  });
};

exports.authenticateUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  
  console.log('username '+username + 'password' + password);
  let obj = {};
  let apiStatus = 201;

  db.execute('select * from users where username = ? and password = ?', [username, password])
  .then(([data]) => {
    console.log(data[0].username);
    obj = data[0];

    const token = jwt.sign({
      username: data[0].username,
      password: data[0].password
    }, 
    'secret',
    { expiresIn: '1h' });

    res.status(200).json({
      message: "success",
      token: token,
      userid: obj.userid
    })
  })
  .catch((e) => {
    res.status(400).json({
      message: "failed",
      error: e
    })
  });
}




exports.sample = (req, res, next  )=> {
      
  db.execute('select * from users')
  .then(([data]) => {
    console.log(data[0].username);
    obj = data[0];
    const token = jwt.sign({
      username: data[0].username,
      password: data[0].password
    }, 
    'secret',
    { expiresIn: '1h' });

    res.status(200).json({
      message: "success",
      // token: token,
      // userid: obj.userid
      data: data
    })
  })
  .catch((error) => {
   
  });
  }