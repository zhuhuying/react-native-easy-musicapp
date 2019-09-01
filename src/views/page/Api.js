const BASE_URL='ip';

const BASE_GET = BASE_URL + ':5000';

const BASE_POST = BASE_URL + ':4000';

export const GET_SONGLIST = BASE_GET + '/search?keywords=';

export const GET_SONGURL = BASE_GET + '/song/url?id=' ;

export const GET_SONGLYR = BASE_GET + '/lyric?id=';

export const GET_SONGMV = BASE_GET + '/mv/url?id=';

export const GET_SONGDETAAIL = BASE_GET + '/song/detail?ids=';

export const POST_LOGIN = BASE_POST + '/user/login';

export const POST_REGISTER = BASE_POST + '/user/register';

export const POST_COLLECT = BASE_POST + '/song/collect';

export const POST_USER = BASE_POST + '/user/username';

export const POST_LIST = BASE_POST + '/song/collectlist';