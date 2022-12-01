# Sunmait Career Day App

## TODO

- add some unit test examples

## Folder assignment

```
.
├──  src
│   ├── api                               # directory for working with the API
│   │   ├── agents                        # agents(services) for working with each entity
│   │   ├── models                        # data types for each entity
│   ├── assets                            # other files (e.g. images, documents, etc.)
│   ├── components                        # small commonly used elements (e.g. input, button, etc.)
│   │   ├── button
│   │   │   ├── !button.tsx               # the component
│   │   │   ├── !index.ts                 # component re-export
│   │   │   ├── ?styles.ts                # component styles
│   ├── constants                         # app global constants grouped by purpose
│   ├── contexts                          # app global contexts
│   ├── hooks                             # app global hooks
│   ├── layouts                           # page builders that include persistent elements such as header or footer
│   ├── modules                           # larger (than components) page elements that have logic and can perform any operations (e.g header, footer)
│   │   ├── header
│   │   │   ├── ?components               # module's local components
│   │   │   ├── ?modules                  # module's local submodules
│   │   │   ├── !header.tsx               # the module
│   │   │   ├── !index.ts                 # component re-export
│   │   │   ├── ?styles.ts                # component styles
│   ├── pages                             # the page elements that should display modules and sometimes components
│   │   ├── homePage
│   │   │   ├── ?components               # page's local components
│   │   │   ├── ?modules                  # page's local submodules
│   │   │   ├── !homePage.tsx             # the page
│   │   │   ├── !index.ts                 # component re-export
│   │   │   ├── ?styles.ts                # component styles
│   ├── routers
│   ├── store                             # everything related to the store and reducers is
│   ├── styles                            # everything related to page styling
│   ├── types                             # app global types
│   ├── utils                             # app global utils and helpers

!filename.ts - required
?filename.ts - optional
```

## Guidelines

- file/folder naming - always camelCase
- try to avoid using `export default` and use only named exports
- try to group exports and imports
- use path aliases
- don't export component interfaces for props by default. In most cases no one needs it so don't litter the global scope. It may be needed in edge cases (happens very rarely) - then export it, why not
- for components markup use Material-UI
- for styling use emotion
- group and sort css properties in the following order
  - Positioning
  - Box model
  - Typography
  - Visual formatting
  - Animation
  - Other

## Commits naming

Please use [this](https://www.conventionalcommits.org/en/v1.0.0/) convention
examples:
`feat: allow provided config object to extend other configs`
`docs: correct spelling of CHANGELOG`

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
