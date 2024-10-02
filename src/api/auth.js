import { LOGIN,SIGNUP } from './url';
import { post } from './instance';

export const login = async (data) => {
    const res = await post(LOGIN, data);
    return res;
}

export const signup = async (data) => {
    const res = await post(SIGNUP, data);
    return res;
}