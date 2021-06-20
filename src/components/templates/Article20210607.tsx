import React from 'react'
import { Box, Typography, createStyles, makeStyles, Theme, Divider } from '@material-ui/core'
import ArticleBase from './ArticleBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontSize: '1.4em',
      lineHeight: '1.4em',
    }
  }),
);


const Article20210607 = ({ pageContext}) => {
  const classes = useStyles();
  const title = "2021年06月07日～2021年06月13日の週間スパチャランキング";
  return (
    <ArticleBase pageContext={pageContext} subtitle={title}>
      <h2>{title}</h2>
      <Box>
        <p className={classes.text}>
          今週のスパチャランキング第一位は、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCS9uQI-jC3DE0L4IpXyvr6w">桐生ココ</a>だ。<br/>
          <img src="/images/article/20210607-1.png" height="175" title="【晩酌雑談】まぁゆっくり話そうや🍻【桐生ココ/ホロライブ】" /><br/>
          彼女が突然の枠取りと共に、引退宣言をするというホロライブファンには衝撃の一週間だっただろう。ホロライブでは長期間活動していたVTuberの引退は初となり、ファンの間ではかなりの騒動だった模様だ。桐生ココといえば、2020年のYouTubeスパチャランキング堂々の第一位となり、VTuber界隈以外にも話題になった時の人なだけにその衝撃は界隈以外にも知れ渡ることとなった事件とも言える。<br/>
          引退配信以降も各配信でのスパチャ額はかなりのものとなり、３Dお披露目配信や記念配信ではない中で、群を抜いてスーパーチャットの額が多くなった。<br/>
        </p>
        <Divider />
        <p className={classes.text}>
          第二位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCl_gCybOJRIgOXw6Qb4qJzQ">潤羽るしあ</a>だ。<br/>
          <img src="/images/article/20210607-2.png" height="176" title="【 #汚部屋訪問 】　ガ　チ　や　ば　い　【潤羽るしあ/ホロライブ】" /><br/>
          前からTwitterで募集していたリスナー汚部屋訪問企画で、様々なリスナーの汚い部屋（＝汚部屋）を紹介するというものでかなりの盛り上がりを魅せた。汚部屋の写真もVTuberグッズを敷き詰めたものから、本当にゴミが山積みされた見事な（？）汚部屋までおもしろおかしく紹介する様子が伺えた。この配信でのスーパーチャット額は約105万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第三位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UC1opHUrw8rvnsadT-iGp7Cg">湊あくあ</a>だ。<br/>
          <img src="/images/article/20210607-3.png" height="175" title="【歌枠】元気に歌うよおおおおお！！！【湊あくあ/ホロライブ】" /><br/>
          湊あくあは5月20日に活動休止の報告をして休止状態となっていたが、6月7日に歌枠での復帰を果たした。『God knows..』や『うまぴょい伝説』など盛り上がる曲を多数ピックアップし、復活を大いに盛り上げるものになった。この枠でのスーパーチャット額は約144万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第四位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCFKOVgVbGmX65RxO3EtH3iw">雪花ラミィ</a>だ。<br/>
          <img src="/images/article/20210607-4.png" height="174" title="【BAYONETTA】スタイリッシュにベヨネッタ！＃2【雪花ラミィ/ホロライブ】" /><br/>
          特に注目すべき配信はなかったものの、おしなべて各配信でのスーパーチャット額が高い傾向にあり、一番高いもので、ベヨネッタ配信が一枠で約82万円のスーパーチャットを叩き出すなどが積み重なる結果となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第五位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg">宝鐘マリン</a>だ。<br/>
          <img src="/images/article/20210607-5.png" height="177" title="【マリンたん７さい】声が老けるまで、うたうお！/Young Marin sings【ホロライブ/宝鐘マリン】" /><br/>
          普段は高年齢をネタにされる（する）キャラだが、歌枠で７歳の幼女キャラを演じたことによって、リスナーは大いに盛り上がりを魅せた。歌枠でのスーパーチャット額は約55万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          今週のピックアップは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCAWSyEs_Io8MtpY3m-zqILA">桃鈴ねね</a>だ。<br/>
          <img src="/images/article/20210607-pickup.png" height="177" title="【3DLIVE】🍑ねねいろらいぶ🍑【桃鈴ねね/ ホロライブ】" /><br/>
          一時期は５期生の中で３Ｄ化が一人だけ遅れるなど不遇な時期もあったが、それを跳ね除けるだけのパワーと魅力を存分に発揮するライブとなった。ライブ中も機材トラブルに見舞われる事があったが、持ち前のキャラを生かして立て直すなど魅力を余すことなく発揮した。
        </p>
        <p className={classes.text}>
          ということで、ホロライブが上位を占めることとなった週ですがいかがでしたか？最近はホロライブメンバーの引退や体調不良による活動休止が目立っておりますが、皆さんの注目している配信があったら教えて下さい。
        </p>
      </Box>
    </ArticleBase>
  )
}

export default Article20210607
