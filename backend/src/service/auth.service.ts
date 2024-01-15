import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as auth from "../middleware/auth";
import { IUser, IUserDocument, User } from "../model/users.model";

dotenv.config();
const saltRound = process.env.SALT_ROUND;
const bcryptPassword = process.env.BCRYPT_PASSWORD;
console.log("Token bcrypt:", bcryptPassword, saltRound);

if (!saltRound || !bcryptPassword) {
  throw new Error("Salt round or bcrypt password not configured");
}

export const signUP = async (user: IUser): Promise<IUserDocument> => {
  const isUserExist = await User.findOne({ email: user.email });
  if (isUserExist) throw new Error("Email Already Registered");

  try {
    let password = user.password;
    const salt = await bcrypt.genSalt(parseInt(saltRound));

    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
      password: hash,
    });

    const token = auth.assignAccessToken(newUser.toJSON());
    newUser.token = token;
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Could not Signup user ${error}`);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = auth.assignAccessToken(user);
      user.token = token;
      await user.save();

      return user as IUserDocument;
    }
    return null;
  } catch (error) {
    throw new Error(`SignIn Failed ${error}`);
  }
};
