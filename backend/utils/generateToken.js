import jwt from 'jsonwebtoken'

const generateToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      rol: usuario.rol,
      email: usuario.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export default generateToken