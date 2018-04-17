# HackerBay Round 1 Interview task

## Setup

To run the API locally on your local machine

`git clone https://github.com/3dw1nM0535/hackerbay-interview--repo.git`

to have a local of the project.
## Install
Run

`npm install`

to install app dependencies.

This does not make the app ready for some ride. The API uses [cloudinary](https://cloudinary.com) services for image thumbnail generation. You need to get the `cloud_name`, `api_key`, and `api_secret` [here](https://cloudinary.com/users/login) for the API endpoint to generate thumbnails for you or you can setup your own image management and manupulation tools or service.

You need to setup your `SECRET_KEY` for [jwt](https://jwt.io) for signing user data and transmitting from the API backend to client. Paste your enviroments to `config` folder. Ensure you have all the private enviroments setup, you can refer to `/config/configs.js` to check out what you need to make the API endpoints fully functional.
## Start development server
Run

`npm start`

to start the development server.

### Authentication
The API support authentication. The login endpoint is
`POST /api/authenticate`
```javascript
{
  username: "username",
  password: "password"
}
```
returns `token` as response only if you have already signed up and `password` is correct. Else you will get `error`.

Signup is also supported. The signup endpoint is `LOGIN /api/signup`
```javascript
{
  username: "username",
  password: "password"
}
```
also returns `token` as response. Only signup if you haven't.
### JSON Patching
To understand about JSON Object parsing head over to [JSON Patching](http://jsonpatch.com/)
This API returns JSON patched object as response. The endpoint for patching is `/api/patch`. This endpoint is protected. You need to provide the `token` returned as response from `login` and pass as `Authorization` to headers for access.
```javascript
{
  myDoc: {} // Object to apply patching
  patchOp: {} // Array of Objects/an Object as patch operations to perform on myDoc
}
```
returns patched `object` as response.

### Thumbnail Image creation
To create image thumbnail, the endpoint is `/api/thumbnails/uploads`. This endpoint is protected, therefore you need to grab your `token` provided after `login` and pass to `Authorization` header for access to this endpoint.

This endpoint handles file upload.
## Tests
To run test

`npm test`

to make sure all tests pass.
