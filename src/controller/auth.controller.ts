import { Request, Response} from 'express';
import { CreateSessionInput } from '../schema/auth.schema';
import { findByEmail, findUserById } from '../service/user.service';
import { findSessionById, signAccessToken, signRefreshToken } from '../service/auth.service';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const { email, password } = req.body;
    const message = "Invalid Email or Password";
    const user = await findByEmail(email);

    

    if (!user) {
        return res.send(message);
    }
    if (!user.verified) {
        return res.send("Please verify your email");
    }

    const isValid = await user.validatePassword(password)

    if (!isValid) {
        return res.send(message);
    }

    // sign an access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    //@ts-ignore -- need to sort this 
    const refreshToken = await signRefreshToken({ userId: user._id });

    // send tokens

    return res.send({
        accessToken,
        refreshToken
    })
};

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, 'headers.x-refresh') as string;

    const decoded = verifyJwt<{ session: string }>(refreshToken, "refreshTokenPublicKey")
    
    const message = "Could not refresh access token"

    if (!decoded) {
        return res.status(401).send(message);
    }
    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
        return res.status(401).send(message);
    }
    const user = await findUserById(String(session.user));
    if (!user) {
        return res.status(401).send(message);
    }
    const accessToken = signAccessToken(user);

    return res.send({ accessToken });

}