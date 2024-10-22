import { Box, Alert, AlertTitle } from "@mui/material";

const ErrorMessage = ({ error }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <Alert severity="error" sx={{ maxWidth: "600px", textAlign: "center" }}>
      <AlertTitle><strong>Error</strong></AlertTitle>
      Ocorreu um problema ao carregar as tarefas. <br />
      <strong>{error}</strong>
    </Alert>
  </Box>
);

export default ErrorMessage;
