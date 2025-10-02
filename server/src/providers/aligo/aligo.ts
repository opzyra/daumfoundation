import { InternalServerErrorException } from '@nestjs/common';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://apis.aligo.in',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

interface SendParam {
  receiver: string;
  msg: string;
}

const send = async (param: SendParam) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const response = await instance.post('/send/', {
    ...param,
    key: process.env.ALIGO_KEY,
    user_id: process.env.ALIGO_USER_ID,
    sender: process.env.ALIGO_SENDER,
  });
  if (response.data.result_code <= 0) {
    throw new InternalServerErrorException(response.data.message);
  }
};

export default { send };
