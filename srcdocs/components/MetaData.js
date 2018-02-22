import { withStyles } from 'material-ui/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

const MetaData = (props) => {
    const { classes } = props;
    return (
    <div>
        <Head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Tubular React" />
            <meta name="keywords" content="application, html5, reactJS, responsive, web api" />
            <meta name="author" content="Unosquare Labs" />
            <link rel="shortcut icon" href="./static/favicon.ico" />
            <title>Tubular React</title>
        </Head>
        <style jsx global>{`
        body { 
          background-image: url("./static/background.jpg");
          width: 98%;
        }
      `}</style>
      </div>
    )
}

export default MetaData;