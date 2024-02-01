import axios from "axios"


export const POST = async (url: string, headers: object, body: object) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body, { headers })
      .then((res) => {
        console.log("res ===> ",res)
        resolve(res);
      })
      .catch((err) => {
        console.log("err ===> ",err)

        reject(err);
      });
  });
};

export const GET = (url:Object, headers :object)=>{

}


export const getHeaders = (token:string)=>{
  if(token){
    return {
      'Authorization': token,
      'Content-Type': 'application/json',
    }
  }else{
    return {
      'Content-Type': 'application/json',
    }
  }
}


// {
//   "timeStamp": "Thu Feb 01 2024 23:46:01 GMT+0530 (India Standard Time)",
//   "httpStatus": "OK",
//   "statusCode": 200,
//   "message": "User created",
//   "data": {
//       "userData": {
//           "userId": 20,
//           "firstName": "Ram",
//           "lastName": "Singh",
//           "email": "abcd@gmail.com",
//           "imageURL": null,
//           "createdAt": "2024-02-01T18:16:01.000Z",
//           "createdBy": null,
//           "deleted": 0,
//           "deleteBy": null,
//           "userType": 1
//       },
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE3MDY4MTEzNjF9.6bdlHSvSb3fk7w5UDeYaJs8pD0D_Mxy52pQiMjwKIgI"
//   }
// }