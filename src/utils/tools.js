import { Toast, Dialog } from 'vant';
// 判断缓存中数据有没有过期,没有过期返回true
export function overdue() {
    let old = localStorage.getItem("VISA_TIME");
    return new Date().getTime() - old < 2592000000
}


// 标准时间转换成yyyy-mm-dd
export function changeDate(time) {
    let year = time.getFullYear();
    let month = return0(time.getMonth() + 1);
    let day = return0(time.getDate());
    return `${year}-${month}-${day}`;
}
function return0(s) {
    return s < 10 ? '0' + s : s;
}


export function showDialog(msg, title = '提 示', opts = {}) {
    Object.assign(opts, {
        message: msg,
        title: title
    });
    return Dialog.alert(opts);
}

export function showToast(msg, opts = {}) {
    let obj = {
        duration: 0,
        forbidClick: true,
        overlay: false,
        message: msg
    };
    Object.assign(obj, opts);
    Toast(obj);
}