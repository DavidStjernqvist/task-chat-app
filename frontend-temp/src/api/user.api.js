import axios from 'axios';

const baseURL = 'http://localhost:8080/api/users';

export async function getAllUsers() {
    await axios.get(baseURL).then(res => {
        console.log("In get all users", res.data);
        return res.data
    }).catch(error => console.error(error));
}