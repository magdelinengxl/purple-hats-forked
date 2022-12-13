/* eslint-disable no-undef */
const {
  setThresholdLimits,
  getHostnameFromRegex,
  getCurrentDate,
  validateUrl,
  getStoragePath,
  setHeadlessMode,
} = require('../utils');

describe('test setting of threshold warn level', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test.each([
    ['critical', 'critical'],
    ['serious', 'serious'],
    ['moderate', 'moderate'],
    ['minor', 'minor'],
    ['none', 'none'],
  ])('should set warn level as %s', (warnLevel, expected) => {
    setThresholdLimits(warnLevel);
    expect(process.env.WARN_LEVEL).toBe(expected);
  });
});

describe('test getHostnameFromRegex', () => {
  test('should retrieve the hostnames accordingly', () => {
    expect(getHostnameFromRegex('https://www.bbc.com/news')).toEqual('www.bbc.com');
    expect(getHostnameFromRegex('https://www.isomer.gov.sg/')).toEqual('www.isomer.gov.sg');
    expect(getHostnameFromRegex('https://fontawesome.com/sessions/sign-in')).toEqual(
      'fontawesome.com',
    );
  });
});

describe('test getCurrentDate', () => {
  const mockDate = new Date('December 17, 1995');
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  test('should return date in string "1995-12-17"', () => {
    expect(getCurrentDate()).toEqual('1995-12-17');
  });
});

describe('test validateUrl', () => {
  test('urls should pass', () => {
    expect(validateUrl('https://www.bbc.com/news')).toEqual(true);
    expect(validateUrl('https://www.isomer.gov.sg/')).toEqual(true);
    expect(validateUrl('https://www.bbc.com/')).toEqual(true);
  });

  test('urls should fail', () => {
    expect(validateUrl('https://www.bbc.gif')).toEqual(false);
    expect(validateUrl('https://www.bbc.jpg')).toEqual(false);
    expect(validateUrl('https://www.bbc.jpeg')).toEqual(false);
    expect(validateUrl('https://www.bbc.png')).toEqual(false);
    expect(validateUrl('https://www.bbc.pdf')).toEqual(false);
    expect(validateUrl('https://www.bbc.doc')).toEqual(false);
    expect(validateUrl('https://www.bbc.css')).toEqual(false);
    expect(validateUrl('https://www.bbc.svg')).toEqual(false);
    expect(validateUrl('https://www.bbc.js')).toEqual(false);
    expect(validateUrl('https://www.bbc.ts')).toEqual(false);
    expect(validateUrl('https://www.bbc.xml')).toEqual(false);
    expect(validateUrl('https://www.bbc.csv')).toEqual(false);
    expect(validateUrl('https://www.bbc.tgz')).toEqual(false);
    expect(validateUrl('https://www.bbc.zip')).toEqual(false);
    expect(validateUrl('https://www.bbc.xls')).toEqual(false);
    expect(validateUrl('https://www.bbc.ppt')).toEqual(false);
    expect(validateUrl('https://www.bbc.ico')).toEqual(false);
    expect(validateUrl('https://www.bbc.woff')).toEqual(false);
  });
});

describe('test getStoragePath', () => {
  jest.mock('../utils', () => ({
    getCurrentDate: '1995-12-17',
  }));
  const mockRandomToken = 'token123';
  test('should return "results/1995-12-17/token123"', () => {
    expect(getStoragePath(mockRandomToken)).toEqual(`results/1995-12-17/${mockRandomToken}`);
  });
});

describe('test setHeadlessMode', () => {
  test('should headlessMode is true', () => {
    setHeadlessMode(true);
    expect(process.env.APIFY_HEADLESS).toEqual('1');
  });
  test('should headlessMode is false', () => {
    setHeadlessMode(false);
    expect(process.env.APIFY_HEADLESS).toEqual('0');
  });
});

describe('test setHeadlessMode', () => {
  test('should headlessMode is true', () => {
    setHeadlessMode(true);
    expect(process.env.APIFY_HEADLESS).toEqual('1');
  });
  test('should headlessMode is false', () => {
    setHeadlessMode(false);
    expect(process.env.APIFY_HEADLESS).toEqual('0');
  });
});
