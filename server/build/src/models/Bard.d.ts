import { ObjectId } from "mongoose";
interface IBard {
    chat: {
        chatName: string | null | undefined;
        question: string | null | undefined;
        answer: string | null | undefined;
    }[];
    user: ObjectId;
}
declare const _default: import("mongoose").Model<IBard, {}, {}, {}, import("mongoose").Document<unknown, {}, IBard> & IBard & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default _default;
