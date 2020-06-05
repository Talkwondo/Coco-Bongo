# Coco-Bongo
Just a small app for see the top 20 movies!

# What this app does?
This app for a studying purpose. links to an api that shows the top 20 movies rated by users, I used these tools below:
1. Login through social network (Facebook and Google).
2. Using Redux to handle states.
3. Using Redux-Thunk to handle async function from moviedb API.
4. Ui was designed from React-Native Elements library.
5. App works on both iPhone and Android devices.

![App](app.png)

# This is a React-Native App
To run the app you need download react native cli tools, clone this repo and install the packages and the dependencies using yarn or npm, use npm fix audit if you have problems like deprecated dependencies.

# The missing parts
Due to express deploy there are no server-side components to handle caching and database memory, thus every time the app is refreshed the login needs to be done.

