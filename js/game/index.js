var query = {};
var vendor = null;
var game = null;
var g = {};
// https://web.archive.org/web/20120427100547/http://rugame.mobi/game/29877

function GenDownloadLink(path) {
    var p = Filepath(path);
    return 'https://pan.baidu.com/s/1FM74We2zftshL-XaINIbyQ?pwd=2009#list/path=' + encodeURIComponent('/sharelink1007504542-839242049409309/rugame/' + p) + '&parentPath=%2Fsharelink1007504542-839242049409309';
    //https://pan.baidu.com/s/1FM74We2zftshL-XaINIbyQ?pwd=2009#list/path=%2Fsharelink1007504542-839242049409309%2Frugame%2Fj2me_apps%2F0&parentPath=%2Fsharelink1007504542-839242049409309
    // https://pan.baidu.com/s/1FM74We2zftshL-XaINIbyQ?pwd=2009#list/path=/sharelink1007504542-839242049409309/rugame/j2me_apps/0&parentPath=/sharelink1007504542-839242049409309
}

function RenderGameFileItem(c, v) {
    var font = document.createElement('font');
    font.color = '#';
    var hr = document.createElement('hr');
    font.appendChild(hr);
    c.appendChild(font);
    c.append(Basename(v.p));
    c.appendChild(document.createElement('br'));
    c.append('Version: ' + v.v);
    c.appendChild(document.createElement('br'));
    var a = document.createElement('a');
    a.href = GenDownloadLink(v.p);
    a.innerText = Extname(v.p).toUpperCase();
    c.appendChild(a);
    c.append(' [' + FormatFileSize(v.s) + ']');
    //<font color="#"><hr/></font>128x160 : S40 2ed Rus<br/>
    //     128x160 : SE K310,K500,K510,W200,Z530 Rus<br/><a href="/web/20120427100547/http://rugame.mobi/game/29955/Kolobok_128x160.jad">JAD</a>
    //     [0 Кб]
}

function RenderGameFileList(files) {
    var c = document.getElementsByClassName('files')[0];
    for(var i in files) {
        RenderGameFileItem(c, files[i]);
    }
}

function GenDescription() {
    var desc = document.getElementsByClassName('description')[0];
    desc.append(g.d);
    if(g.d)
        desc.appendChild(document.createElement('br'));
    desc.append('Vendor: ' + vendor);
    desc.appendChild(document.createElement('br'));
    desc.append('Version: ' + g.r);
    desc.appendChild(document.createElement('br'));
    desc.append('Category: ' + GetCategoryName(g.c));
    desc.appendChild(document.createElement('br'));
    // supplied by ExploZeR &amp; Pantamorph(mot) &amp; Лапушара s40v5<br/>Pac-man глазами Net Lizard<br/><b>JAD установка</b> <br/><br/>
}

function SetupVendorGameName() {
    var back = document.getElementsByClassName('back')[0];
    back.href = GenUrl('vendor-game.html', {vendor});
    document.getElementsByClassName('title')[0].innerText = game;
    document.title = game;
    var category= GetCategoryName(g.c);
    var komm1 = document.getElementsByClassName('komm1')[0];
    komm1.getElementsByTagName('b')[0].innerText = game;
    var as = komm1.getElementsByTagName('a');
    as[1].href = '#'
    as[1].innerText = category;
    as[2].href = GenUrl('vendor-game.html', {vendor});
    as[2].innerText = vendor;
    var reklama_vendor = document.getElementsByClassName('reklama-vendor')[0];
    reklama_vendor.href = GenUrl('vendor-game.html', {vendor});
    reklama_vendor.innerText = vendor + '!';
    var Vendor = document.getElementsByClassName('vendor')[0];
    Vendor.href = GenUrl('vendor-game.html', {vendor});
    Vendor.innerText = vendor;
    var Category = document.getElementsByClassName('category')[0];
    Category.href = '#'
    Category.innerText = category;
}

function GetCategoryName(c) {
    switch(c) {
        case '2': return 'Java приложения';
        case '3': return 'China Game';
        case '1': default: return 'Java игры';
    }
}

function RenderPreview() {
    var pic = document.getElementsByClassName('pic')[0];
    var canvas = document.createElement('canvas');
    var W = 128;
    var H = 160;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, W, H);
    ctx.lineWidth = 1;

    var font_size = 128/2;
    ctx.font = SetFontSize(ctx.font, font_size);
    while(ctx.measureText(vendor).width >= 128/2) {
        //console.log(font_size)
        font_size -= 2;
        ctx.font = SetFontSize(ctx.font, font_size);
    }
    ctx.font = SetFontSize(ctx.font, font_size - 2);
    var geom = ctx.measureText(vendor);
    var texth = geom.actualBoundingBoxAscent + geom.actualBoundingBoxDescent;
    ctx.textAlign = 'right';
    ctx.strokeText(vendor, W - 2, H - texth / 2);

    font_size = 160;
    ctx.font = SetFontSize(ctx.font, font_size);
    //var len = Math.floor(Math.sqrt(W * W + H * H));
    while(ctx.measureText(game).width >= 160) {
        //console.log(font_size)
        font_size -= 2;
        ctx.font = SetFontSize(ctx.font, font_size);
    }
    geom = ctx.measureText(vendor);
    ctx.translate(W / 2, H / 2);
    ctx.rotate(45);
    ctx.textAlign = 'center';
    ctx.strokeText(game, 0, 0);

    if(1) {
        var url = canvas.toDataURL('image/png', 1);
        pic.getElementsByTagName('img')[0].src = url;
        canvas.remove();
    } else {
        pic.innerHTML = '';
        pic.appendChild(canvas);
    }

}

function Init() {
    query = GetQueryParms();
    vendor = decodeURIComponent(query['vendor']);
    game = decodeURIComponent(query['game']);
    var games = G[vendor];
    if(!games)
        games = {};
    g = games[game];
    if(!g)
        g = {};
    RenderGameFileList(g.f||[]);
    GenDescription();
    SetupVendorGameName();
    RenderPreview();
}
