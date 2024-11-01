//사용자
export const ADMIN = '/admin';
export const USERS = '/users';
export const ROLE = '/role';

//auth
export const USER = '/user'
export const LOGIN = '/login'
export const SIGNUP = '/user/sign-up'
export const LOGOUT = '/user/logout'
export const SEND_SIGNUP_FORM = '/email/admin'

//chat
export const CHANNEL = '/channel'

//course
export const COURSE = '/course'
export const COURSE_ADMIN = `${COURSE}${ADMIN}`
export const ALL_COURSE = `${COURSE_ADMIN}/all`
export const COURSE_USERS = `${COURSE}/users`

//group
const TEAM = '/teams'
export const COURSE_TEAM = `${TEAM}${COURSE}`
export const MY_TEAM_INFO = `${TEAM}/my`

//board
export const BOARD = '/board'
export const MAIN_BOARD = `/main${BOARD}`;
export const COURSE_BOARD = `${COURSE}${BOARD}`;
export const PAGE = '/page';

//comments
export const COMMENTS = '/comments'

//team
export const TEAMS = '/teams'