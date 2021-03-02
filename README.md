This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Approach
I used Create React App to bootstrap this application. My initial approach was to use React Redux and Redux Saga but as I worked through the task it was determined that neither of these was necessary.

The `<MyApp />` component acts as a pseudo HOC and all app state is managed here. The data needed for this app is retrieved inside of `componentDidMount` and the players list is stored in the `MyApp.state`. This state is passed as props to each necessary component. There's no issue of prop drilling here as the component composition doesn't go deeper than 2 levels, and the props passed are used necessary for each component.

## Using the app
The user is given the option to choose between 2 and 11 (20% of the total list) players to compare. With each guess, the total guesses counter is increment and with each correct guess the correct guess counter is incremented. After each guess user will be prompted with a notification of wether the choice was correct or not. When users reaches 10 correct guesses the game will reset and the couters are zeroed out.

## Running the app
All CRA scripts are still available.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.


## Testing the Github Workflow
Should trigger when pushed to master
