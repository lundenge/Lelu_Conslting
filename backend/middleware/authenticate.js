const authenticate = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

module.exports = authenticate;
