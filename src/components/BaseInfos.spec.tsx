import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import UserpageGithub from '../classes/userpageGithub';
import * as useResponsiveType from '../hooks/useResponsiveType';
import formatJoinedDate from '../services/formatJoinedDate';
import formatUsername from '../services/formatUsername';
import BaseInfos from './BaseInfos';
import styles from './BaseInfos.module.sass';
import Text from './common/Text';

it(`should render name, username and joinedDate when hasColumns is true`, () => {
  const name = 'a';
  const username = 'b';
  const joinedDate = new Date(0);
  render(<BaseInfos name={name} username={username} joinedDate={joinedDate} hasColumns={true} />);
  const nameElem = screen.getByText(name);
  expect(nameElem).toBeInTheDocument();
  const usernameElem = screen.getByText(formatUsername(username));
  expect(usernameElem).toBeInTheDocument();
  expect(usernameElem.getAttribute('href')).toBe(new UserpageGithub(username).getUrl());
  const joinedDateElem = screen.getByText(formatJoinedDate(joinedDate));
  expect(joinedDateElem).toBeInTheDocument();
});

it(`should render name, username and joinedDate when hasColumns is falsy`, () => {
  const name = 'a';
  const username = 'b';
  const joinedDate = new Date(0);
  render(<BaseInfos name={name} username={username} joinedDate={joinedDate} />);
  const nameElem = screen.getByText(name);
  expect(nameElem).toBeInTheDocument();
  const usernameElem = screen.getByText(formatUsername(username));
  expect(usernameElem).toBeInTheDocument();
  expect(usernameElem.getAttribute('href')).toBe(new UserpageGithub(username).getUrl());
  const joinedDateElem = screen.getByText(formatJoinedDate(joinedDate));
  expect(joinedDateElem).toBeInTheDocument();
});

it(`should group name and joinedDate into a div when hasColumns is true`, () => {
  const name = 'a';
  const username = 'b';
  const joinedDate = new Date(0);
  const result = render(<BaseInfos name={name} username={username} joinedDate={joinedDate} hasColumns={true} />);
  const mainContainerElem = result.container.children[0];
  const subContainerElem = mainContainerElem.children[0];
  const nameElem = subContainerElem.children[0];
  expect(nameElem.textContent).toBe(name);
  const joinedDateElem = subContainerElem.children[1];
  expect(joinedDateElem.textContent).toBe(formatJoinedDate(joinedDate));
});

it(`should pass data-responsive-type attribute to all Text elements when hasColumns is true`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const name = 'a';
  const username = 'b';
  const joinedDate = new Date(0);
  render(<BaseInfos name={name} username={username} joinedDate={joinedDate} hasColumns={true} />);
  const nameElem = screen.getByText(name);
  expect(nameElem.getAttribute('data-responsive-type')).toBe(responsiveType);
  const usernameElem = screen.getByText(formatUsername(username));
  expect(usernameElem.getAttribute('data-responsive-type')).toBe(responsiveType);
  const joinedDateElem = screen.getByText(formatJoinedDate(joinedDate));
  expect(joinedDateElem.getAttribute('data-responsive-type')).toBe(responsiveType);
});

it(`should pass data-responsive-type attribute to all Text elements when hasColumns is falsy`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const name = 'a';
  const username = 'b';
  const joinedDate = new Date(0);
  render(<BaseInfos name={name} username={username} joinedDate={joinedDate} />);
  const nameElem = screen.getByText(name);
  expect(nameElem.getAttribute('data-responsive-type')).toBe(responsiveType);
  const usernameElem = screen.getByText(formatUsername(username));
  expect(usernameElem.getAttribute('data-responsive-type')).toBe(responsiveType);
  const joinedDateElem = screen.getByText(formatJoinedDate(joinedDate));
  expect(joinedDateElem.getAttribute('data-responsive-type')).toBe(responsiveType);
});

it(`should pass empty string to Text components if corresponding parameter is null when hasColumns is true`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<BaseInfos name={null} username={null} joinedDate={null} hasColumns={true} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  const subContainer = mainContainer.children[0].props;
  expect(subContainer.children).toContainEqual(
    <Text className={styles.name} data-responsive-type={responsiveType} text={''} />
  );
  expect(subContainer.children).toContainEqual(
    <Text className={styles.joinedDate} data-responsive-type={responsiveType} text={''} />
  );
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.username} data-responsive-type={responsiveType} text={''} linkUrl={null} />
  );
});

it(`should pass empty string to Text components if corresponding parameter is null when hasColumns is falsy`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<BaseInfos name={null} username={null} joinedDate={null} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.name} data-responsive-type={responsiveType} text={''} />
  );
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.joinedDate} data-responsive-type={responsiveType} text={''} />
  );
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.username} data-responsive-type={responsiveType} text={''} linkUrl={null} />
  );
});

it(`should pass username to name Text component if name is null but username is not null when hasColumns is true`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const username = 'a';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<BaseInfos name={null} username={username} joinedDate={null} hasColumns={true} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  const subContainer = mainContainer.children[0].props;
  expect(subContainer.children).toContainEqual(
    <Text className={styles.name} data-responsive-type={responsiveType} text={username} />
  );
});

it(`should pass username to name Text component if name is null but username is not null when hasColumns is falsy`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const username = 'a';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<BaseInfos name={null} username={username} joinedDate={null} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.name} data-responsive-type={responsiveType} text={username} />
  );
});
