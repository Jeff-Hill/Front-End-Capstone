Welcome to FireFuel

Firefuel is an app to connect sellers of firewood with potential customers. The goal is to allow a seller to have access to customers and not have to sit on the side of the road waiting for a customer to pull over and purchase wood from them.

**New User**
As a first time user you will be asked to register as a Burner(Buyer) or Chopper(Seller).

Depending on which type of user you register as you will be directed to a profile creation page where you can enter in your personal details.

Once your profile is created you will be directed to a page listing the users of the opposite type i.e. A burner(buyer) will be directed to the list of choppers(sellers).

The filter will allow you to find people located in your city. Choppers can be filtered by whether they are willing to deliver their wood and Burners can be filterd by whether they are looking to purchase wood.

Checking the Favorite box will populate that user into your Favorites list

To Edit your profile click on the Edit Profile button in the upper right corner.

You can Delete your profile from the Edit profile page as well.

Test and Develop
You will need to NPM will to get the app to run on your machine. Fork this repository and clone it down

Locally run:
npm install
in the root directory of the project.

Once everything has installed and updated:
npm start
You will also need json-server for the mock database. This can be installed via npm as well. From the root directory navigate to the directory titled api and execute the following to serve up the data for the app utilizing JSON server:

json-server -p 5002 -w firefuel.json
The database has been popluated with some starter data.

You can also register a new user to get a blank canvas to work with if you wish to manipulate data.

Please feel free to contact me regarding any questions or concerns.


