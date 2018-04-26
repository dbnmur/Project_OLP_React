import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import FloatButton from '../../FloatButton';
import CourseNewStepper from './Stepper';

const CourseNewDialog = ({ open, handleClose, chatBots, handleOpen }) => {
  return (
    <div>
      <FloatButton onClick={handleOpen} />
      <Dialog
        open={open}
        style={{ minWidth: '500px', height: '600px' }}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new course fill the form below
          </DialogContentText>
          <CourseNewStepper groups={chatBots} myClick={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseNewDialog;
