import { verify_token } from "../helpers/jwt.js";
import { getSession, token_exists } from "../services/sessions.js";

export async function authentication(req, res, next) {
    
  let token = req.headers.authorization;
  token = token.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: true, info: "Auth token missing" });

  try {
    let { user_id, timestamp, type } = verify_token(token);

    let success = await token_exists(user_id, token);
    if (!success)
      return res.status(401).json({ error: true, info: "Token discontinued" });

    req.user = { user_id, timestamp, type };
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "JsonWebTokenError")
      return res
        .status(401)
        .json({ error: true, info: "Invalid authentication token" });

    if (err.name === "TokenExpiredError")
      return res.status(401).json({ error: true, info: "Token has expired" });
  }
}
