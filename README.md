![alt text](https://image.flaticon.com/icons/png/128/919/919825.png 'Logo Node')

# nodejs-ourTBoard

> Read me [WIP - Work in progress]

This project was developed to practice NodeJS with Express, and to train the programming logic. The project was a challenge that we found to deepen our knowledge.

Our goal with this project was to reproduce a backend that can simulate Trello's actions. The system has JWT authentication, each user can create his board and create tasks for the board, perform ordering and perform the flow of a kanban board

## Api endpoints:

### Root Route

| Method  | Route |             |
| ------- | ----- | ----------- |
| **GET** | `/`   | returns WIP |

### Session Controller

| Method   | Route      |             |
| -------- | ---------- | ----------- |
| **POST** | `/session` | returns WIP |

### User Routes

| Method     | Route        |             |
| ---------- | ------------ | ----------- |
| **GET**    | `/users`     | returns WIP |
| **POST**   | `/users`     | returns WIP |
| **GET**    | `/users/:id` | returns WIP |
| **PUT**    | `/users`     | returns WIP |
| **DELETE** | `/users/:id` | returns WIP |

### Board Routes

| Method     | Route         |             |
| ---------- | ------------- | ----------- |
| **GET**    | `/boards`     | returns WIP |
| **GET**    | `/boards/:id` | returns WIP |
| **POST**   | `/boards`     | returns WIP |
| **PUT**    | `/boards`     | returns WIP |
| **DELETE** | `/boards/:id` | returns WIP |

### UserBoard Routes

| Method     | Route             |             |
| ---------- | ----------------- | ----------- |
| **GET**    | `/userboards`     | returns WIP |
| **POST**   | `/userboards`     | returns WIP |
| **DELETE** | `/userboards/:id` | returns WIP |

### Userboard and List nested in Board Route a board

| Method     | Route                          |             |
| ---------- | ------------------------------ | ----------- |
| **GET**    | `/boards/:board_id/usersboard` | returns WIP |
| **GET**    | `/boards/:board_id/lists`      | returns WIP |
| **POST**   | `/boards/:board_id/lists`      | returns WIP |
| **DELETE** | `/boards/:board_id/lists/:id`  | returns WIP |
| **PUT**    | `/boards/:board_id/lists`      | returns WIP |

### Tasks from a board

| Method  | Route                     |             |
| ------- | ------------------------- | ----------- |
| **GET** | `/boards/:board_id/tasks` | returns WIP |

### Task Details

| Method     | Route                          |             |
| ---------- | ------------------------------ | ----------- |
| **GET**    | `/boards/lists/tasks/:id`      | returns WIP |
| **POST**   | `/boards/lists/:list_id/tasks` | returns WIP |
| **PUT**    | `/boards/lists/tasks/:id`      | returns WIP |
| **DELETE** | `/boards/lists/tasks/:id`      | returns WIP |
