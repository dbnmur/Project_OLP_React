import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 200
  }
};

class MyCard extends React.Component {
  render() {
    const { classes, title, instructor, description } = this.props;
    return (
      <div>
        <Card raised className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom component="p">
              {description}
            </Typography>
            <Typography component="p">{`Made by ${instructor}`}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Read more
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

MyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCard);
