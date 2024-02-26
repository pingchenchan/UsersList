import axios from "axios";
// Import the axios library for making HTTP requests

const fetchUsers = async () => {
    try {
        // Attempt to fetch user data using axios.get
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        // Return the response data (expected to be an array of users)
        return response.data; 
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching data: ', error);
        
        // Return an object containing error details
        return {
            error: error.response.status,
            message: error.message
        };
    }
};





export default fetchUsers;
