import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json("Unauthorized Access!");

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = user;
    next();
      
  } catch (error) {
    return res.status(403).json("Invalid or Expired Token!");
  }
};

export { verifyJWT };
