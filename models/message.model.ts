import { Schema, model } from "mongoose";

export interface IMessage {
  senderId: string;
  receiverId: string;
  conversationId: string;
  conversationType: string;
  clientMessageId: string;
  serverMessageId: string;
  content: string;
  contentType: string;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: true,
      trim: true,
    },
    receiverId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    conversationId: {
      type: String,
      required: true,
      trim: true,
    },
    conversationType: {
      type: String,
      required: true,
      trim: true,
    },
    clientMessageId: {
      type: String,
      required: true,
      trim: true,
    },
    serverMessageId: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    contentType: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model<IMessage>("User", messageSchema);

export default Message;
