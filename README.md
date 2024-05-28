### MyCloud Backend

- user API

```
### Create User
POST http://localhost:4000/user
content-type: application/json

{
    "email": "ysh@test.com",
    "username" : "yoo",
    "password" : "test1234"
}

### Find User
GET http://localhost:4000/user/test@test.com


### Update User
PUT http://localhost:4000/user/ysh1
content-type: application/json

{
    "username": "sh",
    "password" : "test5555"
}


### Delete User
DELETE http://localhost:4000/user/ysh1
```

- auth API
```
### Register
POST http://localhost:4000/auth/register
Content-Type: application/json

{
    "email": "ysh@test.com",
    "password" : "1234",
    "username" : "sh445"
}

### Login
POST http://localhost:4000/auth/login
Content-Type: application/json

{
    "email": "ysh@test.com",
    "password": "1234"
}

### Login2
POST http://localhost:4000/auth/login2
Content-Type: application/json

{
    "email": "ysh@test.com",
    "password": "1234"
}

### Test Guard
GET http://localhost:4000/auth/test-guard


### Login3
POST http://localhost:4000/auth/login
Content-Type: application/json

{
    "email": "test@test.com",
    "password": "!Q2w3e4r"
}

### Login3 - Wrong Password
POST http://localhost:4000/auth/login
Content-Type: application/json

{
    "email": "ysh1",
    "password": "1235"
}

### Logout
GET http://localhost:4000/auth/logout
Content-Type: application/json


### Test Guard2
GET http://localhost:4000/auth/test-guard2
```