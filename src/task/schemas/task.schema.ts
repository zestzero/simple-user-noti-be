import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '@src/user/schemas/user.schema';

export type TaskDocument = Task & mongoose.Document;

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop([String])
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assignees: User[];

    @Prop({ default: false })
    completed: boolean;

    @Prop({ default: new Date() })
    createWhen: Date;

    @Prop({ default: new Date() })
    lastModifiedWhen: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
