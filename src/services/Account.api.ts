import request from '@/utils/request';

export async function login(params: object) {
  return request('/api/account/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
