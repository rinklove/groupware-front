import { STATUS } from '../constants/errorCode';
import { get } from './instance';
import { MAIN_BOARD } from './url';

export const getCourseBoardMain = async () => {
    const res = await get(MAIN_BOARD);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data;
}