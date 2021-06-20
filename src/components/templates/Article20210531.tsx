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


const Article20210531 = ({ pageContext}) => {
  const classes = useStyles();
  const title = "2021年05月31日～2021年06月06日の週間スパチャランキング";
  return (
    <ArticleBase pageContext={pageContext} subtitle={title}>
      <h2>{title}</h2>
      <Box>
        <p className={classes.text}>
          今週のスパチャランキング第一位は、<a href="https://www.nijisanji.jp/">にじさんじ</a>所属、<a href="https://www.youtube.com/channel/UC6wvdADTJ88OfIbJYIpAaDA">不破 湊</a>だ。<br/>
          <img src="/images/article/20210531-1.png" height="171" title="【#不破湊3D】夢は叶います【にじさんじ】" /><br/>
          その中でも注目すべきは3Dお披露目配信だろう。彼のデビューは2019年11月。ホストキャラとしてVTuber界に降り立った。チャンネル登録者数は35万人(記事作成時時点)で、男女問わず人気キャラクターとなった。<br/>
          今回の3Dお披露目配信は2021年6月14日21時から約1時間の配信となった。注目すべきはスパチャ額に応じてシャンパンタワーが生えてくるという仕組みで、ホストキャラを生かした面白い仕組みが取り込まれた。それもあってかスパチャは配信開始時から終了時まで鳴り止まず、配信単体で約1,615万円のスーパーチャットが送られるという自体に。
        </p>
        <Divider />
        <p className={classes.text}>
          第二位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCQ0UDLQCjY0rmuxCDE38FGg">夏色まつり</a>だ。<br/>
          <img src="/images/article/20210531-2.png" height="175" title="【APEXガチャ】半年間徳をつみました。いけます！【ホロライブ/夏色まつり】" /><br/>
          特に何かの大きなイベントがあった訳ではないが、Apex Legedsというオンラインゲームのガチャコンテンツでスーパーレジェンドという一番レアなアイテムを引き当てるというのを目的にした配信内容だった。ちょうどチャンネル登録者数も配信内で100万人を達成したのもあり、リスナーのノリがスパチャ最高額更新という方向に向かい配信開始してすぐにスパチャ額が膨れ上がり、最終的には約446万円のスーパーチャットに達した。
        </p>
        <Divider />
        <p className={classes.text}>
          第三位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ">兎田ぺこら</a>だ。<br/>
          <img src="/images/article/20210531-3.png" height="175" title="【歌枠】目指せ150万人！ Singing until 1.5M subs♪ぺこ！【ホロライブ/兎田ぺこら】" /><br/>
          チャンネル登録者数150万人を目指す歌枠という節目の記念枠で、約１時間半の歌枠では持ち前の可愛い声を生かした『恋愛サーキュレーション』を披露したり、直近で実況していたFF10の代表曲である『素敵だね』を歌うなど、ファンサービスに抜け目がなかった。この記念枠では合計約267万円のスーパーチャットを獲得することとなった。
        </p>
        <Divider />
        <p className={classes.text}>
          第四位に輝いたのは、<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCqm3BQLlJfvkTsX_hvm0UmA">角巻わため</a>だ。<br/>
          <img src="/images/article/20210531-4.png" height="176" title="【#わための誕生日2021】３Ｄお誕生日パーティー！！！【角巻わため/ホロライブ４期生】" /><br/>
          6月6日が誕生日ということで、約1時間の3Dでの誕生日配信を行った。持ち前の歌唱力を生かした歌や、同じくホロライブの後輩である<a href="https://www.youtube.com/channel/UCUKD-uaobj9jiqB-VXt71mA">獅白ぼたん</a>との珍しいコラボなどが目白押しで、最後にはアイドルステージを利用したクオリティの高いライブを魅せるなど、終始盛り上がりを見せる誕生日配信となり、スーパーチャットは約184万円となった。
        </p>
        <Divider />
        <p className={classes.text}>
          第五位に輝いたのは、<a href="https://www.nijisanji.jp/">にじさんじ</a>所属、<a href="https://www.youtube.com/channel/UCerkculBD7YLc_vOGrF7tKg">魔使マオ</a>だ。<br/>
          <img src="/images/article/20210531-5.png" height="172" title="【#まつかい新衣装】ひとつじゃ足りないでしょ？【にじさんじ/魔使マオ】
" /><br/>
          デビューして初めての新衣装ということで、2019年11月にデビューしてから1年7ヶ月ぶりの新衣装となった。チャンネル登録者数は約18万人での記念枠になった。
        </p>
        <p className={classes.text}>
          ということで記念枠が色々重なった週でしたが、いかがでしたか？<br/>個人的に来週の注目枠は<a href="https://www.hololive.tv/">ホロライブ</a>所属、<a href="https://www.youtube.com/channel/UCAWSyEs_Io8MtpY3m-zqILA">桃鈴ねね</a>のソロライブです。皆さんの注目している配信があったら教えて下さい。
        </p>
      </Box>
    </ArticleBase>
  )
}

export default Article20210531
