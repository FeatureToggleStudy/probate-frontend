class JSWait extends codecept_helper {

    beforeStep(step) {
        const helper = this.helpers.WebDriverIO || this.helpers.Puppeteer;

        // Wait for content to load before checking URL
        if (step.name === 'seeCurrentUrlEquals' || step.name === 'seeInCurrentUrl') {
            return helper.wait(2);
        }
    }

    navByClick (text, locator) {
        const helper = this.helpers.WebDriverIO || this.helpers.Puppeteer;
        const helperIsPuppeteer = this.helpers.Puppeteer;

        if (helperIsPuppeteer) {
            return Promise.all([
                helper.page.waitForNavigation({waitUntil: 'networkidle0'}),
                helper.click(text, locator)
            ]);
        }
        return Promise.all([
            helper.click(text, locator),
            helper.wait(2)
        ]);
    }

    async amOnLoadedPage (url) {
        const helper = this.helpers.WebDriverIO || this.helpers.Puppeteer;
        const helperIsPuppeteer = this.helpers.Puppeteer;

        if (helperIsPuppeteer) {
            if (url.indexOf('http') !== 0) {
                url = helper.options.url + url;
            }

            helper.page.goto(url);
            await helper.page.waitForNavigation({waitUntil: 'networkidle0'});
        } else {
            await helper.amOnPage(url);
            await helper.waitInUrl(url);
            await helper.waitForElement('#content');
        }
    }
}

module.exports = JSWait;
