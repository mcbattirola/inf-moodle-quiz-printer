const puppeteer = require('puppeteer');

const printer = async (username, password, url, viewportOptions, startQuestion) => {
    try {
        // open browser on page, will be redirected to login
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setViewport(viewportOptions);
        await page.goto(url);

        // log in
        await page.type("#username", username)
        await page.type("#password", password)
        await page.click("#loginbtn")

        await page.waitForNetworkIdle()

        await printQuestions(page, startQuestion)

        await browser.close();

    } catch (err) {
        console.log("error: ", err)
    }
};

const printQuestions = async (page, startQuestion) => {
    let currentQuestion = startQuestion ?? 1;

    if (currentQuestion !== 1) {
        // go to first question
        await page.click(`a[data-quiz-page="${currentQuestion - 1}"]`)
        await page.waitForNetworkIdle()
    }

    try {
        while (true) {
            // print current question
            await page.screenshot({ path: `${currentQuestion}.png` });
            currentQuestion += 1

            // if find button to next question, click
            await page.click(`a[data-quiz-page="${currentQuestion - 1}"]`)
            await page.waitForNetworkIdle()
        }
    } catch (err) {
        console.log("Print questions err:", err)
    }
}

module.exports = printer