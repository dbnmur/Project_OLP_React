import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import Course from './Course/Course';
import CourseNewDialogContainer from './Course/New/DialogContainer';

const Dashboard = ({ items, isLoading }) => {
  return (
    <Grid item md={12} sx={12} sm={12}>
      {/* Grid for title */}
      <Grid
        container
        justify="center"
        alignItems="center"
        className="fullWidth">
        <Grid item>
          <h1 style={{ marginBottom: '45px' }}>Courses</h1>
        </Grid>
      </Grid>
      {/* Grid for courses */}
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="fullWidth">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : items.length ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="fullWidth">
          {items.map((el, index) => {
            return (
              <Grid item key={index}>
                <Course
                  title={el.name}
                  description={el.description}
                  id={el.courseId}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h2 style={{ textAlign: 'center', fontWeight: '400' }}>
          There is no courses available. Create a course by clicking the button
          on the right.
        </h2>
      )}
      {items.length < 2 && !isLoading ? (
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          style={{ marginTop: '25px', width: '100%' }}>
          <Grid item>
            <CourseNewDialogContainer />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default Dashboard;
