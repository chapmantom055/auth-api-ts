import { Express, Response } from 'express';
import validateResource from './middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, reseetPasswordSchema, verifyUserSchema } from './schema/user.schema';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from './controller/user.controller';
import { createSessionSchema } from './schema/auth.schema';
import { createSessionHandler, refreshAccessTokenHandler } from './controller/auth.controller';
import requireUser from './middleware/requireUser';


function router(app: Express) {

    app.get("/healthcheck", (_, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    app.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler);

    app.post("/api/users/forgotpassword", validateResource(forgotPasswordSchema), forgotPasswordHandler);

    app.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(reseetPasswordSchema), resetPasswordHandler);

    app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

    app.get("/api/users/me", requireUser, getCurrentUserHandler)

    app.post("/api/sessions/refresh", refreshAccessTokenHandler)

};

export default router;

