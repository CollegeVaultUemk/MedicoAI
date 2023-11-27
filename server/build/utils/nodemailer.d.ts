import { Transporter } from "nodemailer";
interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
declare const transporter: Transporter;
export default transporter;
export { MailOptions };
