const version = "v1";
const endPoint = 'http://localhost:3001'

export default{
  Login: `${endPoint}/api/${version}/login`,
  Register: `${endPoint}/api/${version}/register`,
  AllUsers: `${endPoint}/api/${version}/manageUsers/getAllUsers`,
}