import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

@Schema({
  collection: 'uploads',
})
export class Upload {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  content: string;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  @Prop([
    {
      fileKey: String,
      originalName: String,
      size: Number,
      fileUrl: String,
    },
  ])
  files: {
    fileKey: string;
    originalName: string;
    size: number;
    fileUrl: string;
  }[];

  @Prop({
    default: false,
  })
  isFavorite: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({
    default: false,
  })
  isUpdated: boolean;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
