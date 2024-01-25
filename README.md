# TaskIntern

### Instruction to Set up locally

1 Run cmd (git clone https://github.com/Nipunkhattri/TaskIntern.git)</br>
2 Oen folder</br>
<ul>
<li>Run cmd (npm install)</li>
<li>Create .env and gave the MongoDB Url and secret key</li>
<li>Run cmd (nodemon ./server.js)</li>
</ul>
Now you can check the Api in Postman .


### Create RESTful endpoints for the API using Node JS
1. Create a new task
2. Retrieve a list of all tasks
3. Retrieve a single task by ID
4. Update an existing task (including marking as completed)
5. Delete a task by ID
6. User Authentication
7. Task Status

Middleware functions to handle common tasks such as error handling, request logging, and authentication checks.

## Tech Stack:

Node JS, Express JS , MongoDB , Postman 

## Postman

## API Endpoints:

### User Route

#### Register The User

```http
POST /auth/register
```

Request Body
```json
{
    "email":"Nipun@gmail.com",
    "Password":"Nipun"
}
```

Response
```json
{
    "message": "Registered Successfully"
}
```

#### Login The User

```http
POST /auth/login
```

Request Body
```json
{
    "email":"Nipun@gmail.com",
    "Password":"Nipun"
}
```
Response
```json
{
  "token":"<ACCESS_TOKEN>",
  "message":"Login successfull .."
}
```

### Tasks Route

#### Create The Task

```http
POST /api/CreateTask
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |


Request Body
```json
{
   "title":"hbbcasbcja",
   "description":"abshbasjcbsjbcaj",
   "assigneduser":"Nipun",
   "DueDate":"27/11/23"
   "completionStatus":"Not Done"
}
```
Response
```json
{
    "Added Successfully"
}
```

#### Getting All the Tasks

```http
GET /api/GetAllTask
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |


Response
```json
[
    {
        "_id": "6561bd13a01c15b6b5dd518e",
        "title": "aajcscmaks",
        "description": "shbdhbsbvdjsjd",
        "assigneduser": "ssjsnjdnsndjvns",
        "DueDate": "27/11/2023",
        "completionStatus": "Not Done",
        "__v": 0
    }
]
```

#### Getting the Single Task By ID

```http
GET /api/GetSingleTask/<TaskId:int>
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "_id": "6561bd13a01c15b6b5dd518e",
    "title": "aajcscmaks",
    "description": "shbdhbsbvdjsjd",
    "assigneduser": "ssjsnjdnsndjvns",
    "DueDate": "27/11/2023",
    "completionStatus": "Not Done",
    "__v": 0
}
```

#### Updating the Specific Task By ID

```http
PATCH /api/UpdateTask/<TaskId:int>
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "message":"Task Updated"
}
```

#### Deleting the Task By Id

```http
DELETE /api/DeleteTask/<TaskId:int>
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "message":"Deleted Successfully"
}
```

#### Getting the Task Status

```http
GET /api/TaskStatus
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "completedTasks": [],
    "pendingTasks": [
        {
            "_id": "6561bd13a01c15b6b5dd518e",
            "title": "aajcscmaks",
            "description": "shbdhbsbvdjsjd",
            "assigneduser": "ssjsnjdnsndjvns",
            "DueDate": "27/11/2023",
            "completionStatus": "Not Done",
            "__v": 0
        }
    ]
}
```

