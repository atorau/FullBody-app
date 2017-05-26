import { FullBodyAppPage } from './app.po';

describe('full-body-app App', () => {
  let page: FullBodyAppPage;

  beforeEach(() => {
    page = new FullBodyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
