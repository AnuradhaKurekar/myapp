class BasePage {
  constructor(page, url) {
    this.page = page;
    this.url = url;
  }

  async goto() {
    await this.page.goto(this.url);
  }
}

module.exports = { BasePage };
