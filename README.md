# Quiz printer

Automatically print the whole quiz on INF's Moodle.

## Setup

Requirements: node and npm/yarn

Clone the repo, then cd into `inf-moodle-quiz-printer`, then install dependencies:

```bash
npm install
```

Then, run:

```bash
node index.js help
# outputs:

#Required parameters:
#username: [string] Username to login on INF's moodle
#password: [string] User's password
#url: [string] URL to the quiz. IMPORTANT: you may need to use quotes (") around this parameter, since it includes & signs!

#Optional parameters
#screenWidth: [number] Browser screen width
#screenHeight: [number] Browser screen height
#mobile: Show mobile version of website
```

To run on a quiz, run:

```bash
node index.js username=YOUR_USERNAME password=YOUR_PASSWORD url="https://moodle.inf.ufrgs.br/mod/quiz/summary.php?attempt=XXXXXX&cmid=YYYY"
```

Get the URL from the browser, entering in the quiz.
Don't forget to use `"` on url if needed.

## TODO list

[x] Read username, password and URL from params
[x] Width and height as optional params
[] Combine all images into one
[] Print only quiz area, without sidebar, header and footer
[] Output format as optional param
[] Improve docs
[] Test if it works for other Moodles
