import axios from 'axios';
import * as process from 'node:process';

export interface KakaoUserDto {
  id: number;
  connected_at: string;
  synched_at: string;
  kakao_account: {
    name_needs_agreement: boolean;
    name?: string;
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email?: string;
    phone_number?: string;
  };
  terms: KakaoUserTermDto[];
}

export interface KakaoUserTermDto {
  tag: string;
  required: boolean;
  agreed: boolean;
  revocable: boolean;
  agreed_at: string;
  agreed_by: string;
}

const auth = async (code: string, redirect: string): Promise<KakaoUserDto> => {
  const tokenResponse = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    null,
    {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.OAUTH_KAKAO_CLIENT_ID,
        client_secret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
        redirect_uri: redirect,
        code,
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );

  const token = tokenResponse.data.access_token;

  const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const termsResponse = await axios.get(
    'https://kapi.kakao.com/v2/user/service_terms',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { ...userResponse.data, terms: termsResponse.data.service_terms };
};

export default {
  auth,
};
