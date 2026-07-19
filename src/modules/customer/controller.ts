import { Request, Response } from "express";
import { asyncHandler } from "../../common/middleware/asyncHandler";
import customerService from "./service";
import {
    CreateCustomerDto,
    UpdateCustomerDto,
    CustomerFilterDto

} from "./interface";


class CustomerController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const customerData = req.body as CreateCustomerDto
    const customer = await customerService.createCustomer(customerData);

    res.status(201).json(customer);
  });

  getCustomers = asyncHandler(async (req: Request, res: Response) => {
    const filters = req.query as CustomerFilterDto;
    const customers = await customerService.geAllCustomers(filters);
    res
      .status(200)
      .json({ message: "Customers retrieved successfully", customers });
  });

  getCustomerByPhone = asyncHandler(async (req: Request, res: Response) => {
    const customer = await customerService.getCustomerByPhone(
      String(req.params.phone),
    );
    res
      .status(200)
      .json({ message: "Customer retrieved successfully", customer });
  });
  update = asyncHandler(async (req: Request, res: Response) => {
    const customerData = req.body as UpdateCustomerDto
    const customer = await customerService.updateCustomer(
      Number(req.params.id),
      customerData,
    );

    res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  });

  deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
    await customerService.deleteCustomer(Number(req.params.id));
    res.status(200).json({ message: "Customer deleted successfully" });
  });

  getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    
    const customer = await customerService.getCustomerById(
      Number(req.params.id),
    );
    res
      .status(200)
      .json({ message: "Customer Retrieved successfully", customer });
  });
}

export default new CustomerController();
