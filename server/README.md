## Layout Structure
```
ShebaPoint/server
│
├── server.js
├── db/
│   └── connect.js
├── routes/
│   ├── userRoutes.js
│   ├── doctorRoutes.js
│   └── patientRoutes.js
├── controllers/
│   ├── userController.js
│   ├── doctorController.js
│   └── patientController.js
└── .env
```
## Env Structure
```
MONGO_URI=mongodb://localhost:27017
DB_NAME=shebaPoint
PORT=5000
```

## Start
```
npm run dev
```