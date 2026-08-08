import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      auth?: { id: number; role: UserRole };
    }
  }
}
import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      auth?: { id: number; role: UserRole };
    }
  }
}
