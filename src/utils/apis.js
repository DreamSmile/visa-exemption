import { $get, $post } from './https'
let nowEnviroment = process.env.NODE_ENV;
let getUser;
getUser = nowEnviroment == "development" ? "/getUser;" : "http://webt.lilang.com:8901/svr-loadorder/wxFans/"

let wxApi;
wxApi = nowEnviroment == "development" ? "/wxAuto" : "http://tm.lilanz.com/oa/api/WxAuthForLilanz.ashx"
// // 获得鉴权的token
// export function getwxToken(data) {
//     return $get(getUser, data);
// }

// 通过跳转路由后获得的token得到用户信息
export function getwxInfoBytoken(data) {
    return $get(wxApi, data)
}