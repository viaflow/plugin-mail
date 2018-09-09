import email from "emailjs";

export const Define = {
    name: 'Email',
    desc: 'Email plugin for viaflow by emailjs',
    fields: [
        {
            name: 'server',
            display: 'SMTP Server & Auth Information',
            required: true,
            type: Object,
        }, {
            name: 'subject',
            display: 'Email Subject',
            required: true,
            type: String,
        }, {
            name: 'text',
            display: 'Email Text Content',
            required: true,
            type: String,
        }, {
            name: 'from',
            display: 'From',
            required: true,
            type: String,
        }, {
            name: 'to',
            display: 'To',
            required: true,
            type: String,
        }
    ],
};

export const Execute = async (input) => {
    try {
        const server = email.server.connect(JSON.parse(input.data.server))
        const { subject, text, from, to } = input.data;
        const mail = {
            subject, text, from, to
        }

        const response = await server.send(mail);
        const rst = {
            code: true,
            data: response,
        };
        return rst;
    } catch (exp) {
        return {
            code: false,
            error: exp.message,
            data: {}
        }
    }
};