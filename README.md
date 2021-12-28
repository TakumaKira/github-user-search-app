# Frontend Mentor - GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - GitHub user search app solution](#frontend-mentor---github-user-search-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Useful resources](#useful-resources)
  - [Author](#author)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  - [Available Scripts](#available-scripts)
    - [`yarn start`](#yarn-start)
    - [`yarn test`](#yarn-test)
    - [`yarn cypress:open`](#yarn-cypressopen)
    - [`yarn build`](#yarn-build)
    - [`yarn eject`](#yarn-eject)
  - [Learn More](#learn-more)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences. _Hint_: Research `prefers-color-scheme` in CSS.

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [GitHub](https://github.com/TakumaKira/github-user-search-app)
- Live Site URL: [Netlify](https://gallant-ramanujan-197877.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup(a bit)
- CSS custom properties
- Flexbox
- [React](https://reactjs.org/) - JS library
- TypeScript
- Jest
- Enzyme
- Cypress

### What I learned

- How to build E2E test using Cypress
- How to use enzyme(shallow and dive is mostly needed) with Jest

### Useful resources

- [Building a Switchable Multi-Color Theme using React - Section](https://www.section.io/engineering-education/building-a-switchable-multi-color-theme-with-react/) - This helped me for wrapping up context providers as a single component.
- [Get viewport/window height in ReactJS - Stack Overflow](https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs) - This helped me for building a custom hook responding to an event.
- [Mocking methods which are not implemented in JSDOM](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom) - This helped me for mocking `window.matchMedia` property in unit testing with Jest.

## Author

- Website - [TakumaKira@GitHub](https://github.com/TakumaKira)
- Frontend Mentor - [@TakumaKira](https://www.frontendmentor.io/profile/TakumaKira)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the Jest test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn cypress:open`

Launches the Cypress test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
