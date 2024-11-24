/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
import { bicycleValidationSchema } from './bicycle.validation';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycle: bicycleData } = req.body;
    const zodParseData = bicycleValidationSchema.parse(bicycleData);
    const result = await BicycleServices.createBicycleIntoDb(zodParseData);
    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };

    if (err.stack) {
      errorResponse.stack = err.stack;
    }

    res.status(500).json(errorResponse);
  }
};

const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = searchTerm
      ? await BicycleServices.getAllBicyclesBySearchTerm(searchTerm)
      : await BicycleServices.getAllBicycles();
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }

    res.status(500).json(errorResponse);
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.getSingleBicycle(productId);
    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
  }
};

const updateBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { bicycle: bicycleData } = req.body;
    const result = await BicycleServices.updateBicycle(productId, bicycleData);
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
  }
};

const deleteBicycleFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await BicycleServices.deleteBicycleFromDB(productId);
    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (err: any) {
    const errorResponse: any = {
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        issues: err.issues || [],
        name: err.name || 'Error',
      },
    };
    if (err.stack) {
      errorResponse.stack = err.stack;
    }
  }
};

export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateBicycle,
  deleteBicycleFromDB,
};
