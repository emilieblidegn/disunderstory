// middleware/auth.js

// tjekker bruger i cookie 
function auth(req, res, next) {
    if (!req.cookies.user) {
      return res.redirect('/login');
    }
    next();
  }
  
  module.exports = auth;