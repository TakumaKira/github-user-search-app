import { AxiosError, AxiosResponse } from 'axios';
import { shallow } from 'enzyme';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import './services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import App, { FAILED_TO_GET_INITIAL_USER } from './App';
import backgroundStyles from './components/Background.module.sass';
import Wrapper from './components/common/Wrapper';
import containerStyles from './components/Container.module.sass';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import UserView from './components/UserView';
import { ThemeType } from './contexts/ThemeContext';
import * as useResponsiveType from './hooks/useResponsiveType';
import { nullUser } from './interfaces/user';
import * as http from './services/http';

let realUseContext: <T>(context: React.Context<T>) => T;
let mockUseContext: jest.Mock<any, any>;
let realUseEffect: (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => void;
let mockUseEffect: jest.Mock<any, any>;
beforeEach(() => {
    realUseContext = React.useContext;
    mockUseContext = React.useContext = jest.fn();
    realUseEffect = React.useEffect;
    mockUseEffect = React.useEffect = jest.fn();
});
afterEach(() => {
    React.useContext = realUseContext;
    React.useEffect = realUseEffect;
});

it(`should render background, container, Header, SearchBox and Userview`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Desktop;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  const setUser = () => {};
  mockUseContext.mockReturnValue({ theme, setUser });

  const wrapper = shallow(<App />);
  const backgroudWrapperRef = wrapper.find(Wrapper).find(`.${backgroundStyles.background}`);
  expect(backgroudWrapperRef).toHaveLength(1);
  expect(backgroudWrapperRef.getElement().props['data-theme']).toBe(ThemeType.Light);
  const containerWrapperRef = backgroudWrapperRef.find(`.${containerStyles.container}`);
  expect(containerWrapperRef).toHaveLength(1);
  expect(containerWrapperRef.find(Header)).toHaveLength(1);
  expect(containerWrapperRef.find(SearchBox)).toHaveLength(1);
  expect(containerWrapperRef.find(UserView)).toHaveLength(1);
});

it(`should set user if getting initial user successfully`, async () => {
  mockUseEffect.mockImplementation(callback => callback());

  const nullUserRaw = {
    avatar_url: null,
    name: null,
    login: null,
    created_at: null,
    bio: null,
    public_repos: null,
    followers: null,
    following: null,
    location: null,
    blog: null,
    twitter_username: null,
    company: null,
  };
  const res = { data: nullUserRaw } as AxiosResponse;
  const mockHttpGet = jest.spyOn(http, 'get');
  mockHttpGet.mockResolvedValue(res);

  const theme = ThemeType.Light;
  const setUser = jest.fn();
  setUser.mockImplementation(() => {});
  mockUseContext.mockReturnValue({ theme, setUser });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<App />);

  await new Promise(setImmediate);

  expect(setUser).toHaveBeenCalledWith(nullUser);
});

it(`should log error if getting initial user is failed`, async () => {
  mockUseEffect.mockImplementation(callback => callback());

  const error = new Error('test');
  const mockHttpGet = jest.spyOn(http, 'get');
  mockHttpGet.mockResolvedValue(error as AxiosError);

  const theme = ThemeType.Light;
  const setUser = jest.fn();
  mockUseContext.mockReturnValue({ theme, setUser });

  const consoleError = jest.spyOn(console, 'error');
  consoleError.mockImplementation(() => {});

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<App />);

  await new Promise(setImmediate);

  expect(consoleError).toHaveBeenCalledWith(FAILED_TO_GET_INITIAL_USER);
});
