# Audice Senior Backend Engineer Case Study

## Getting Started:

    - Clone this repository to your local machine.
    - Navigate to the project directory and run npm install to install the necessary dependencies.


## Running the Application on local machine

### development env:

    - Run:
        npm run dev

*The server should now be running on http://localhost:3001*

### production env:

    - Run:
        npm run start

*The server should now be running on http://localhost:3000*



## Endpoints(Samples)

    - URI: /type
        - Description: Saves a Type
        - Method: POST
        - Request Body: {
            "name": "blue",
            "color": "X"
    }
    - Response: {
        "status": 201,
        "message": "success",
        "data": {
            "id": "8d8742a1-403d-4c40-8311-de648b22b9bf",
            "name": "blue",
            "color": "X",
            "updatedAt": "2023-04-17T18:07:10.597Z",
            "createdAt": "2023-04-17T18:07:10.597Z"
        }
    }

    - URI: /type-effectiveness
    - Description: Saves a Type
    - Method: POST
    - Request Body: {
        "sourceId": "8d8742a1-403d-4c40-8311-de648b22b9bf",
        "targetId": "f5f2075c-ce4b-49ce-882e-6491009d18e9",
        "effectiveness": 2
    }
    - Response: {
        "status": 201,
        "message": "success",
        "data": {
            "id": "8d8742a1-403d-4c40-8311-de648b22b9bf",
            "sourceId": "8d8742a1-403d-4c40-8311-de648b22b9bf",
            "targetId": "f5f2075c-ce4b-49ce-882e-6491009d18e9",
            "effectiveness": 2
            "updatedAt": "2023-04-17T18:07:10.597Z",
            "createdAt": "2023-04-17T18:07:10.597Z"
        }
    }



## Testing

    Unit Tests: 
        - Run:
            npm test
    Integration Tests:
        - Run:
            npm run test:integration


## API Docs

NB: make sure the server is running
- http://localhost:3000/docs/