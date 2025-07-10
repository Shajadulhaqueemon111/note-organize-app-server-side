import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { sendImageToCloudinary } from '../utils/sendToImageCloudinary';
import { NoteService } from './note.service';
import httpStatus from 'http-status';
const createNote = catchAsync(async (req, res) => {
  let cloudinaryImageUrl = '';

  if (req.file && req.file.path) {
    const imageName = `note-${Date.now()}`;
    const cloudinaryRes = await sendImageToCloudinary(req.file.path, imageName);
    cloudinaryImageUrl = cloudinaryRes.secure_url;
  }

  const payload = {
    ...req.body,
    image: cloudinaryImageUrl,
    isArchived: false,
    isDeleted: false,
  };
  const result = await NoteService.createNoteIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'note created sucessfully',
    data: result,
  });
});

const getAllNote = catchAsync(async (req, res) => {
  const filters = {
    search: req.query.search as string,
    category: req.query.category as string,
  };
  const result = await NoteService.getAllNoteIntoDB(filters);

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
  const {
    title,
    category,
    content,
    createdAt,
    isArchived,
    isDeleted,
    existingImage,
  } = req.body;

  let imageUrl = existingImage;

  if (req.file && req.file.path) {
    const cloudinaryRes = await sendImageToCloudinary(
      req.file.path,
      `note-${Date.now()}`,
    );
    imageUrl = cloudinaryRes.secure_url;
  }

  const payload = {
    title,
    category,
    content,
    createdAt,
    isArchived: isArchived === 'true',
    isDeleted: isDeleted === 'true',
    image: imageUrl,
  };

  const result = await NoteService.updateNoteInroDB(_id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Note updated successfully',
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
