# co.Clinic-server

-

## Project setup

```
npm install
```

### Run server

# Development

```
npm run dev
```

# Production

```
npm start
```

### Deployment

Frontend:
Backend:

### Routes

/register (Post)
/login (Post)
/orders (Post)
/orders:id (Delete)
/orders/payment/:id (Patch)
/orders/status/:id (Patch)
/orders (Get)
/orders/status/:id (Get)
/location (Post)
/location/:id (Get)

## **_Register_**

Returns new user.

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  ```
    {
      nik: req.body.nik,
      name: req.body.name
      dob: req.body.dob
      email: req.body.email
      phone_number: req.body.phone_number
      address: req.body.address
      latitude: req.body.latitude
      logitude: req.body.logitude
    }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Succesfully Added User"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    { errors : ["SequelizeValidationError"] }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : ["Internal Server Error"] }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "POST",
  	url: `http://localhost:3000/register`,
    headers: {
      "Content-Type": "application/json"
    }
  	data: {
      nik,
      name,
      dob,
      email,
      phone_number,
      address,
      latitude,
      logitude,
  	},
  });
  ```

---

## **_Login_**

Returns new user.

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  ```
    {
      email: req.body.email,
      password: req.body.password
    }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "access_token": <user access_token>
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Invalid email and password"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : ["Internal Server Error"] }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "POST",
  	url: `http://localhost:3000/login`,
    headers: {
      "Content-Type": "application/json"
    }
  	data: {
  		email,
  		password,
  	},
  });
  ```

---

## **_Post Orders - Client_**

Returns order message.

- **URL**

  /orders

- **Method:**

  `POST`

- **Auth**

  `Client`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  None

- **Data Params**

  **Required:**

  ```
    {
      date: req.body.date
    }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Successfully placed order"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad Request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "POST",
  	url: `http://localhost:3000/order`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfasdadf"
    }
  	data: {
  		date,
  	},
  });
  ```

---

## **_Patch Payment - Admin_**

Returns payment message.

- **URL**

  /orders/payment/:id

- **Method:**

  `PATCH`

- **Auth**

  `Admin`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  id: order_id

- **Data Params**

  **Required:**

  ```
    {
      status_payment: req.body.status_payment
    }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Successfully update payment"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "POST",
  	url: `http://localhost:3000/orders/payment/:id`,
    headers: {
      "Content-Type": "application/json"
    }
  	data: {
  		date,
  	},
  });
  ```

---

## **_Patch Swab Status - Admin_**

Returns update message.

- **URL**

  /orders/status/:id

- **Method:**

  `PATCH`

- **Auth**

  `Admin`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  order id

- **Data Params**

  **Required:**

  ```
    {
      status_swab: req.body.status_swab
    }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Successfully update swab"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "PATCH",
  	url: `http://localhost:3000/order/status/:id`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  	data: {
  		status_swab,
  	},
  });
  ```

---

## **_Delete Order - Admin_**

Returns update message.

- **URL**

  /orders/:id

- **Method:**

  `Delete`

- **Auth**

  `Admin`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  order id

- **Data Params**

  **Required:**

  ```
    None
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Successfully delete order"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "PATCH",
  	url: `http://localhost:3000/order/status/:id`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  });
  ```

---

## **_Get Orders - Admin_**

Returns orders.

- **URL**

  /orders

- **Method:**

  `GET`

- **Auth**

  `Admin`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  none

- **Data Params**

  **Required:**

  ```
  none
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "data": {
                  orders: [
                    {
                      User,
                      status_payment,
                      status_swab,
                      type_swab,
                      date_swab,
                      Location,
                      LocationLog,
                      CreatedAt,
                      UpdatedAt
                    },
                    {
                      User,
                      status_payment,
                      status_swab,
                      type_swab,
                      date_swab,
                      Location,
                      LocationLog,
                      CreatedAt,
                      UpdatedAt
                    }
                  ]
                }
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "GET",
  	url: `http://localhost:3000/order`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  });
  ```

---

## **_Get Status Info - Client/Admin_**

Returns update message.

- **URL**

  /orders/status/:id

- **Method:**

  `GET`

- **Auth**

  `Client` or `Admin`
  `Order`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "data": {
          "status_swab": <status_swab>
        }
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad request""Successfully update swab status"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "GET",
  	url: `http://localhost:3000/order/status/:id`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  	data: {
  		date,
  	},
  });
  ```

---

## **_Post Location - Client_**

Returns message.

- **URL**

  /location

- **Method:**

  `POST`

- **Auth**

  `Client`
  `Order`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  None

- **Data Params**

  **Required:**

  ```
    {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "Location updated"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Invalid email and password"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "post",
  	url: `http://localhost:3000/location`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  	data: {
  		latitude,
  		longitude,
  	},
  });
  ```

---

## **_Get Location - Admin_**

Returns message.

- **URL**

  /location/:id

- **Method:**

  `GET`

- **Auth**

  `Admin`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  :id

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "data": {
          "latitude": 107.010191,
          "longitude": -100.001010
        }
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad Request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "post",
  	url: `http://localhost:3000/location/:id`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
  });
  ```

---

## **_Update Location - Client_**

Returns message.

- **URL**

  /location/:id

- **Method:**

  `UPDATE`

- **Auth**

  `Client`

- **Header**

  **Required:**

  ```
    {
      access_token: req.headers.access_token
    }
  ```

- **URL Params**

  :id

- **Data Params**

  {
  lattitude: <lattitude>
  longitude: <longitude>
  }

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```
    {
        "success": true,
        "message": "successfully updated"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```
    {
      "errors": [
          "Bad Request"
      ]
    }
    ```

  OR

  - **Code:** 500 <br />
    **Content:**
    ```
    { errors : "Internal Server Error" }
    ```

- **Sample Call:**

  ```javascript
  axios({
  	method: "post",
  	url: `http://localhost:3000/location/:id`,
    headers: {
      "Content-Type": "application/json"
      "access_token": "adsfasdfasdfadfadfasdf"
    }
    data: {
      "latitude": 107.000000,
      "longitude": 108.00000
    }
  });
  ```

---
