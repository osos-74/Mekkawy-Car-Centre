import bcrypt from "bcrypt";

import userRepository from "./repository";
import User from "./model";

import {
    CreateUserDTO,
    UpdateUserDTO,
    UserResponseDTO
} from "./dto";

import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";

class UserService {

    async createUser(
        data: CreateUserDTO
    ): Promise<UserResponseDTO> {

        const existingUser =
            await userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError(
                "Email is already registered"
            );
        }

        const passwordHash =
            await bcrypt.hash(data.password, 12);

        const user = await userRepository.create({
            name: data.name,
            email: data.email,
            passwordHash,
            role: data.role
        });

        return this.toResponse(user);
    }

    async getUserById(
        userId: number
    ): Promise<UserResponseDTO> {

        const user =
            await userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return this.toResponse(user);
    }

    async getAllUsers(): Promise<UserResponseDTO[]> {

        const users =
            await userRepository.findAll();

        return users.map(user =>
            this.toResponse(user)
        );
    }

    async updateUser(
        userId: number,
        data: UpdateUserDTO
    ): Promise<UserResponseDTO> {

        const user =
            await userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (data.email) {

            const existing =
                await userRepository.findByEmail(data.email);

            if (
                existing &&
                existing.userId !== userId
            ) {
                throw new ConflictError(
                    "Email is already registered"
                );
            }
        }

        const updatedUser =
            await userRepository.update(user, data);

        return this.toResponse(updatedUser);
    }

    private toResponse(user: User): UserResponseDTO {

        return {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        };
    }
}

export default new UserService();