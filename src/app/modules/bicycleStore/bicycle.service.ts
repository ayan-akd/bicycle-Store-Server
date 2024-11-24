import { TBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';

const createBicycleIntoDb = async (bicycleData: TBicycle) => {
  const result = await Bicycle.create(bicycleData);
  return result;
};

const getAllBicycles = async () => {
  const result = await Bicycle.find();
  return result;
};

const getAllBicyclesBySearchTerm = async (searchTerm: string) => {
  const result = await Bicycle.find({
    $or: [
      {
        name: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
      {
        brand: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
      {
        type: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    ],
  });
  return result;
};

const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};

const updateBicycle = async (id: string, bicycleData: TBicycle) => {
  // Use findOneAndUpdate to return the updated document
  const result = await Bicycle.findOneAndUpdate(
    { _id: id }, // Find the bicycle by its _id
    bicycleData, // Set the updated data
    { new: true }, // Return the updated document, and run validations
  );

  return result;
};

const deleteBicycleFromDB = async (id: string) => {
  const result = await Bicycle.deleteOne({ _id: id });
  return result;
};

export const BicycleServices = {
  createBicycleIntoDb,
  getAllBicycles,
  getSingleBicycle,
  deleteBicycleFromDB,
  updateBicycle,
  getAllBicyclesBySearchTerm,
};
