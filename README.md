# webdev_finalproject

Welcome to Rusty Spur, a dusty frontier town where you, the new sheriff, are on a mission to bring justice to the Wild West! The notorious One-Eyed Bill is wanted for murder, but as you chase him down through saloons, gold mines, and general stores, you quickly realize things ain’t always what they seem. With a cast of quirky townsfolk—including a jittery bartender, a drunk named Old Gus, and the accident-prone Tumbleweed Tim—you’ll have to navigate rumors, wild chases, and ridiculous feuds to uncover the truth. Is Bill really a cold-blooded killer, or is this all one big, hilarious misunderstanding? The fate of Rusty Spur rests in your hands, Sheriff—so saddle up and choose wisely!

New Sheriff in town is a "create your own adventure" story using HTML, CSS, and Javascript. This is the final project in the Web Development course offered by Code:You.

- The main page is served by the API. To run the API and see the page, perform the following steps:
    - Open a console at the same folder as the package.json
    - Run `npm install` to get the node packages
    - Run `npm run start` to start the server/API
    - In your browser, go to localhost:3000/main to see the page
        - This is the preferred way to view the page and this was done because LiveServer kept reloading the page every time the API wrote to the JSON. 
- To see how the project lets you pick up where you left off, start a story and then go back to `localhost:3000/main`.
    - Click “view previous saves” and pick the Sheriff character that you created. It should have a “Continue” button if the story wasn’t finished. 
    - This will bring you back to where you left off.


- Code:You requirements met:
    - Use arrays or objects to store and retrieve information displayed in your app:
        - Done as part of showing the user the story.
        - Done in the Server/API to operate on a JSON file.
    - Analyze text and display useful information about it:
        - In the Sheriff Character creation, if the user starts to type a name that is too long (22 characters), the character count will start to be shown on the page. This count will update dynamically as the user types.
    - Retrieve data from a third-party API and use it to display something within your app:
        - Saved characters from the express API.
    - Create a form and store the submitted values using an external API:
        - Saving characters to the express API.
    - Persist data to an external API and make the stored data accessible in your app:
        - Written to a JSON file in the express API. The API then sends this data back to the webpage.
    - Create a node.js web server using a modern framework (Express):
        - This was somehow easier than trying to use some of the “character” APIs available online.