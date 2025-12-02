var page = 1;
var size = 10;
var query = {};
var games = [];
var vendor = null;

function RenderVendorGameItem(c, v) {
    var img = document.createElement('img');
    img.src = 'css/thm/6/ico.gif';
    img.alt = '';
    c.appendChild(img);
    c.append(' ');
    var a = document.createElement('a');
    a.href = GenUrl('game.html', { vendor: vendor, game: v.n });
    a.innerText = v.n;
    c.appendChild(a);
    c.append(' [' + v.c + ']');
    c.appendChild(document.createElement('br'));
    //<img src="/web/20110924233012im_/http://rugame.mobi" alt=""/> <a href="/web/20110924233012/http://rugame.mobi/vendor.php?vendor=Hands-On+Mobile">Hands-On Mobile</a> [50]<br/>
}

function RenderVendorGameList() {
    var start = PageStart(page, size);
    var c = document.getElementsByClassName('list')[0];
    /*        for(var i = 0; i < c.children.length; i++) {
                if(c.children.item(i).tagName === 'img')
                    c.children.item(i).remove();
            }*/
    for(var i = 0; i < size; i++) {
        var index = i + start;
        if(index >= games.length)
            break;
        RenderVendorGameItem(c, games[index], vendor);
    }
}

function RenderPagedBar() {
    var c = document.getElementsByClassName('paged')[0];
    for(var i = 0; i < c.children.length; i++) {
        if(c.children.item(i).tagName !== 'form')
            c.children.item(i).remove();
    }
    var numPage = NumPage(games.length, size);
    var paged = {vendor, page: page, size: size !== 10 ? size : undefined};
    var path = 'vendor-game.html';
    if(page > 1) {
        var a = document.createElement('a');
        paged.page = page - 1;
        a.href = GenUrl(path, paged);
        a.innerText = '<<пред';
        c.appendChild(a);
    }
    if(page > 1 && page < numPage) {
        c.append('|');
    }
    if(page < numPage) {
        var a = document.createElement('a');
        paged.page = page + 1;
        a.href = GenUrl(path, paged);
        a.innerText = 'след>>';
        c.appendChild(a);
    }
    c.appendChild(document.createElement('br'));

    if(page > 1)
    {
        var a = document.createElement('a');
        paged.page = 1;
        a.href = GenUrl(path, paged);
        a.innerText = '1';
        c.appendChild(a);
    }

    if(page - 2 > 1) {
        c.append('..');
        var p = page - 2;
        a = document.createElement('a');
        paged.page = p;
        a.href = GenUrl(path, paged);
        a.innerText = '' + p;
        c.appendChild(a);
    }

    if(page > 1)
        c.append('..');
    var b = document.createElement('b')
    b.innerText = '' + page;
    c.appendChild(b);

    if(page + 2 < numPage) {
        c.append('..');
        var p = page + 2;
        a = document.createElement('a');
        paged.page = p;
        a.href = GenUrl(path, paged);
        a.innerText = '' + p;
        c.appendChild(a);
    }

    if(page < numPage) {
        c.append('..');
        a = document.createElement('a');
        paged.page = numPage;
        a.href = GenUrl(path, paged);
        a.innerText = '' + numPage;
        c.appendChild(a);
    }
}

function BackToVendor() {
    location.href = 'vendor.html';
}

function SetupVendorName() {
    var form = document.getElementsByClassName('komm1')[0].getElementsByTagName('form')[0];
    form.elements.vendor.value = encodeURIComponent(vendor);
    document.getElementsByClassName('title')[0].innerText = vendor;
    document.title = vendor;
}

function Submit() {
    var form = document.getElementsByClassName('komm1')[0].getElementsByTagName('form')[0];
    location.href = GenUrl(form.action, {vendor, page: form.elements.page.value, size: form.elements.size.value})
}

function SetupPageSize() {
    var Size = document.getElementsByClassName('size')[0];
    var arr = [10, 20, 50, 100, 200, 500, 1000];
    for(var i in arr) {
        var option = document.createElement('option');
        option.value = '' + arr[i];
        if(arr[i] === (size || 10) )
            option.selected = 'selected';
        option.innerText = '' + arr[i];
        Size.appendChild(option);
    }
    if(size) {
        var form = document.getElementsByClassName('komm1')[0].getElementsByTagName('form')[0];
        form.elements.size.value = size;
    }
}

function Init() {
    query = GetQueryParms();
    vendor = decodeURIComponent(query['vendor']);
    games = VG[vendor];
    if(!games)
        games = [];
    if(query['page'] && IsInteger(query['page']))
        page = parseInt(query['page']);
    if(query['size'] && IsInteger(query['size']))
        size = parseInt(query['size']);
    RenderVendorGameList();
    RenderPagedBar();
    SetupVendorName();
    SetupPageSize();
}
