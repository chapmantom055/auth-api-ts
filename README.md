# Config Requirements (check config/default.ts for what to fill your .env file with): 
- MongoDB URI
- ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PUBLIC_KEY, REFRESH_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PUBLIC_KEY
- Can generate these 2048 bit RSA256 keys with either online or via this bash commands:

### Generate rsa keys pair
```
ssh-keygen -t rsa -b 4096 -m PEM -f rs256.rsa
```
### Don't add passphrase
```
openssl rsa -in rs256.rsa -pubout -outform PEM -out rs256.rsa.pub
```
### Done
```
cat rs256.rsa
```
```
cat rs256.rsa.pub
```


# To build:
```
yarn build
```

# To run:
```
yarn dev
```

# API Healthcheck:
```
curl http://localhost:3000
```

# To use the API via postman:
#### User:
1. Create a user via the 'User/Register User/Success'  route
2. Open Email link from Console in your browser and copy the id, verifcationCode
3. Verify the user via 'User/Verify user' (having copied and pasted the id and verificationCode from above step into the Params)
4. Optional: Request reset user password via 'User/Request reset password' (again, open the new email link and copy id and passwordResetCode)
5. Optional follow on: Reset user password via 'User/Reset password' (paste copied id and passwordResetCode into params)

#### Auth:
6. Login via 'Auth/Login'
7. Refresh user access token via 'Auth/Refresh access token'
6. Hit 'Users/Me' to see currently logged in user'

## To-do list:
- dockerize
- add tests
- send pretty html for emails
