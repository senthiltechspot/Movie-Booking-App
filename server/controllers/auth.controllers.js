const bcrypt = require("bcrypt");
const e = require("express");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const notificationClient = require("../utils/NotificationClient");
const { userRegistration } = require("../scripts/emailScripts");
const passport = require("passport");
const { default: axios } = require("axios");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

exports.signup = async (req, res) => {
  var userStatus;

  if (!req.body.userType || req.body.userType == constants.userTypes.customer) {
    userStatus = constants.userStatus.approved;
  } else {
    userStatus = constants.userStatus.pending;
  }

  const userObject = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    userStatus: userStatus,
    userTypes: req.body.userType,
  };

  try {
    const user = await User.create(userObject);
    const { subject, html, text } = userRegistration(user);
    notificationClient.sendEmail([user.email], subject, html, text);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error:" + err.message });
  }
};

exports.signin = async (req, res) => {
  const { userId, password } = req.body;

  //verify whether the userId is correct or not

  const user = await User.findOne({ userId });

  if (!user) {
    res.status(400).send({ mesage: "UserId doesn't exists" });
    return;
  }

  if (user.userStatus !== constants.userStatus.approved) {
    res
      .status(403)
      .send({ message: "Only Approved users are allowed to login" });
    return;
  }

  var isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!isCorrectPassword) {
    res.status(401).send({ message: "Invalid Password" });
  }

  const token = jwt.sign({ id: user.userId }, config.secret, {
    expiresIn: 120000,
  });

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userTypes: user.userTypes,
    userStatus: user.userStatus,
    accessToken: token,
    _id: user._id,
  });
};

// Configure Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: `${process.env.REACT_APP_BACKEND_URL}/crm/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in your database using profile.id or profile.email
        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          const userInfoResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // Get the display name from the additional user information
          const displayName = userInfoResponse.data.name;

          // Create a new user if the user doesn't exist
          const randomUsername = `user${Math.random()
            .toString(36)
            .substring(7)}`;
          const randomPassword = Math.random().toString(36).substring(7);
          const userObject = {
            name: displayName,
            userId: randomUsername,
            email: profile.emails[0].value,
            password: bcrypt.hashSync(randomPassword, 8),
            userStatus: constants.userStatus.approved,
            userTypes: constants.userTypes.customer,
          };

          user = await User.create(userObject);
          const { subject, html, text } = userRegistration(user);
          const CreatedUser = {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userTypes,
            userStatus: user.userStatus,
            _id: user._id,
          };
          const token = jwt.sign(CreatedUser, config.secret, {
            expiresIn: 120000,
          });
          notificationClient.sendEmail([user.email], subject, html, text);
        }

        // Call the done() callback with the user object to signal successful authentication
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// User login with Google
exports.loginWithGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google authentication callback
exports.googleCallback = passport.authenticate("google", {
  session: false,
  failureRedirect: "/login", // Redirect to the login page if authentication fails
});

// Callback for successful Google authentication
exports.googleCallbackSuccess = async (req, res) => {
  try {
    const authorizationCode = req.query.code;

    const tokenResponse = await axios.post(
      "https://accounts.google.com/o/oauth2/token",
      {
        code: authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_SECRET_KEY,
        redirect_uri: `${process.env.REACT_APP_BACKEND_URL}/mba/api/v1/auth/google/callback`,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const idToken = tokenResponse.data.id_token;

    const userProfile = jwt.decode(idToken);
    let user = await User.findOne({ email: userProfile.email });
    if (!user) {
      // Fetch additional user information from the Google API
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Get the display name from the additional user information
      const displayName = userInfoResponse.data.name;
      const randomUsername = `user${Math.random().toString(36).substring(7)}`;
      const randomPassword = Math.random().toString(36).substring(7);

      // Create a new user if the user doesn't exist
      const newUserObject = {
        name: displayName,
        userId: randomUsername,
        email: userProfile.email,
        password: bcrypt.hashSync(randomPassword, 8),
        userStatus: constants.userStatus.approved,
        userTypes: constants.userTypes.customer,
      };

      const newUser = await User.create(newUserObject);
      const { subject, html, text } = userRegistration(newUser);
      const CreatedUser = {
        name: newUser.name,
        userId: newUser.userId,
        email: newUser.email,
        userTypes: newUser.userTypes,
        userStatus: newUser.userStatus,
        _id: newUser._id,
      };
      const token = jwt.sign(CreatedUser, config.secret, {
        expiresIn: 120000,
      });
      notificationClient.sendEmail([newUser.email], subject, html, text);
      res.redirect(
        `${process.env.REACT_APP_FRONTEND_URL}/login?token=${token}`
      );
    } else {
      // If the user exists, generate a new token and redirect to the desired frontend page
      const token = jwt.sign(
        {
          name: user.name,
          userId: user.userId,
          email: user.email,
          userTypes: user.userTypes,
          userStatus: user.userStatus,
          _id: user._id,
        },
        config.secret,
        {
          expiresIn: 120000,
        }
      );
      res.redirect(
        `${process.env.REACT_APP_FRONTEND_URL}/login?token=${token}`
      );
    }
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.REACT_APP_FRONTEND_URL}/login?error=true`);
  }
};

