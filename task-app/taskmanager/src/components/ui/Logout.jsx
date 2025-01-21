import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('authToken');
  
      navigate('/login');
    };
  
    return (
      <div>
       <Button
          variant="text"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={() => setOpen(true)}
        />
  
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
                Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default Logout