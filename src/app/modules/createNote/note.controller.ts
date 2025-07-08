import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { NoteService } from './note.service';
import httpStatus from 'http-status';
const createNote = catchAsync(async (req, res) => {
  const result = await NoteService.createNoteIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'note created sucessfully',
    data: result,
  });
});

const getAllNote = catchAsync(async (req, res) => {
  const result = await NoteService.getAllNoteIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,
    message: 'retrive all note successfully',
    data: result,
  });
});

const getSingleNote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NoteService.getSingleNoteIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single note retrive successfully',
    data: result,
  });
});

const updateNote = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  const result = await NoteService.updateNoteInroDB(_id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'note updated successfully',
    data: result,
  });
});

const deletedNote = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await NoteService.deleteNoteIntoDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'note deleted sucessfully',
    data: result,
  });
});
export const createNoteController = {
  createNote,
  getAllNote,
  getSingleNote,
  updateNote,
  deletedNote,
};
