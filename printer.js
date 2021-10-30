const puppeteer = require('puppeteer');
const joinImages = require('join-images').joinImages;

const printer = async (username, password, url, filename, viewportOptions, startQuestion) => {
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

        await printQuestions(page, startQuestion, `${filename ?? "quiz"}.jpg`)

        await browser.close();

    } catch (err) {
        console.log("error: ", err)
    }
};

const printQuestions = async (page, startQuestion, filename) => {
    let currentQuestion = startQuestion ?? 1;

    // go to first question
    await page.click(`a[data-quiz-page="${currentQuestion - 1}"]`)
    await page.waitForNetworkIdle()    

    const images = []

    try {
        while (true) {
            // remove header, footer and sidemenu
            await page.$eval("nav", el => el.remove())
            await page.$eval("#nav-drawer", el => el.remove())
            await page.$eval("#page-footer", el => el.remove())
            
            // print current question
            images.push(await page.screenshot())

            currentQuestion += 1

            // if find button to next question, click
            await page.click(`a[data-quiz-page="${currentQuestion - 1}"]`)
            await page.waitForNetworkIdle()
        }
    } catch (err) {
        if (images.length >= 1) {
            const image = await joinImages(images, { direction: 'vertical'})
            image.toFile(filename)
        }
        console.log("Print questions err:", err)
    }
}

module.exports = printer