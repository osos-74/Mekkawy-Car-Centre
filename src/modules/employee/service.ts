import employeeRepository from "./repository";

import {
    CreateEmployeeDto,
    UpdateEmployeeDto,
    EmployeeFilterDto,
} from "./interface";

import { ConflictError } from "../../common/errors/ConflictError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { BadRequestError } from "../../common/errors/BadRequestError";


class EmployeeService {

    async createEmployee(data: CreateEmployeeDto) {

        const existingPhone = await employeeRepository.findByPhone(
            data.phoneNumber
        );

        if (existingPhone) {
            throw new BadRequestError(
                "Employee phone number already exists."
            );
        }

        const existingEmployeeNumber =
            await employeeRepository.findByEmployeeNumber(
                data.employeeNumber
            );

        if (existingEmployeeNumber) {
            throw new BadRequestError(
                "Employee number already exists."
            );
        }

        return employeeRepository.create(data);
    }

    async getEmployeeById(employeeId: number) {

        const employee =
            await employeeRepository.findById(employeeId);

        if (!employee) {
            throw new NotFoundError("Employee not found.");
        }

        return employee;
    }

    async getAllEmployees(filters: EmployeeFilterDto) {
        return employeeRepository.getAllEmployees(filters);
    }

    async updateEmployee(
        employeeId: number,
        data: UpdateEmployeeDto
    ) {

        const employee =
            await employeeRepository.findById(employeeId);

        if (!employee) {
            throw new NotFoundError("Employee not found.");
        }

        if (
            data.phoneNumber &&
            data.phoneNumber !== employee.phoneNumber
        ) {

            const phoneExists =
                await employeeRepository.findByPhone(
                    data.phoneNumber
                );

            if (phoneExists) {
                throw new BadRequestError(
                    "Phone number already exists."
                );
            }
        }

        return employeeRepository.update(
            employeeId,
            data
        );
    }

    async deleteEmployee(employeeId: number) {

        const deleted =
            await employeeRepository.delete(employeeId);

        if (!deleted) {
            throw new NotFoundError("Employee not found.");
        }

        return;
    }

}

export default new EmployeeService();