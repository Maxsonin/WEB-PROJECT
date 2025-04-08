import jwt from 'jsonwebtoken';

const cookieJwtAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res
      .status(401)
      .json({ status: false, message: 'Invalid or expired token' });
  }
};

export default cookieJwtAuth;
