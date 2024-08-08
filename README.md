# laughing-potato (working title)

![Lint](https://github.com/ellishg/laughing-potato/workflows/Lint/badge.svg)
![Test](https://github.com/ellishg/laughing-potato/workflows/Test/badge.svg)
![Deploy](https://github.com/ellishg/laughing-potato/workflows/Deploy/badge.svg)

## [ellishg.github.io/laughing-potato](https://ellishg.github.io/laughing-potato)

A simple website to view recipes.

## Try it yourself
### Prerequisites
```bash
brew install yarn node
pip3 install pyyaml
```

```bash
git clone --recurse-submodules git@github.com:ellishg/laughing-potato.git
cd laughing-potato
# If you have already cloned you may run the following.
git submodule update --init --recursive
yarn install
yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Builds and deploys `build` folder to the `gh-pages` branch.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
