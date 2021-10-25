const puppeteer = require('puppeteer');

const printer = async (username, password, url, viewportOptions) => {
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

        await printQuestions(page)

        await browser.close();

    } catch (err) {
        console.log("error: ", err)
    }
};

const printQuestions = async (page) => {
    let currentQuestion = 0;
    try {
        while (true) {
            // print current question
            await page.screenshot({ path: `${currentQuestion + 1}.png` });
            currentQuestion += 1

            // if find button to next question, click
            await page.click(`a[data-quiz-page="${currentQuestion}"]`)

            await page.waitForNetworkIdle()
        }
    } catch (err) {
        console.log("Print questions err:", err)
    }
}

module.exports = printer