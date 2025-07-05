import { model, Schema } from 'mongoose';
import { INote } from './note.interface';

const NoteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const NoteModle = model<INote>('Notes', NoteSchema);

export default NoteModle;
