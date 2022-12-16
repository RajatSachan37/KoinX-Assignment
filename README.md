# KoinX Assignment
Deploy link: https://koinx-assignment.up.railway.app

## Tools/Technologies Used
- Node.js
- Express.js
- Mongoose ODM
- MongoDB Atlas

## Task-1
- API endpoint:
```bash
  https://koinx-assignment.up.railway.app/api/v1/fetch-transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d
```
- This api takes address of a user, fetches "Normal" transactions for this user and stores these transactions against address in the database. Then returns these transaction details as output.

## Task-2
- The getEthereumDetails function inside the userController.js file fetches the price of ethereum and stores it in the database. It is called every 10 minutes using setInterval method.
```bash
  setInterval(userController.getEthereumDetails, 600000);
```

## Task-3
- API endpoint:
```bash
  https://koinx-assignment.up.railway.app/api/v1/current-balance/0xce94e5621a5f7068253c42558c147480f38b5e0d
```
- This api takes address of the user, and returns the current balance as well as the current price of ether as output.