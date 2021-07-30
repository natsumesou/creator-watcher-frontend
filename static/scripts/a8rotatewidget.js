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
        if (rand <= 0.25) {
            // ameba
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FZ4R5E+4RKY+626XT" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=210727526966&wid=001&eno=01&mid=s00000022237001018000&mc=1"></a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=3HGMEE+FZ4R5E+4RKY+626XT" alt="">';
        } else if (rand <= 0.5) {
            // torico
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210727526963&wid=001&eno=01&mid=s00000022092001006000&mc=1"></a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" alt="">';
        } else if (rand <= 0.75) {
            // torico
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXXVXU+4MD6+61RI9" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=210727526964&wid=001&eno=01&mid=s00000021561001016000&mc=1"></a><img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3HGMEE+FXXVXU+4MD6+61RI9" alt="">';
        } else {
            // torico
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=210727526964&wid=001&eno=01&mid=s00000021561001014000&mc=1"></a><img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" alt="">';
        }

        ad(areas[i], tag);
    }
})();