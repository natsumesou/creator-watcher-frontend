(function() {
    const ad = (area, tag) => {
        const el = document.createElement("div");
        el.innerHTML = tag;
        area.append(el);
    }

    const areas = document.getElementsByClassName('a8-ads');
    for(var i = 0; i < areas.length; i++) {
        const rand = Math.random();
        let tag = "";
        if (rand <= 0.20) {
            // ameba
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FZ4R5E+4RKY+626XT" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=210727526966&wid=001&eno=01&mid=s00000022237001018000&mc=1"></a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=3HGMEE+FZ4R5E+4RKY+626XT" alt="">';
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.4) {
            // まんが王国
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210727526963&wid=001&eno=01&mid=s00000022092001006000&mc=1"></a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" alt="">';
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.6) {
            // ゲーマーズ 名取さな
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FTRUPE+4AHY+61JSH" rel="nofollow"><img border="0" width="330" height="111" alt="" src="https://www20.a8.net/svt/bgt?aid=210730565957&wid=001&eno=01&mid=s00000020023001015000&mc=1"></a><img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=3HGOQT+FTRUPE+4AHY+61JSH" alt="">'
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.8) {
            // U-NEXT
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FOEY9E+3250+6PC9T" rel="nofollow"><img border="0" width="100%" max-height="90" alt="" src="https://www26.a8.net/svt/bgt?aid=210730565948&wid=001&eno=01&mid=s00000014274001126000&mc=1"></a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HGOQT+FOEY9E+3250+6PC9T" alt="">'
            ad(areas[i], tag);
            continue;
        } else {
            // torico
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=210727526964&wid=001&eno=01&mid=s00000021561001014000&mc=1"></a><img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" alt="">';
            ad(areas[i], tag);
            continue;
        }
    }
})();