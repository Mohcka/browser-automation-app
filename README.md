## Browser Automation App

This is a demonstration and my boilerplate on creating an [Electron](https://electronjs.org/) desktop app to run the browser automater tool [Selenium-Webdriver](https://www.seleniumhq.org/projects/webdriver/).  The webdriver will open a browser window and perform tasks as they were written, although opening a browser is not required, [as a headless option is a available](https://stackoverflow.com/a/48677891).

My current job requires a lot of data entry.  So I made this to help speed things up by packaging an app that my coworkers could open and use on their machines with user friendly UI.

## How to use

If you haven't already, please install [nodejs](https://nodejs.org/en/) and [firefox](https://www.mozilla.org/en-US/firefox/new/).

Once everything's been installed correctly, clone this git repository by entering `git clone https://github.com/Mohcka/browser-automation-app.git` in your terminal.  Then run `npm i` then `npm start` and the app should open and you're free to interact the app as you please.   If you want to package and redistribute this app, run `npm run make` and the platform specific distributables will be generated in the `/out` directory.