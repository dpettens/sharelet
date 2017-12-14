import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary[500]
  }
});

const Outlet = ({ className, classes, title }) => (
  <Card className={className}>
    <CardHeader
      title={title}
      subheader="September 14, 2016"
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
    />
    <CardContent>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook together with
        your guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Typography>
    </CardContent>
    <CardActions disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>
);

Outlet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Outlet);
