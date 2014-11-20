# Compass map kata app

This app started out as a kata for students, where the initial
idea was to show how to abstract away the DOM or jQuery specially
and still get a complete app to run.

Meanwhile it has grown to become a mini app, with the strong focus on
practicing TDD concepts. Especially the mocking and spying part
is quite intersting since it is hard to get around that when working
with the real DOM.

# The app

This app has made lots of iterations. This current one does basically
start out to enable rotating a (image of a) compass on scroll. Next step
was adding deviceorientation event to trigger the rotation and point to
North properly. Then the automatic switching between the two was built in
trying to push and evolove the design of the app. It is a constantly living
app, which changes with all new requirements.

It is intended to improve and allow to play with concepts like the
[four rules of simple design](http://www.c2.com/cgi/wiki?XpSimplicityRules)
(also see this [excellent book](https://leanpub.com/4rulesofsimpledesign)),
[SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)),
etc. all applying TDD.

# Install

1. Clone the repo locally e.g. using `git clone git@github.com:uxebu/compass-to-map-app.git`
2. `cd compass-to-map-app`
3. Just run `npm install`
4. Just run `npm test` all should pass
5. Run `npm start` which builds all the sources and start a web server (be sure to have nodejs at least 0.10)
6. Open the browser at [http://localhost:8080/src](http://localhost:8080/src)

# Next steps

The domUtil.js is currently completely untested, it's just mocked away
in all other parts. The testing of this could be well done using
[kommando](http://github.com/uxebu/kommando). The next part is that the
HTML/CSS is completely untested, that could be achieved using
[quixote](https://github.com/jamesshore/quixote).

Another hi-potential thing that can be done is creating a visualization
of the depdendencies and which of them are mocked and where are the
module/unit boundaries that are created using mocks. And trying to
visualize the concepts and boundaries in a way that people new to
the code have an easier way of accessing and understanding it.

# Roadmap

- include the openlayers to show the map rotating depending on the compass
- show the current geo position of the device
- show a button to trigger different views like satellite, maps, etc. (using openlayers)
- a button to switch between map and compass
- anything else? add it here ...

# How to use it?

Feel free to use it and play around with it.
You can also simply jump back in the history and try to evolve the
app itself using TDD. It is a very nice problem that allows practicing the
following well:

- mocking+spying away the DOM
- separation of concerns
- proper application of unit/integration/end-to-end testing
- applying the four rules of simple design (any software profits from that :))
