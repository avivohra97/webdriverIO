# webdriverIO

# Install wdio
`npm init wdio .`
or
`npm init wdio@latest .`
`npm install chromedriver`
`npm install wdio-chromedriver-service --save-dev`
# package json
make selections and then  check package.json and setup type:module if not already

# tsconfig.json
- check module: ESNext
- check resolveJsonModule: true
- check "esModuleInterop": true
- strict: false

# wdio.conf.ts
- check require: ['./tests/features/step-definitions/**/*.ts'] in cucmber opts
- check tsConfigPath: './tsconfig.json',
- check specs: [
        // ToDo: define location for spec files here
        `${process.cwd()}/tests/features/**/*.feature`
    ]

# test runner config

# possible issue
- unable to install packages: issue with proxy network
- installed and yet not successful then delte node modules, and start from npm init.
- ERROR @wdio/runner: Error: WebDriverError: session not created: This version of ChromeDriver only supports Chrome version 138
[0-0] Current browser version is 136.0.7103.114 with binary path C:\Program Files\Google\Chrome\Application\chrome.exe when running "http://localhost:49408/session" with method "POST" and args "{"capabilities":{"alwaysMatch":{"browserName":"chrome","goog:chromeOptions":{"binary":"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe","prefs":{"profile.password_manager_leak_detection":false}},"webSocketUrl":true,"unhandledPromptBehavior":"ignore"},"firstMatch":[{}]}}"
    check current chrome version from help in browser
    match with chromedriver version in package json file

    - then i see conflict of wdio v9 with chrome driver service which was 8.1.1
    - then I run npm cache clean --force
    - npm install wdio-chromedriver-service@latest, which was not possible due to node version 20.15
    - need new *nvm and node version*
    - uninstall node js
    - install nvm zip and set it up
    - nvm install --lts
    - at last updating chromeversion helped

# install @wdio/globals
` npm i @wdio/globals --save-dev --legacy-peer-deps`

- allure generate allure-results --clean
- allure open

# setup a logger
npm i winston --save-dev
create a logger file under /helper folder
set log level in process.env as 'debug'
import logger in different files and use it

out put in file combined.log
{"level":"info","message":"Page opened successfully","service":"user-service"}
{"level":"info","message":"Radio button clicked successfully","service":"user-service"}
{"level":"info","message":"Option selected successfully","service":"user-service"}`

in logs it will look like
`[0-0] info: Page opened successfully {"service":"user-service"}`







