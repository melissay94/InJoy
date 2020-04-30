# InJoy
Web Application Project for [General Assembly's](https://generalassemb.ly/) internal 24 hour 'Sparks Joy' Hackathon. Working in a team of four, our decided direction was to create a mobile-first web application that provided users with a prompt for a fun task to complete and then upload a post about, from home. 

# Setup
1. npm install inside of the `/client` folder
2. npm install inside of the `/server` folder
3. run `npm start` inside of the `/client` folder
4. run `npx nodemon app.js` or just `nodemon app.js` inside the `server` folder
5. All done!

# Team
We worked in a team of four made up of two User Experience Designers and two Developers.  
[Signe Bergman - UX Designer](https://www.linkedin.com/in/signebergman/)  
[Jay-Kwon James Park - UX Designer](https://www.linkedin.com/in/jaykwonjpark/)  
[Erik Heikkila - Front End Web Developer](https://www.linkedin.com/in/erik-hei/)  
[Melissa Young - Front End Developer](https://www.linkedin.com/in/melissadcyoung/)  

# Hackathon Research
- Created and sent out a quick 5 question survey to help figure out audience, age, interests, and what people have readily available at home in terms of hobby/activity related items. Also included open ended questions about activities or skills people wanted to try out or develop, but just hadn't gotten around to yet.
- Competetive analysis with similar social applications such as Instagram, Tinder, and Bumble.
- Created a user journey map

# Hackathon MVP:
1. Have a sign up and login flow
2. Have user's able to select a prompt
3. Have user able to post about the prompt

# Accomplished Goals:
1. User's were able to sign up for a new account, though for the hackathon, we saved all credentials to a JSON file in plain text and also did not persist the session.
2. Since we did save credentials to the file, users were able to log back in after signing up.
3. Prompts were provided for a user to choose from, one at a time, so user's could either decide if that prompt interested them or not. If not, a new prompt replaced the previous one. Currently, all prompts are sourced from the [Bored API](https://www.boredapi.com/), so while we do have quite a few of them, they are not all prompts that can be accomplished while remaining at home.
4. User's were able to select a prompt and then post about it. Currently you can supply the app with a title, a description, and a link to an image. After submitting a post, that post then displays on the feed.

# Current Product Images  
<img src="https://github.com/melissay94/InJoy/blob/master/injoyHomepage.9e630e3e.png" width="250" > <img src="https://github.com/melissay94/InJoy/blob/master/injoySignupflow.432d0ddf.png" width="250" >  

<img src="https://github.com/melissay94/InJoy/blob/master/injoyFlashCard.f007b864.png" width="250"> <img src="https://github.com/melissay94/InJoy/blob/master/injoyFeed.2d2911bc.png" width="250" >


# Future Goals
- Conduct more user research through an additional survey to gain a deeper insight into what features in a social application are most pertinant to a user.
- Conduct more competative analysis of different platforms and what they offer that users like.

# Improvements Going Forward
- Complete user research to see what social features users would find the most beneficial in our application.
- Use Bcrypt to help add a layer of security for passwords
- Add the use of the [Cloudinary API](https://cloudinary.com/) to upload and store pictures from users so that they can add images more than just by supplying a url.
- Replace JSON files with PostgresSQL.
- Add Sequelize as our ORM
- Replace backend currently using RESTful routing with GraphQL.
