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


const Article20210604 = ({ pageContext}) => {
  const classes = useStyles();
  const title = "2021年06月14日～2021年06月20日の週間スパチャランキング";
  return (
    <ArticleBase pageContext={pageContext} subtitle={title}>
      <h2>{title}</h2>
      <Box>
        <p className={classes.text}>
          今週のスパチャランキング第一位は、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCS9uQI-jC3DE0L4IpXyvr6w">桐生ココ</a>だ。<br/>
          <img src="/images/article/20210614-1.png" height="175" title="【カウントダウン】3502歳のお誕生日を一緒に迎えてよね！！🐉🎁" /><br/>
          引退宣言をして1週間が過ぎたが、飛ぶ鳥を落とす勢いでスパチャの金額が伸びている。7月1日に行われる引退ライブに向けて様々なコラボを行うなど、残りのスケジュールをパンパンにしてる事が伺えるだけに、リスナーのスパチャも全力疾走をしている模様だ。<br/>
          今週は特に6月17日の誕生日枠なども重なってスーパーチャットの勢いは加速の一途をたどっている。誕生日のカウントダウンを行う雑談枠では1時間半で約347万円のスーパーチャットが送られる事となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第二位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCl_gCybOJRIgOXw6Qb4qJzQ">潤羽るしあ</a>だ。<br/>
          <img src="/images/article/20210614-2.png" height="178" title="【雑談/talk】ぬわあああああああ！！；；；；；【潤羽るしあ/ホロライブ】" /><br/>
          近況報告の枠では親にVTuberとしての活動がバレてからのまとめ動画を見られた話や、特徴的な叫び声から喉を心配されるなど親子仲睦まじい様子を報告していた。この配信でのスーパーチャット金額は約111万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第三位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCCzUftO8KOVkV4wQG1vkUvg">宝鐘マリン</a>だ。<br/>
          <img src="/images/article/20210614-3.png" height="175" title="【歌枠/Sing】個人的重大発表あり！/GOOD major announcement【ホロライブ/宝鐘マリン】" /><br/>
          定番の歌枠ではあったが、前から本人が望んでいたチャンネル登録者数100万人の記念ライブの発表もあり、リスナー共々盛り上がる配信となった。この配信でのスーパーチャット金額は約132万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第四位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCZlDXzGoo7d44bwdNObFacg">天音かなた</a>だ。<br/>
          <img src="/images/article/20210614-4.png" height="176" title="【90万人耐久歌枠】歌います！900k singing Let's GO!!!!【天音かなた/ホロライブ】" /><br/>
          ホロライブでは定番のチャンネル登録者数を目指す耐久歌枠で、90万人を目指す耐久を行った。この配信でのスーパーチャット金額は約107万円となった。<br/>
          天音かなたといえば、4期生のオリジナル曲を作詞作曲し自費制作を進めており、桐生ココの引退に間に合わせるために急ピッチでの作業を行っているという話があり、それもまた注目である。
        </p>
        <Divider />
        <p className={classes.text}>
          第五位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCvaTdHTWBGv3MKj3KVqJVCw">猫又おかゆ</a>だ。<br/>
          <img src="/images/article/20210614-5.png" height="174" title="【3DLIVE】🌧今宵はきっと雨が降る🌧【#おかゆの梅雨ライブ】" /><br/>
          梅雨という時期を利用した雨降る演出での3Dソロライブを行った猫又おかゆ。共演なし、約45分という短い配信ながらも、持ち前の落ち着いた歌声でリスナーを魅了した。この配信でのスーパーチャット金額は約67万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          今週のピックアップは、<a href="https://www.nijisanji.jp/">にじさんじ</a>所属、<a href="https://www.youtube.com/channel/UCLO9QDxVL4bnvRRsz6K4bsQ">勇気ちひろ</a>だ。<br/>
          <img src="/images/article/20210614-pickup.png" height="175" title="【APEX】カジュアルとか【にじさんじ/勇気ちひろ】" /><br/>
          6/12に行われたにじさんじがメインとなるApexの大会「NIJISANJI APEX Party with DETONATOR」で見事優勝を掴み取った次のApex枠で、リスナーからのお祝いスーパーチャットが約26万円となった。なぜか大会の本配信よりもスパチャ額が多くなるという現象になる。
        </p>
        <Divider />
        <p className={classes.text}>
          ということで、7月1日の引退イベントに向けて勢いが増す桐生ココが目立つ週でしたが、いかがでしたか？皆さんの注目している配信があったら教えて下さい。
        </p>
      </Box>
    </ArticleBase>
  )
}

export default Article20210604
