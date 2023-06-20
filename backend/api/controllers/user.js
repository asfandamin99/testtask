// Controller files imports services from the services section which handles the DB queries

import "dotenv/config";
import Joi from "joi";

import {
  findUserByContact,
  findUserByID,
  registerUser,
} from "../services/user.js";

import { decrypt, encrypt } from "../helpers/crypto.js";
import { sign_token } from "../helpers/jwt.js";
import {
  addSession,
  getSession,
  removeAllSessions,
  removeSession,
} from "../services/sessions.js";
import sgMail from "@sendgrid/mail";
import { ObjectId } from "mongodb";


//   USER REGISTRATION *****************************************
export let register_User = async (req, res, next) => {
  //Validation
  let validation_schema = Joi.object({
    contact: Joi.string()
      .required()
      .pattern(new RegExp(/^\+[1-9]{1}[0-9]{10,12}$/))
      .messages({
        "string.pattern.base":
          "Please enter mobile number in international standard format e.g. +9641234567890",
      }),
    name: Joi.string().required(),
    email: Joi.string()
      .optional()
      .pattern(new RegExp("[a-z0-9\\.]+@[a-z]+\\.[a-z]{2,3}"))
      .messages({
        "string.pattern.base": "Invalid email format",
      }),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }

  try {
    let user = await findUserByContact(req.body.contact);


    if (user && user.password) {
      return res
        .status(409)
        .json({ error: true, info: "User already registered" });
    }

    let pin = Math.floor(1000 + Math.random() * 9000).toString();
    let user_registered = await registerUser({
      password: encrypt(pin),
      contact: req.body.contact,
      name: req.body.name,
      email: req.body.email,
      created_at: Date.now(),
    });

    sgMail.setApiKey(process.env.API_KEY);
    const rec_email = req.body.email.toString()
    
    const msg = {
      to: rec_email, // Change to your recipient
      from: "tasktest89@gmail.com", // Change to your verified sender
      subject: "Password From Asfands Project",
      text: `password:${pin} `,
      html: `Dear User Welcome! Your Password is : <strong>${pin}</strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        return res.json({ error: false, info: "User Registered" });
      })
      .catch((error) => {
        console.error(error);
        return res.json({ error: true, info: error });
      });
  } catch (err) {
    console.error(err);
    return res.json({ error: true, info: err });
  }
};

// User Login ******************************************

export let User_login = async (req, res, next) => {
  let validation_schema = Joi.object({
    contact: Joi.string()
      .required()
      .pattern(new RegExp(/^\+[1-9]{1}[0-9]{10,12}$/))
      .messages({
        "string.pattern.base":
          "Please enter mobile number in international standard format e.g. +9641234567890",
      }),
    password: Joi.string().required(),
  });

  let { error, value } = validation_schema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ error: true, info: error.message });
  }

  try {
    let user = await findUserByContact(req.body.contact);

    if (!user) {
      return res.status(403).json({ error: true, info: "Invalid Credentials" });
    }

    if (decrypt(user.password) !== req.body.password)
      return res.status(403).json({ error: true, info: "Invalid Credentials" });

    let session = await getSession(user._id);
    if (session)
      return res.json({
        error: true,
        info: "You are already logged in",
        token: session.token,
      });

    await removeAllSessions(user._id);

    let jwt_token = sign_token({
      user_id: user._id,
      timestamp: Date.now(),
    });

    await addSession({
      user_id: user._id,
      token: jwt_token,
    });

    return res.json({
      error: false,
      info: "Successfully Logged in",
      token: jwt_token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, info: err });
  }
};

// User LOGOUT ***********************************************

export let logout = async (req, res, next) => {
  
  try {
    let { matchedCount } = await removeSession(req.user.user_id);
    if (matchedCount === 0) {
      return res
        .status(400)
        .json({ error: true, info: "You are not logged in" });
    }

    return res.json({ error: false, info: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, info: "Could not logout" });
  }
};
