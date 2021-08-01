### Title:

```
Co.Clinic
```

### URL:

```
http://localhost:3000
```

### Methods:

1. Users

```
- POST /register
- POST /login
```

2. Orders

```
- POST /orders
- GET /orders/customers
- GET /orders/admin
- GET /orders/:id
- PUT /orders/:id
- DELETE /orders/:id
```

3. Live Tracking

```
- GET /tracking/:id
- PUT /tracking/:id
```

4. Transaction

```
- POST /midtrans/createTransaction
- POST /midtrans/notification/handling
```

# Endpoints

### USERS

1. Register

```
Create/Register new User
URL: /register
Method: POST
Required Auth: No
```

- Request Body:

```
{
  name: 'User Customer Test',
  nik: '45678910',
  email: 'testCustomer@mail.com',
  password: hashPassword('lala123'),
  address: 'Jl. Batu Gede Bogor',
  phone_number: '085712345678',
  dob: '1993-01-09',
  latitude: -6.531673,
  longitude: 106.796378,
}
```

- Success Response:

```
Status: 201 Created
Response Body:

{
  status: true,
  message: "Successfully Added User",
}
```

2. Login

```
Login with account that already register in database system
URL: /login
Method: POST
Required Auth: No
```

- Request Body:

```
{
 email: "<user email>",
 password: "<user password>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:

{
  email: "<user email>",
  access_token: "<user access_token>"
}
```

### ORDERS

1. Create Orders

```
Create new order
URL: /orders
Method: POST
Required Auth: Yes(only for customer)
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Request Body:

```
{
  date_swab: "<new date swab>",
}
```

- Success Response:

```
Status: 201 Created
Response Body:

{
    "success": true,
    "message": "Successfully placed order",
    "order": {
        "id": 1,
        "UserId": 2,
        "status_payment": "Belum bayar",
        "status_swab": "Menunggu",
        "type_swab": "PCR",
        "date_swab": "2021-07-31T00:00:00.000Z",
        "updatedAt": "2021-07-30T00:34:37.195Z",
        "createdAt": "2021-07-30T00:34:37.195Z"
    }
}
```

2. Get Orders for Customers

```
Get all orders from database
URL: /orders
Method: GET
Required Auth: Yes (only for customer role, orders belongs to current user loggin only)
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:


{
    "success": true,
    "data": {
        "orders": [
            {
                "id": 1,
                "status_payment": "Belum bayar",
                "status_swab": "Positif",
                "type_swab": "PCR",
                "date_swab": "2021-07-31T00:00:00.000Z",
                "UserId": 2,
                "createdAt": "2021-07-30T00:34:37.195Z",
                "updatedAt": "2021-07-30T00:50:15.167Z",
                "Live_Tracking": {
                    "id": 1,
                    "latitude": 0,
                    "longitude": 0,
                    "OrderId": 1,
                    "createdAt": "2021-07-30T00:50:15.166Z",
                    "updatedAt": "2021-07-30T00:50:15.166Z"
                },
                "Location_Logs": [],
                "User": {
                    "id": 2,
                    "name": "testCus",
                    "nik": "1222222",
                    "role": "Customer",
                    "email": "testcus@mail.com",
                    "address": "Jl. Bogor",
                    "phone_number": "3333333333333",
                    "dob": "1994-01-09T00:00:00.000Z",
                    "latitude": -6.531673,
                    "longitude": 106.796378,
                    "createdAt": "2021-07-30T00:34:22.818Z",
                    "updatedAt": "2021-07-30T00:34:22.818Z"
                }
            },
            {
                "id": 2,
                "status_payment": "Belum bayar",
                "status_swab": "Menunggu",
                "type_swab": "PCR",
                "date_swab": "2021-08-31T00:00:00.000Z",
                "UserId": 2,
                "createdAt": "2021-08-01T12:25:23.326Z",
                "updatedAt": "2021-08-01T12:25:23.326Z",
                "Live_Tracking": null,
                "Location_Logs": [],
                "User": {
                    "id": 2,
                    "name": "testCus",
                    "nik": "1222222",
                    "role": "Customer",
                    "email": "testcus@mail.com",
                    "address": "Jl. Bogor",
                    "phone_number": "3333333333333",
                    "dob": "1994-01-09T00:00:00.000Z",
                    "latitude": -6.531673,
                    "longitude": 106.796378,
                    "createdAt": "2021-07-30T00:34:22.818Z",
                    "updatedAt": "2021-07-30T00:34:22.818Z"
                }
            }
        ]
    }
}
```

3. Get Orders for Admin

```
Get all orders from database
URL: /orders
Method: GET
Required Auth: Yes (only for admin role)
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:
{
    "success": true,
    "data": {
        "orders": [
            {
                "id": 2,
                "status_payment": "Belum bayar",
                "status_swab": "Menunggu",
                "type_swab": "PCR",
                "date_swab": "2021-08-31T00:00:00.000Z",
                "UserId": 2,
                "createdAt": "2021-08-01T12:25:23.326Z",
                "updatedAt": "2021-08-01T12:25:23.326Z",
                "Live_Tracking": null,
                "Location_Logs": [],
                "User": {
                    "id": 2,
                    "name": "testCus",
                    "nik": "1222222",
                    "role": "Customer",
                    "email": "testcus@mail.com",
                    "address": "Jl. Bogor",
                    "phone_number": "3333333333333",
                    "dob": "1994-01-09T00:00:00.000Z",
                    "latitude": -6.531673,
                    "longitude": 106.796378,
                    "createdAt": "2021-07-30T00:34:22.818Z",
                    "updatedAt": "2021-07-30T00:34:22.818Z"
                }
            },
            {
                "id": 1,
                "status_payment": "Belum bayar",
                "status_swab": "Positif",
                "type_swab": "PCR",
                "date_swab": "2021-07-31T00:00:00.000Z",
                "UserId": 2,
                "createdAt": "2021-07-30T00:34:37.195Z",
                "updatedAt": "2021-07-30T00:50:15.167Z",
                "Live_Tracking": {
                    "id": 1,
                    "latitude": 0,
                    "longitude": 0,
                    "OrderId": 1,
                    "createdAt": "2021-07-30T00:50:15.166Z",
                    "updatedAt": "2021-07-30T00:50:15.166Z"
                },
                "Location_Logs": [],
                "User": {
                    "id": 2,
                    "name": "testCus",
                    "nik": "1222222",
                    "role": "Customer",
                    "email": "testcus@mail.com",
                    "address": "Jl. Bogor",
                    "phone_number": "3333333333333",
                    "dob": "1994-01-09T00:00:00.000Z",
                    "latitude": -6.531673,
                    "longitude": 106.796378,
                    "createdAt": "2021-07-30T00:34:22.818Z",
                    "updatedAt": "2021-07-30T00:34:22.818Z"
                }
            }
        ]
    }
}
```

4. Get Detail Order

```
Get detail order by specific id
URL: /orders/:id
Method: GET
Required Auth: Yes (only for admin role)
```

- Params:

```
id: integer
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:
{
    "success": true,
    "data": {
        "order": {
            "id": 1,
            "status_payment": "Belum bayar",
            "status_swab": "Positif",
            "type_swab": "PCR",
            "date_swab": "2021-07-31T00:00:00.000Z",
            "UserId": 2,
            "createdAt": "2021-07-30T00:34:37.195Z",
            "updatedAt": "2021-07-30T00:50:15.167Z",
            "Live_Tracking": {
                "id": 1,
                "latitude": 0,
                "longitude": 0,
                "OrderId": 1,
                "createdAt": "2021-07-30T00:50:15.166Z",
                "updatedAt": "2021-07-30T00:50:15.166Z"
            },
            "User": {
                "id": 2,
                "name": "testCus",
                "nik": "1222222",
                "role": "Customer",
                "email": "testcus@mail.com",
                "address": "Jl. Bogor",
                "phone_number": "3333333333333",
                "dob": "1994-01-09T00:00:00.000Z",
                "latitude": -6.531673,
                "longitude": 106.796378,
                "createdAt": "2021-07-30T00:34:22.818Z",
                "updatedAt": "2021-07-30T00:34:22.818Z"
            }
        }
    }
}
```

5. Update Order

```
Update order by specific id
URL: /orders/:id
Method: PUT
Required Auth: Yes (only for admin role)
```

- Params:

```
id: integer
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Request Body:

```
{
  status_payment: "<new payment status>",
  status_swab: "<new status swab>",
}
```

- Success Response:

```
Status: 200 OK
Response Body:
{
    "success": true,
    "message": "Successfully updated order"
}

note:
if status_swab = "Positif", maka create Live_Tracking untuk mendeteksi keberadaan user positif
Live_Tracking.create({ latitude: 0, longitude: 0, OrderId: order.id })
jika "Negatif" maka tidak usah di pantau dan deteksi keberadaannya
```

6. Delete Order

```
Delete order by specific id
URL: /orders/:id
Method: DELETE
Required Auth: Yes (only for admin role)
```

- Params:

```
id: integer
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:

{
    "success": true,
    "message": "Successfully deleted order"
}

```

### LIVE TRACKING

1. Update Live Tracking

```
Update Lice Tracking by specific id
URL: /tracking/:id
Method: PUT
Required Auth: Yes (only for admin role)
```

- Params:

```
id: integer
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Request Body:

```
{
  "latitude": <new latitude>,
  "longitude": <new longitude>
}

```

- Success Response:

```
Status: 200 OK
Response Body:
{
  "success": true,
  "message": "Successfully updated"
}

note:
if status_swab = "Positif", maka create Live_Tracking untuk mendeteksi keberadaan user positif
Live_Tracking.create({ latitude: 0, longitude: 0, OrderId: order.id })
jika "Negatif" maka tidak usah di pantau dan deteksi keberadaannya
```

2. Get Detail Live Tracking

```
Get live tracking by specific id
URL: /tracking/:id
Method: GET
Required Auth: Yes (only for admin role)
```

- Params:

```
id: integer
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Success Response:

```
Status: 200 OK
Response Body:
{
    "success": true,
    "data": {
        "id": 1,
        "latitude": 0,
        "longitude": 0,
        "OrderId": 1,
        "createdAt": "2021-07-29T19:32:44.148Z",
        "updatedAt": "2021-07-29T19:32:44.148Z",
        "Order": {
            "id": 1,
            "status_payment": "Belum bayar",
            "status_swab": "Negatif",
            "type_swab": "PCR",
            "date_swab": "2021-07-30T00:00:00.000Z",
            "UserId": 2,
            "createdAt": "2021-07-29T18:26:37.120Z",
            "updatedAt": "2021-07-29T20:04:10.058Z",
            "User": {
                "id": 2,
                "name": "testCus",
                "nik": "1222222",
                "role": "Customer",
                "email": "testcus@mail.com",
                "address": "Jl. Bogor",
                "phone_number": "3333333333333",
                "dob": "1994-01-09T00:00:00.000Z",
                "latitude": -6.531673,
                "longitude": 106.796378,
                "createdAt": "2021-07-29T18:26:18.835Z",
                "updatedAt": "2021-07-29T18:26:18.835Z"
            }
        }
    }
}
```

`

### TRANSACTIONS

1. Create Transaction to Payment Gateway (midtrans)

```
Create new transaction to midtrans
URL: /midtrans/createTransaction
Method: POST
Required Auth: Yes(only for customer)
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Request Body:

```
const parameter = {
  "transaction_details": {
    "order_id": "<order id>",
    "gross_amount": "<PCR price>"
  },
  "credit_card": {
    "secure": true
  },
  "customer_details": {
    "name": "<customer name>",
    "phone": "<customer phone>",
    "email": "<customer email>",
    "address": "<customer address>"
  }
};
```

- Success Response:

```
Status: 200 OK
Response Body:

{
  token: "<string of token>",
  redirect_url: "<redirect link midtrans>"
}

```

2. Create transaction and record transaction in database

```
Create new record transaction
URL: /midtrans/notification/handling
Method: POST
Required Auth: No
```

- Request Headers:

```
{
  access_token: "<user access_token>"
}
```

- Request Body:

```
{
  "transaction_time": "2021-08-01 00:31:49",
  "transaction_status": "settlement",
  "transaction_id": "025f506c-cc41-4534-9325-6f1a96a087e8",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "9fd205377440b64e7a439c93e8e6970ea43b2d6a9048ab0b7fd3685d2fa9c4cf07b7695dd614ec975f314947d30fef59af0b2c7d41c5507785c80ddeb2b33ffe",
  "settlement_time": "2021-08-01 00:31:59" || null,
  "payment_type": "bca_klikpay",
  "order_id": "4",
  "merchant_id": "G600070340",
  "gross_amount": "200000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "112233" || null
}
```

- Success Response:

```
Status: 200 OK
Response Body:

{
  OK : "OK"
}

```

# RESTful Error Message

1. Response Error (400) Bad Request - SequelizeValidationError

- Response Body:

```
{
  status: 400,
  message: "<array of error message>"
}
```

2. Status 400 Bad Request - SequelizeDatabaseError

- Response Body:

```
{
  status: 400,
  message: "<array of error message>"
}
```

3. Status 400 Bad Request - SequelizeUniqueConstraintError

- Response Body:

```
{
  status: 400,
  message: "<array of error message>"
}
```

4. Response Error (400) Bad Request - Invalid email or password

- Response Body:

```
{
  status: 400,
  message: ['Invalid email or password']
}
```

5. Status 401 JsonWebTokenError

- Response Body:

```
{
  status: 401,
  message: ['UnAuthenticated - You are not logged in']
}
```

6. Status 403 Forbidden UnAuthorized - Access is denied

- Response Body:

```
{
  status: 403,
  message: ['UnAuthorized - Access is denied']
}
```

7. Status 404 Order Not Found

- Response Body:

```
{
  status: 404,
  message: ['Order not found']
}
```

8. Status 404 Location Not Found

- Response Body:

```
{
  status: 404,
  message: ['Location not found']
}
```

9. Status 500 Internal server errors

- Response Body:

```
{
  status: 500,
  message: ['Internal server errors']
}
```
