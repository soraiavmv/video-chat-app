import React, { useContext } from 'react';
import { Grid, Typography, Paper, } from '@material-ui/core';
import { useStyles } from './styles'
import { SocketContext } from '../../util/network';

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    video,
    peerVideo,
    callEnded,
    stream,
    call
  } = useContext(SocketContext);

  const css = useStyles();

  return (
    <Grid container className={css.gridContainer}>
      {
        stream && (
          <Paper className={css.paper}>
            <Grid item xs={12} md={6}>
              <video
                muted
                playsInline
                ref={video}
                autoPlay
                className={css.video}
              />
              <Typography
                variant='h5'
                gutterBottom
                className={css.typography}
              >
                {name || 'Unnamed'}
              </Typography>
            </Grid>
          </Paper>
        )
      }
      {
        callAccepted && !callEnded && (
          <Paper className={css.paper}>
            <Grid item xs={12} md={6}>
              <video
                playsInline
                ref={peerVideo}
                autoPlay
                className={css.video}
              />
              <Typography
                variant='h5'
                gutterBottom
                className={css.typography}
              >
                {call.name || 'Unnamed'}
              </Typography>
            </Grid>
          </Paper>
        )
      }
    </Grid>
  );
}

export default VideoPlayer;