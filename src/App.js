import { useState } from 'react';

// MUI Components
import { CssBaseline, Box, Button, Container, Divider, Typography, Avatar } from '@mui/material';

// Custom Components
import UserList from './components/UserList';
import Header from './components/Header';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';

// API
import fetchUsers from './api';

function App() {
    // State for users data, loading indicator, and error messages
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handler for form submission
    const handlerFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true); // Show loading indicator
        setUsers(null); // Reset users data
        setError(null); // Reset previous errors

        // Fetch users data
        const result = await fetchUsers();

        // Simulate delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Handle fetch result
        if (result.error) {
            setError(result); // Set error state
            console.log('error', result);
        } else {
            setUsers(result); // Set users data
        }

        setIsLoading(false); // Hide loading indicator
    };

    return (
        <div>
            <Container component="main">
                <CssBaseline />
                <Header />
                <Box
                    sx={{
                        marginTop: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 'calc(100vh - 60px)', // Ensure page fills viewport height minus footer
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Users List
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handlerFormSubmit}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 3 }}
                        >
                            Search
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, mb: 20 }}>
                        {isLoading && <LoadingIndicator />}
                        {!error && users && <UserList data={users} />}
                        {error && <ErrorDisplay errorMessage={error} />}
                    </Box>
                </Box>
                <Divider />
                <Footer />
            </Container>
        </div>
    );
}

export default App;
