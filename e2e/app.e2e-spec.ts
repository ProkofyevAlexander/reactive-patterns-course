import { ReactivePatternsCoursePage } from './app.po';

describe('reactive-patterns-course App', () => {
  let page: ReactivePatternsCoursePage;

  beforeEach(() => {
    page = new ReactivePatternsCoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
