import { Logger } from '@nestjs/common';

import axios from 'axios';

interface JandiWebhookInfoProps {
  title: string;
  description: string;
}

interface JandiWebhookProps {
  url: string;
  body: string;
  color?: string;
  info?: JandiWebhookInfoProps[];
}

const webhook = async ({ url, color, body, info }: JandiWebhookProps) => {
  // if (process.env.NODE_ENV !== 'production') return;
  try {
    await axios.post(url, {
      body,
      connectColor: color || '#62C0B4',
      connectInfo: info,
    });
  } catch (e) {
    Logger.error(e);
    return;
  }
};
