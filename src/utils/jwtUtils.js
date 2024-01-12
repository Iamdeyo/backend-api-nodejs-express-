import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '5m',
    },
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '1d',
    },
  );
  return token;
};

const verifyAccessToken = (token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return decodedUser;
};

const verifyRefreshToken = (token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  return decodedUser;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
