import { shallow } from 'enzyme';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import App from '../App';
import ThemeWrapper from '../contexts/ThemeContext';
import UserWrapper from '../contexts/UserContext';
import ContextsWrapper from './ContextsWrapper';

it(`should render App component inside ThemeWrapper and UserWrapper`, () => {
  const wrapper = shallow(<ContextsWrapper />);
  const ThemeWrapperRef = wrapper.find(ThemeWrapper);
  expect(ThemeWrapperRef).toHaveLength(1);
  const UserWrapperRef = ThemeWrapperRef.find(UserWrapper);
  expect(UserWrapperRef).toHaveLength(1);
  const AppRef = UserWrapperRef.find(App);
  expect(AppRef).toHaveLength(1);
});
