### Bluewolf Frontend
#### Summary
> This is the frontkend for the app. It is built with react and redux

default env `Node v8.2.1`, `NPM 5.3.0`

framework `react`,`bootstrap` used starter `create-react-app`
(https://github.com/facebookincubator/create-react-app)

To Run the frontend, simply

unzip front_end.zip

install depedencies

	-`npm install`

run development

	-`npm start`

	- copy&paste `http://localhost:3000/` to browser

run production

	-`npm install -g serve`

	-`serve -s build`

	- copy&paste `http://localhost:5000/` to browser

structure

-`actions`
	>`index.js`
	>>`function fetchWeather`: fetch weather through backend

-`components`
>`app.js`: main components
>`chart.js`: use sparklines to render the chart


-`reducers`
>redux reducers

-`containers`
>`search_bar`: container for search bar
>`weather_list`:containers for the table of all weather info

-`../build`
> complied js files to be run on production
