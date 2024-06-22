import { NextFunction, Request, Response, Router } from "express";
import { handleRegistrationDataSchema } from "src/model/auth";
import * as auth from "src/service/auth";

const ROUTE_PATH = "/auth";

const router = Router();

router.post(ROUTE_PATH, async (req: Request, res: Response) => {
  const result = handleRegistrationDataSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }

  const { email, password } = result.data;

  try {
    const data = await auth.handleRegistration({ email, password });

    if (!data.success) {
      throw new Error(data.error);
    }

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: error || "Internal server error",
    });
  }
});

router.get(ROUTE_PATH, (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({});
  } catch (error) {
    next(error);
  }
});

export { router as authController };
