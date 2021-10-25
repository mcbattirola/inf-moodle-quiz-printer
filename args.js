const parseArgs = (argv) => {
    const cliArgs = argv.slice(2, argv.length)

    const parsedArgs = {}

    cliArgs.forEach(arg => {
        const [field, ...value] = arg.split('=')
        parsedArgs[field] = value && value.length > 0 ?  value.join('=') : true
    })

    return parsedArgs
}

const validateArgs = (args, requiredFields) => {
    let errors = []
    Object.entries(requiredFields).forEach(field => {
        const [key, value] = field
        if (!args[key]) {
            errors.push(`Field ${key} is required`)
        }
    })

    if (errors.length > 0) {
        throw new Error(errors.join('\n'))
    }
}

const printHelp = (fieldOptions) => {
    console.log("Required parameters:")
    Object.entries(fieldOptions.required).forEach(field => {
        const [key, value] = field
        console.log(`${key}: ${value}`)
    })

    console.log("\nOptional parameters")
    Object.entries(fieldOptions.optional).forEach(field => {
        const [key, value] = field
        console.log(`${key}: ${value}`)
    })
}

module.exports = {parseArgs, validateArgs, printHelp}