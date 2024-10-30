export declare const GenerateMessage: (question: string | null | undefined, prevChats: {
    question: string | null | undefined;
    answer: string | null | undefined;
}[]) => Promise<string>;
export default GenerateMessage;
