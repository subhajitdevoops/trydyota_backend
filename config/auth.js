require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const Admin = require("../models/Admin");

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

// const isAuth = async (req, res, next) => {
//   const { authtoken } = req.headers;
//   try {
//     const token = authtoken.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.secretKey);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).send({
//       message: err.message,
//     });
//   }
// };

const isAuth = async (req, res, next) => {
  const { authtoken } = req.headers;
  
  console.log("authtoken:",authtoken);

  if (!authtoken ) {
    return res.status(401).send({
      message: "Authorization token is missing or invalid",
    });
  }

  try {
    const token = authtoken;
    const decoded = jwt.verify(token, secretKey);
    console.log("==================",decoded);
    req.user = decoded._id;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};



const isAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "Admin" });
  if (admin) {
    next();
  } else {
    res.status(401).send({
      message: "User is not Admin",
    });
  }
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
};
