import formatJoinedDate from './formatJoinedDate';

it(`should return formatted joined date string`, () => {
  const date = new Date(0);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Jan 1970`);
  date.setMonth(1);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Feb 1970`);
  date.setMonth(2);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Mar 1970`);
  date.setMonth(3);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Apr 1970`);
  date.setMonth(4);
  expect(formatJoinedDate(date)).toBe(`Joined 1 May 1970`);
  date.setMonth(5);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Jun 1970`);
  date.setMonth(6);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Jul 1970`);
  date.setMonth(7);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Aug 1970`);
  date.setMonth(8);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Sep 1970`);
  date.setMonth(9);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Oct 1970`);
  date.setMonth(10);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Nov 1970`);
  date.setMonth(11);
  expect(formatJoinedDate(date)).toBe(`Joined 1 Dec 1970`);
});
