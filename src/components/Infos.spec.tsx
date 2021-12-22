import ShallowRenderer from 'react-test-renderer/shallow';
import UserpageTwitter from '../classes/userpageTwitter';
import { iconIds } from '../config.json';
import formatUsername from '../services/formatUsername';
import Info from './Info';
import Infos from './Infos';

it(`should render 4 Info components when hasColumns is true`, () => {
  const location = 'location';
  const blogUrl = 'blogUrl';
  const twitterUsername = 'twitterUsername';
  const company = 'company';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos location={location} blogUrl={blogUrl} twitterUsername={twitterUsername} company={company} hasColumns={true} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  const subContainer1 = mainContainer.children[0].props;
  const subContainer2 = mainContainer.children[1].props;
  expect(subContainer1.children).toContainEqual(
    <Info iconId={iconIds.Location} info={location} />
  );
  expect(subContainer1.children).toContainEqual(
    <Info iconId={iconIds.Website} info={blogUrl} linkUrl={blogUrl} />
  );
  expect(subContainer2.children).toContainEqual(
    <Info iconId={iconIds.Twitter} info={twitterUsername ? formatUsername(twitterUsername) : null}
      linkUrl={twitterUsername ? new UserpageTwitter(twitterUsername).getUrl() : null} />
  );
  expect(subContainer2.children).toContainEqual(
    <Info iconId={iconIds.Company} info={company} />
  );
});

it(`should render 4 Info components when hasColumns is falsy`, () => {
  const location = 'location';
  const blogUrl = 'blogUrl';
  const twitterUsername = 'twitterUsername';
  const company = 'company';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos location={location} blogUrl={blogUrl} twitterUsername={twitterUsername} company={company} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  expect(mainContainer.children).toContainEqual(
    <Info iconId={iconIds.Location} info={location} />
  );
  expect(mainContainer.children).toContainEqual(
    <Info iconId={iconIds.Website} info={blogUrl} linkUrl={blogUrl} />
  );
  expect(mainContainer.children).toContainEqual(
    <Info iconId={iconIds.Twitter} info={twitterUsername ? formatUsername(twitterUsername) : null}
      linkUrl={twitterUsername ? new UserpageTwitter(twitterUsername).getUrl() : null} />
  );
  expect(mainContainer.children).toContainEqual(
    <Info iconId={iconIds.Company} info={company} />
  );
});

it(`should pass className to main container when hasColumns is true`, () => {
  const className = 'a';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos className={className} location='location' blogUrl='blogUrl' twitterUsername='twitterUsername' company='company' hasColumns={true} />);
  const result = renderer.getRenderOutput();
  expect(result.props.className.split(' ')).toContain(className);
});

it(`should pass className to main container when hasColumns is falsy`, () => {
  const className = 'a';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos className={className} location='location' blogUrl='blogUrl' twitterUsername='twitterUsername' company='company' />);
  const result = renderer.getRenderOutput();
  expect(result.props.className.split(' ')).toContain(className);
});

it(`should pass null to Info component for twitter if twitterUsername is null when hasColumns is true`, () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos className='className' location='location' blogUrl='blogUrl' twitterUsername={null} company='company' hasColumns={true} />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  const subContainer2 = mainContainer.children[1].props;
  expect(subContainer2.children).toContainEqual(
    <Info iconId={iconIds.Twitter} info={null} linkUrl={null} />
  );
});

it(`should pass null to Info component for twitter if twitterUsername is null when hasColumns is falsy`, () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Infos className='className' location='location' blogUrl='blogUrl' twitterUsername={null} company='company' />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props;
  expect(mainContainer.children).toContainEqual(
    <Info iconId={iconIds.Twitter} info={null} linkUrl={null} />
  );
});
