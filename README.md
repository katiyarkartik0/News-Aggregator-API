# News-Aggregator-API
## Objective: 
Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

## Project Description: 
In this project, we created a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories, sources). The API will then fetch news articles from multiple sources using external news APIs (in this case https://newsapi.org). The fetched articles have been processed and filtered asynchronously based on user preferences.

## ROUTES
### POST /register
```req.body``` should be
```
{
  "username":"dummyInput",
  "password":"dummyPassword"
}
```
A validator checks if the username provided is unique to the database. If not it sends a status code 400. When the user registers for the first time the following record is generated.
```
{
    "userId": <uniqueId: from uuid.v4() is generated in the server>,
    "username": <username: provided in req.body>,
    "password": <password: hashed using bcrypt>,
    "preferences": [],
    "read": [],
    "favorites": [],
    "newsArticlesCacheDate": <new Date()>
}

```

### POST /login
```req.body``` should be
```
{
  "username":"dummyInput",
  "password":"dummyPassword"
}
```
* A validator checks if the username provided is already present in the database and if the password provided matches the user using ```bcrypt.compareSync```. If not it sends a status code 400. 
* a ```jwt token``` is generated using ```userId``` of the username and the API will then fetch news articles from multiple sources using external news APIs.
* client is served with 
```
{ 
  userData, 
  msg: "login successful", 
  accessToken: token
}
```

> Middlewares
> * verifyToken
>
> This function is a middleware function that hijacks every request made to access any resource and checks if the ```req.header("authorization")``` gives a token
> back. It then verifies that token with ```jwt.verify()``` and infuse ```req.id``` with userId of the username and ```req.verified = true```. On failing ```req.id > = null``` and ```req.verified = false``` with a ```req.msg```. Each successive controller recieves userId from this middleWare and checks if the request is
> verified by this middleware(```req.verify==true```).
>
> * updateNewsJSON
>
> This function is a middleware function that hijacks every request made to access any resource and checks if the last time when the news data was cached was how
> long ago. If the time exceeds more than a set amount of time(here 5 mins) the API will then fetch news articles from multiple sources using external news APIs,
> to chache the news again, followed by updating the ```"newsArticlesCacheDate"``` again.


### GET /preferences
Retrieve the news preferences for the logged-in user.

### PUT /preferences 
Update the news preferences for the logged-in user.
```req.body``` should be
```
{
  "preferences":[
    "entertainment",
    "business",
    "health",
    "science",
    "sports",
    "technology",
  ]
}
```
* A validator checks that the ```preferences``` array provided is a valid input and filters out the valid preferences into another array to update the data-base.

### GET /news
Fetches news articles based on the logged-in user's preferences.

### POST /news/:id/read 
Mark a news article as read, if the ```id``` provided is of the article category that is present in the ```preferences``` of the user.

### POST /news/:id/favorite
Mark a news article as favorite, if the ```id``` provided is of the article category that is present in the ```preferences``` of the user.

### GET /news/read
Retrieves all read news articles of the user.

### GET /news/favorites
Retrieves all favorite news articles of the user.

### GET /news/search/:keyword
Retrieves the news articles based on ```keyword```
