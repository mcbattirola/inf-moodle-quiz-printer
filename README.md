# Quiz printer

Automatically print the whole quiz on INF's Moodle.

## Running

Requirements: node

Edite `index.js` with your link, username and password, than

```bash
npm install # instal dependencies
node index.js # run project
```

## TODO list

- Read username, password and URL from params
- Combine all images into one
- Print only quiz area, without sidebar, header and footer
- Width and height as optional params
- Output format as optional param
- Improve docs
- Test if it works for other Moodles
