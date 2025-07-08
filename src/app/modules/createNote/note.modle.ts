/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Query, Schema } from 'mongoose';
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
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
NoteSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.where({ isDeleted: false });
  next();
});

const NoteModle = model<INote>('Notes', NoteSchema);

export default NoteModle;
