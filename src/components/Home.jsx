import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Login from './Login/Form/Form';

const news = [
  {
    title: 'There is something new coming up!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Auksinis Kardas',
    picture: 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png',
    createdAt: '2018-04-06'
  },
  {
    title: 'There is something new coming up!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Auksinis Kardas',
    picture: 'https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png',
    createdAt: '2018-04-06'
  }
];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      news: news
    };
  }

  render() {
    return (
      <div>
        <div className="homepage" />
        <Login />
        <Grid
          container
          spacing={24}
          className="fullWidth"
          style={{ height: '100%' }}
          alignContent="center"
          justify="center">
          <Grid
            style={{
              width: '100%',
              height: '100%',
              marginTop: '70px'
            }}
            item
            md={6}>
            <h1 style={{ textAlign: 'center' }}>News</h1>
            {this.state.news.map((el, index) => {
              return (
                <Card key={index} style={{ marginBottom: '25px' }}>
                  <CardHeader
                    avatar={<Avatar aria-label="Recipe">AK</Avatar>}
                    title={el.title}
                    subheader={el.author}
                  />
                  <CardContent>
                    <Typography component="p">{el.description}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Home;
