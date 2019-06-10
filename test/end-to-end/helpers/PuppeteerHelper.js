'use strict';

const Helper = codecept_helper;
const helperName = 'Puppeteer';

class PuppeteerHelper extends Helper {

    clickBrowserBackButton() {
        const page = this.helpers[helperName].page;

        return page.goBack();
    }

    async waitForNavigationToComplete(locator) {
        const page = this.helpers[helperName].page;

        if (locator.includes('http')) {
            await Promise.all([
                page.goto(locator, {waitUntil: ['domcontentloaded', 'networkidle0']}), // The promise resolves after navigation has finished
            ]);
        } else {
            await Promise.all([
                page.waitForNavigation({waitUntil: ['domcontentloaded', 'networkidle0']}), // The promise resolves after navigation has finished
                page.click(locator) // Clicking the link will indirectly cause a navigation
            ]);
        }

    }

    async enableJavaScript(enabled) {
        const page = this.helpers[helperName].page;
        await page.setJavaScriptEnabled(enabled);
    }
}
module.exports = PuppeteerHelper;
