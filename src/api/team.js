import { COURSE_TEAM, MY_TEAM_INFO } from './url';
import { get, post } from './instance';
import { STATUS } from '../constants/errorCode';

export const getMyTeamInfo = () => {
    
}

export const getAllTeamByCourse = async (data) => {
  const url = `${COURSE_TEAM}/${data}`
  const res = await get(url);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data.result;
}