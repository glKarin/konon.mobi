function GetQueryParms() {
    var url = location.href;
    var index = url.indexOf('#');
    if(index !== -1)
        url = url.substring(0, index);
    index = url.indexOf('?');
    if(index < 0 || index === url.length - 1)
        return {};
    var query = url.substring(index + 1);
    var arr = query.split('&');
    var res = {};
    for(var i in arr) {
        index = arr[i].indexOf('=');
        if(index < 0)
            continue;
        var key = arr[i].substring(0, index);
        var val = index < arr[i].length - 1 ? arr[i].substring(index + 1) : '';
        res[key] = val;
    }
    return res;
}

function GenUrl(prefix, query) {
    if(!query)
        return prefix;
    var arr = [];
    for(var i in query) {
        if(query[i] === null || query[i] === undefined)
            continue;
        arr.push(i + '=' + encodeURIComponent(query[i]));
    }
    if(arr.length > 0)
        return prefix + '?' + arr.join('&');
    else
        return prefix;
}

function PageStart(pageNo, pageSize) {
    return (pageNo - 1) * pageSize;
}

function NumPage(total, pageSize) {
    return Math.floor(total / pageSize) + (total % pageSize ? 1 : 0);
}

function LastPage(total, pageSize) {
    return NumPage() + 1;
}

function Filepath(path) {
    var index = path.lastIndexOf('/');
    return index !== -1 ? path.substring(0, index) : '';
}

function Filename(path) {
    var index = path.lastIndexOf('/');
    return index !== -1 ? path.substring(index + 1) : path;
}

function Extname(path) {
    var index = path.lastIndexOf('.');
    return index !== -1 ? path.substring(index + 1) : path;
}

function Basename(path) {
    path = Filename(path);
    var index = path.lastIndexOf('.');
    return index !== -1 ? path.substring(0, index) : path;
}

function FormatFileSize(size) {
    var Unit = ["Байт", "Кб", "Мб‌", "Гб", "Тб"];
    var s, i;
    for(s = size, i = 0; s >= 1024 && i < Unit.length - 1; s /= 1024, i++);
    return s.toFixed(2).replace(/\.00$/, '') + ' ' + Unit[i];
}

function SetFontSize(size, num) {
    const parts = size.split(' ');
    parts[0] = num + 'px';
    return parts.join(' ');
}

function IsInteger(num) {
    try {
        parseInt(num);
        return true;
    } catch {
        return false;
    }
}
