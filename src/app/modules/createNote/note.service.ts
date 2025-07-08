import { INote } from './note.interface';
import NoteModle from './note.modle';

const createNoteIntoDB = async (payload: INote) => {
  const result = await NoteModle.create(payload);
  return result;
};

const getAllNoteIntoDB = async () => {
  const result = await NoteModle.find();
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
