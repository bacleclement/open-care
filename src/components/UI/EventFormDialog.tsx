import {useState} from 'react';
import {Button} from '@mui/base';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';

const EventFormDialog = ({date}: { date: Date }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): boolean => {
    setOpen(true);
    return open;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {

  };

  return (
    <>`
      <Dialog
        open={handleClickOpen()}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EventFormDialog;
