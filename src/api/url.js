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

//attendance
export const ATTANDANCES = '/attendances'
export const ADMIN_ATTANDANCES = `${ADMIN}${ATTANDANCES}`
export const APPROVE = '/approve'
export const REJECT = 'reject'

export const CATEGORY = '/category'

//chat
export const CHANNEL = '/channel'

//course
export const COURSE = '/course'
export const COURSE_ADMIN = `${COURSE}${ADMIN}`
export const ALL_COURSE = `${COURSE_ADMIN}/all`
export const COURSE_USERS = `${COURSE}/users`

//group
export const TEAM = '/teams'
export const COURSE_TEAM = `${TEAM}${COURSE}`
export const MY_TEAM_INFO = `${TEAM}/my`

//board
export const BOARD = '/board'
export const MAIN_BOARD = `/main${BOARD}`;
export const COURSE_BOARD = `${COURSE}${BOARD}`;
export const PAGE = '/page';
const team = `/team`
export const TEAM_BOARD = `${team}${BOARD}`

//comments
export const COMMENTS = '/comments'

//team
export const ADMIN_WAITING = `${TEAM}${ADMIN}/waiting`
export const ADMIN_APPROVAL = `${TEAM}${ADMIN}/approval`
export const TEAM_MEMBERS = `${TEAM}/members`

//schedule
export const SCHEDULE = '/schedules'
export const COMMONS = '/commons'
export const TEAM_SCHEDLE = `${SCHEDULE}${TEAM}`
