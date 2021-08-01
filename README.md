# Movie Search App


## Pre-requisites

1. Install `Docker` and `docker-compose`.


## Setup
  
1. Clone the repository 
2. Switch to the project root directory
3. Start the project with a single command `docker-compose up`

    a. This will start the application with a `pre-start` by running all the test cases for the application.

    b. Once the tests are done, the application will start running on port `3000`.
4. Use the below `curl` request to get the list of Movies with the keyword. Use different keywords to get the results.

        curl --location --request GET 'http://localhost:3000/api/search?keyword=Harry'

                  
## Project Details

1. The project uses `express` framework and `express-generator` npm packacge to generate the boilerplate code for the Rest API framework.
2. The project uses `docker-compose` to run `redis` and the `express` application in a single container.
3. The keyword searched is first checked into the redis cache. If the data is not found in the cache then the data is requested externally from the OMDB API's and again the response is cached in redis with a expiry time of 10 minutes.
4. This expiry time is an assumption of 10 minutes and can be changed based on the different use cases.


## Enhancements that can be Done

1. The caching of data in the cache layer can be improved with some better logic.