const printer = require('./printer')
const { parseArgs, validateArgs, printHelp } = require('./args')

const defaultViewport = {
    width: 1280,
    height: 1200,
    isMobile: false,
}

const fields = {
    required: {
        username: '[string] Username to login on INF\'s moodle',
        password: '[string] User\'s password',
        url: '[string] URL to the quiz. IMPORTANT: you may need to use quotes (") around this parameter, since it includes & signs!',
    },
    optional: {
        screenWidth: '[number] Browser screen width',
        screenHeight: '[number] Browser screen height',
        mobile: 'Show mobile version of website',
        start: '[number] Number of the question to start printing',
        output: '[string] Name for the output print screen. Defaults to "quiz.png"'
    }
}

const init = async () => {
    const args = parseArgs(process.argv)

    if(args.help) {
        printHelp(fields)
        return
    }

    try {
        validateArgs(args, fields.required)
    } catch(error) {
        console.log("Error validating args:")
        console.log(error.message)
        return 1
    }

    const viewport = {
        width: args.screenWidth || defaultViewport.width,
        height: args.screenHeight || defaultViewport.height,
        args: args.mobile ?? false
    }

    const startQuestion = args.start ? parseInt(args.start) : 1
    
    await printer(args.username, args.password, args.url, args.output, viewport, startQuestion)
}

init()