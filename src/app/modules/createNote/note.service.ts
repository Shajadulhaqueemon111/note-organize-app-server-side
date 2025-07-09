/* eslint-disable @typescript-eslint/no-explicit-any */
import { INote } from './note.interface';
import NoteModle from './note.modle';

const createNoteIntoDB = async (payload: INote) => {
  const result = await NoteModle.create(payload);
  return result;
};

const getAllNoteIntoDB = async (filters: {
  search?: string;
  category?: string;
}) => {
  const { search, category } = filters;

  const query: any = {};

  if (search) {
    const regex = new RegExp(search, 'i'); // case-insensitive match
    query.$or = [
      { title: { $regex: regex } },
      { content: { $regex: regex } },
      { category: { $regex: regex } },
    ];
  }

  if (category) {
    query.category = { $regex: new RegExp(category, 'i') };
  }

  const result = await NoteModle.find(query).sort({ createdAt: -1 });

  return result;
};

const getSingleNoteIntoDB = async (_id: string) => {
  const result = await NoteModle.findById(_id);

  return result;
};

const updateNoteInroDB = async (_id: string, payload: Partial<INote>) => {
  const result = await NoteModle.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteNoteIntoDB = async (_id: string) => {
  const result = await NoteModle.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};
export const NoteService = {
  createNoteIntoDB,
  getAllNoteIntoDB,
  getSingleNoteIntoDB,
  updateNoteInroDB,
  deleteNoteIntoDB,
};
