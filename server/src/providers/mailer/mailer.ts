import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import fs from 'fs';
import hbs from 'handlebars';
import helpers from 'handlebars-helpers';
import path from 'path';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const sesSendEmail = async (to: string, subject: string, html: string) => {
  const params = {
    Source: 'no-reply@pagex.kr',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: { Data: html },
      },
    },
  };

  const command = new SendEmailCommand(params);
  await sesClient.send(command);
};

interface SendProps {
  template: 'auth-email';
  subject: string;
  email?: string;
  params?: any;
}

const send = async (props: SendProps) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const source = fs.readFileSync(
    path.join(__dirname, `./${props.template}.html`),
    'utf8',
  );
  hbs.registerHelper(helpers());
  const html = hbs.compile(source);

  await sesSendEmail(
    props.email || process.env.AWS_SES_EMAIL,
    props.subject,
    html(props.params, {}),
  );
};

export default {
  send,
};
