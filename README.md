# Live demo
The project can be accessed [here](http://157.230.144.73/).

# Project strucuture
The demo link serves the NextJS application, and it consumes a simple ExpressJS API, which serves the listings' array and handles the contact form. The filters of the listings are handled by the frontend, not by the API. Also, the API has some timeouts just to delay the response and looks more like a _real API call_.

# Scripts
After installing the dependencies, with `npm install` or with your preferred package manager, you can run the following commands:

## Dev server
`npm run dev`

## Build
`npm run build`

## Serve
`npm start`

## Tests
`npm run test`

# TODO / Improvements

Here is a list of improvements and/or next steps:
- improve testing coverage
- improve listings UI
- improve listings' filters UX (toggle button or by scrolling)
- add route transition effects for better UX
