import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const CourseModuleDelete = props => {
  return (
    <Dialog
      open={props.moduleDelete}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {`Do you want to delete ${props.moduleName} module?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting module will result with all records lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseModuleDelete;
