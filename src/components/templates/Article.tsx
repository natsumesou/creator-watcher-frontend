import { Box, createStyles, makeStyles, Theme, Card, CardMedia, Typography, Link } from '@material-ui/core'
import React, { useState } from 'react'
import SEO, { SeoType,SeoContext } from '@/components/SEO';
import ArticleBase from './ArticleBase';
import { theme } from '@/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {

    },
    area: {
      minHeight: '300px',
    },
  }),
);

const Article = ({ pageContext }) => {
  const classes = useStyles();

  return (
    <ArticleBase pageContext={pageContext} subtitle="" >
        <Link href="/2021/05/31" color="inherit">
        <h2>2021年05月31日～2021年06月06日の週間スパチャランキング</h2>
        <Card>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="171"
                image="/images/article/20210531-1.png" />
        </Card>
        </Link>
        <Link href="/2021/06/07" color="inherit">
        <h2>2021年06月07日～2021年06月13日の週間スパチャランキング</h2>
        <Card>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="171"
                image="/images/article/20210607-1.png" />
        </Card>
        </Link>
        <Link href="/2021/06/14" color="inherit">
        <h2>2021年06月14日～2021年06月20日の週間スパチャランキング</h2>
        <Card>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="195"
                image="/images/article/20210614-1.png" />
        </Card>
        </Link>
    </ArticleBase>
  )
}

export default Article
