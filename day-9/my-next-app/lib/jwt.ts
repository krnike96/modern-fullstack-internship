
import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.SECRET_KEY || "asdauhiuiuw234988s8@#@#@fse";

export function createToken(userId: number, userName: string, userEmail: string) {

  return jwt.sign(
    {userId, userName, userEmail},
    secret,
    {expiresIn: "1 hr"}
  )
}

export function verifyToken(token: string){
    return jwt.verify(token, secret);
}
