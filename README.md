# Performance Website Optimization

## Getting Started

###### Locally

**1.** Clone this repo

**2.** Change working directory to ``` /dist ```

**3.** Serve the website: ``` $ python -m SimpleHTTPServer 8080```

Detailed Python Simple Server instructions can been found [here](https://docs.python.org/2/library/basehttpserver.html).

**4.** Open the website in your browser at ``` http://localhost:8000 ```

**5.** Download [ngrok](https://ngrok.com/download) to tunnel local webserver. Instructions are on the [ngrok site](https://ngrok.com/docs#expose) ``` $ ngrok http 8080 ```

- To test pagespeed use [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Use http link returned from ngrok.

###### Using Gulp

**1.** Download [gulp](https://www.npmjs.com/package/gulp). Gulp is the tool used for automation.

**2.** Install packages needed for project

```
npm install --save-dev gulp gulp-image-resize gulp-rename gulp-imagemin gulp-minify-css gulp-uglify gulp-minify-html
```

**3.** To run, type ```$ gulp``` to run all automations
<br>
<hr />

## Page Speed Score

**Critical Rendering Path:** ```index.html``` must achieve a PageSpeed score of at least 90 for both Mobile and Desktop.

#### Optimizations

- Removed google font api call and used [Web Font Loader](https://github.com/typekit/webfontloader) script. Inlined at bottom of body.
- Inlined ```css/styles.css```
- Added ```media="print"``` in ```<link href="css/print.css" rel="stylesheet" >```
- Added ```async``` to all script tags & inlined at the bottom of body.
- Resized `pizzeria.jpg` image using gulp `gulp-image-resize`. Created smaller version of image (pizzeria_small.jpg) for index.html and removed styling in `index.html`.
- Optimized all images using [ImageOptim](https://imageoptim.com/)
- Minified all CSS files used by index.html using gulp `gulp-minify-css`.
- Minified all JS files using gulp `gulp-uglify`
- Minified all HTML files using gulp `gulp-minify-html`

#### Improvements after optimizations

|   Test    |   Mobile  |   Desktop |
|-----------|-----------|-----------|
|   PageSpeed Score before optimizations    |   27/100  | 29/100    |
|   PageSpeed Score **after** optimizations |   94/100  |   95/100  |
<br>
<hr />

## Get Rid Of Jank

**Frame Rate:** Optimizations made to `views/js/main.js` make `views/pizza.html` render with a consistent frame-rate at 60fps when scrolling.

**Computational Efficiency:** Time to resize pizzas is less than 5 ms using the pizza size slider on the `views/pizza.html` page. Resize time is shown in the browser developer tools.

#### Optimizations

*Note. Comments have been left in the files above explaining changes in more detail.*

###### General optimizations

- Added missing meta and title tags
```
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1">
<meta name=description content="Cam's Pizzeria">
<meta name=author content="">
<title>Cam's Pizzeria</title>
```
- Minified CSS (style.css and bootstrap-grid.css) using gulp `gulp-minify-css` and later inlined into `pizza.html`
- Minified all JS files, specficially `main.js` file using gulp `gulp-uglify` and later inlined into `pizza.html` at the bottom of body.
- Minified HTML file `pizza.html` using gulp `gulp-minify-html'


###### Optimizations in `views/js/main.js`

- `function changeSliderLabel()`:
    - Changed `querySelector` to `getElementById`
    - Store pizzaSize variable out of the function
- `function determineDx()`:
    - Changed `querySelector` to `getElementById`
- `function changePizzaSizes()`:
    - Moved code in `function determineDx()` inside this function to avoid repetition and optimized code for quicker calculations
    - Changed `querySelectorAll` to `getElementsByClassNames` for collection of pizza containers.
    - Created a variable and put out of this function. Variable keeps an array of all pizza elements on the page.
    - Moved `dx` and `newwidth` variables out of for loop since they can be computed in one iteration.
- for loop that creates and appends all of the pizzas when the page loads:
    - Changed the number of pizza to 20 from 200.
    - Moved pizzaDiv variable outside of the for loop
- `function updatePositions()`:
    - Changed `querySelectorAll` to `getElementsByClassNames`
    - Defined the variable "phase" outside the for loop
    - Created variable `scroll` out of for loop instead of `document.body.scrollTop / 1250` being calculated repeatedly in each loop iteration
    - Added translateX() and translateZ(0) transform functions to the sliding pizza elements within the updatePositions function.
- EventListener for **DOMContentLoaded**:
    - Add variable `elem` outside of for loop
    - Changed `querySelector` to `getElementById`
    - Changed generating number of sliding pizza iterations to 20 from 200

#### Improvements after optimizations

|   Test    |   Result  |
|-----------|-----------|
|   PageSpeed Score before optimizations    |   Mobile: 31/100, Desktop: 70/100  |
|   PageSpeed Score **after** optimizations |   Mobile: 87/100, Desktop: 93/100  |
|   Frame Rate before optimizations         |   FPS: ~20 *(from chrome dev tool fps meter)*, Average scripting time to generate last 10 frames: ~6ms |
|   Frame Rate **after** optimizations      |   FPS: ~60 *(from chrome dev tool fps meter)*, Average scripting time to generate last 10 frames: ~0.3ms|
|   Time to resize pizzas before optimizations  |   ~250ms  |
|   Time to resize pizzas **after** optimizations   |   ~1.2ms    |

