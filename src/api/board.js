import { get } from './instance';
import { MAIN_BOARD } from './url';

export const getCourseBoardMain = async () => {
    const res = await get(MAIN_BOARD);
    console.log(res);
    return res;
}