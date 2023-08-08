
const HandleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('userType')
    return;
};

export default HandleLogOut;