import User from "./model";

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

class UserRepository {

    async findById(userId: number): Promise<User | null> {
        return User.findByPk(userId);
    }

    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email: normalizeEmail(email)
            }
        });
    }

    async findByEmailForAuth(email: string): Promise<User | null> {
        return User.unscoped().findOne({
            where: {
                email: normalizeEmail(email)
            }
        });
    }

    async findAll(): Promise<User[]> {
        return User.findAll();
    }

    async create(data: {
        name: string;
        email: string;
        passwordHash: string;
        role: User["role"];
    }): Promise<User> {

        return User.create({
            ...data,
            email: normalizeEmail(data.email)
        });
    }

    async update(
        user: User,
        data: Partial<{
            name: string;
            email: string;
            role: User["role"];
            isActive: boolean;
        }>
    ): Promise<User> {

        const updateData = { ...data };

        if (updateData.email) {
            updateData.email = normalizeEmail(updateData.email);
        }

        return user.update(updateData);
    }
}

export default new UserRepository();
