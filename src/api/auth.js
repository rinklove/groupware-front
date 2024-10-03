import { LOGIN,SIGNUP } from './url';
import { post } from './instance';

export const login = async (data) => {
    const res = await post(LOGIN, JSON.stringify(data));
    console.log(res);
    return res;
}

export const signup = async (data) => {
    const res = await post(SIGNUP, JSON.stringify(data));
    return res;
}