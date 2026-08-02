import Employee from "./model";
import { Op } from "sequelize";

import {
    CreateEmployeeDto,
    UpdateEmployeeDto,
    EmployeeFilterDto,
} from "./interface";

class EmployeeRepository {

    async create(data: CreateEmployeeDto) {
        return Employee.create(data);
    }

    async findById(employeeId: number) {
        return Employee.findByPk(employeeId);
    }

    async findByPhone(phoneNumber: string) {
        return Employee.findOne({
            where: {
                phoneNumber,
            },
        });
    }

    async findByEmployeeNumber(employeeNumber: string) {
        return Employee.findOne({
            where: {
                employeeNumber,
            },
        });
    }

    async getAllEmployees(filters: EmployeeFilterDto) {

        const where: any = {};

        if (filters.search) {

            where[Op.or] = [

                {
                    firstName: {
                        [Op.like]: `%${filters.search}%`,
                    },
                },

                {
                    lastName: {
                        [Op.like]: `%${filters.search}%`,
                    },
                },

                {
                    phoneNumber: {
                        [Op.like]: `%${filters.search}%`,
                    },
                },

                {
                    email: {
                        [Op.like]: `%${filters.search}%`,
                    },
                },
            ];
        }

        if (filters.role) {
            where.role = filters.role;
        }

        if (filters.status) {
            where.status = filters.status;
        }

        return Employee.findAll({ where });
    }

    async update(
        employeeId: number,
        data: UpdateEmployeeDto
    ) {

        const employee = await this.findById(employeeId);

        if (!employee) {
            return null;
        }

        await employee.update(data);

        return employee;
    }

    async delete(employeeId: number) {

        const employee = await this.findById(employeeId);

        if (!employee) {
            return false;
        }

        await employee.destroy();

        return true;
    }

}

export default new EmployeeRepository();