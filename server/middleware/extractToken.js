import jwt from "jsonwebtoken";

const extractToken = async (req, res, next) => {
  //Get Cookie
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login Again" });
  }

  if (!req.body) req.body = {};

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //process the user id from the token in cookie
    if (decoded.id) {
      req.body.userId = decoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized. Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default extractToken;
