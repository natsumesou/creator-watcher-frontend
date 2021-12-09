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
            // marrish
            // tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HIU7T+7YYYCY+3N2M+739TD" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www22.a8.net/svt/bgt?aid=210830969482&wid=001&eno=01&mid=s00000016987001191000&mc=1"></a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3HIU7T+7YYYCY+3N2M+739TD" alt="">';
            // ad(areas[i], tag);
            // カードラボ senren
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FTRUPE+4AHY+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.gamers.co.jp%2Fcorner%2Fcc%2Fgemakuji_senren%2Fcd%2F669%2F" rel="nofollow"><img border="0" width="100%" alt="" src="/images/ads/cardlab-senren.jpeg"></a>';
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.4) {
            // まんが王国
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=210727526963&wid=001&eno=01&mid=s00000022092001006000&mc=1"></a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HGMEE+FXCGC2+4QGO+5ZMCH" alt="">';
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.6) {
            // カードラボ tenkaiji
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FTRUPE+4AHY+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.gamers.co.jp%2Fcorner%2Fcc%2Ftenkaitukasa_glasses%2Fcd%2F664%2F" rel="nofollow"><img border="0" width="100%" alt="" src="/images/ads/cardlab-tenkaiji.jpeg"></a>'
            ad(areas[i], tag);
            continue;
        } else if (rand <= 0.8) {
            // U-NEXT
            // tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FOEY9E+3250+6PC9T" rel="nofollow"><img border="0" width="100%" max-height="90" alt="" src="https://www26.a8.net/svt/bgt?aid=210730565948&wid=001&eno=01&mid=s00000014274001126000&mc=1"></a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3HGOQT+FOEY9E+3250+6PC9T" alt="">'
            // カードラボ nijisanji
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FTRUPE+4AHY+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.gamers.co.jp%2Fpn%2Fpd%2F10584634%2F" rel="nofollow"><img border="0" width="100%" alt="" src="/images/ads/cardlab-nijisanji.jpeg"></a>'
            ad(areas[i], tag);
            continue;
        } else {
            // torico
            // tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=210727526964&wid=001&eno=01&mid=s00000021561001014000&mc=1"></a><img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=3HGMEE+FXXVXU+4MD6+61C2P" alt="">';
            // ad(areas[i], tag);
            // カードラボ スパイ教室
            tag = '<a href="https://px.a8.net/svt/ejp?a8mat=3HGOQT+FTRUPE+4AHY+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.gamers.co.jp%2Fcorner%2Fcc%2Fgemakuji_spy%2Fcd%2F665%2F" rel="nofollow"><img border="0" width="100%" alt="" src="/images/ads/cardlab-spy.jpeg"></a>'
            ad(areas[i], tag);
            continue;
        }
    }
})();