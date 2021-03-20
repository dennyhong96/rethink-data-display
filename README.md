### Notes / Room for improvements

- To start the project, download and run `npm install && npm run dev`
- I used faker.js to generate fake data records. You can find them in \_data directory. I have two API routes set up to access the data, `src/pages/api/users.js` is for returning the generated data with limit and skip parameters. `src/pages/api/search.js` is for returning search results.
- My current setup is simulating an offest based pagination.
- On page load, I am only fetching the records on first page and display on table. When user clicks 'next page' button, I am fetching the result of next page in background, then I put the results in the state (managed by a context implementing redux pattern), then shows the next page. When user navigate to a page that's previously loaded, no request will be made.
- I implemented one way of reducing server load when user is entering search term in the input bar, which is to debounce the api call. Given more time I plan to also implement a simple in memory key value 'cache' to store results of their respective serach term.
- Right now pagination is only implemented when showing 'all records', given more time I plan to also implement pagination on search results.
- As an indicator, whenever there's a network request in progress, you can see a loading spinner at top right cornor.

# Challenge #2

You have over a million rows of data. You need to display this data on a web page along with a search field. Update search results with each character entered by the user. Make sure to call out any assumptions and / or limitations in your solution.
