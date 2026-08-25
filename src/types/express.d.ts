import { UserRole } from "../modules/user/model";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                role: UserRole;
            };
        }
    }
}

export {};
