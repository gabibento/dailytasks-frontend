import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const [open, setOpen] = useState(false); // Estado para controlar o Dialog
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Remove o token do localStorage
      localStorage.removeItem('authToken');
  
      // Redireciona para a página de login
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
              Tem certeza de que deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancelar
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