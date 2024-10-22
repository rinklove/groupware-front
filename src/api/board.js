import { STATUS } from '../constants/errorCode';
import { get } from './instance';
import { ADMIN, MAIN_BOARD } from './url';

export const getCourseBoardMain = async () => {
    const res = await get(MAIN_BOARD);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data.result;
}

export const getCourseBoardForAdmin = async (data) => {
    const url = `${MAIN_BOARD}${ADMIN}?courseId=${data}`
    const res = await get(url);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data.result;
}