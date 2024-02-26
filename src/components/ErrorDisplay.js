import Alert from '@mui/material/Alert';
function ErrorDisplay({ errorMessage}) {
    console.log('statusCode', errorMessage);
  return  (<Alert severity="error">{errorMessage.message}</Alert>);
}

export default ErrorDisplay;