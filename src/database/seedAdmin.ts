import bcrypt from "bcrypt";

import User, { UserRole } from "../modules/user/model";

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

export async function seedAdminIfNeeded(): Promise<void> {
    const userCount = await User.unscoped().count();

    if (userCount > 0) {
        return;
    }

    const email = process.env.BOOTSTRAP_ADMIN_EMAIL;
    const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
    const name = process.env.BOOTSTRAP_ADMIN_NAME ?? "Admin";

    if (!email || !password) {
        console.warn(
            "No users found. Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD to create an initial admin."
        );
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
        name,
        email: normalizeEmail(email),
        passwordHash,
        role: UserRole.ADMIN
    });

    console.log("Initial admin user created");
}
