import '@testing-library/cypress/add-commands';
import { endpointUrl, labels, responsiveBreakPointWidth, title, initUser } from '../../src/config.json';
import formatJoinedDate from '../../src/services/formatJoinedDate';
import formatUsername from '../../src/services/formatUsername';
import * as userInit from '../fixtures/userInit.json';
import * as userNext from '../fixtures/userNext.json';
import * as userNoName from '../fixtures/userNoName.json';

const NEXT_USER = 'next';
const NO_NAME_USER = 'noName';
const NOT_EXISTS_USER = 'notExists';

beforeEach(() => {
  cy.intercept(`${endpointUrl}/users/${initUser}`, { fixture: 'userInit.json' }).as('getUserInit')
  cy.intercept(userInit.avatar_url, { fixture: 'images/init.png' }).as('getUserInitAvatarImage')
  cy.intercept(`${endpointUrl}/users/${NEXT_USER}`, { fixture: 'userNext.json' }).as('getUserNext')
  cy.intercept(userNext.avatar_url, { fixture: 'images/next.png' }).as('getUserNextAvatarImage')
  cy.intercept(`${endpointUrl}/users/${NO_NAME_USER}`, { fixture: 'userNoName.json' }).as('getUserNoName')
  cy.intercept(userNoName.avatar_url, { fixture: 'images/noName.png' }).as('getUserNoNameAvatarImage')
  cy.intercept(`${endpointUrl}/users/${NOT_EXISTS_USER}`, { statusCode: 404 }).as('getUserNotExists')
  cy.visit('http://localhost:3000/', {
    onBeforeLoad (win) {
      cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: false,
      })
    },
  })
  cy.wait('@getUserInit').then((interception) => {
    assert.isNotNull(interception.response.body)
  })
  cy.wait('@getUserInitAvatarImage').then((interception) => {
    assert.isNotNull(interception.response.body)
  })
})

it(`should show static elements`, () => {
  cy.contains(title).should('be.visible')
  cy.get('button').contains(labels.DARK).should('be.visible')
  // cy.get('button').contains(labels.DARK).parent().find('svg').find('use').shadow().find('svg').should('be.visible') //TODO: Needs work around to get css color of shadow DOM
  // https://github.com/cypress-io/cypress/issues/8843
  // cy.get('[class^=SearchBox_icon_]').find('use').shadow().find('svg').should('be.visible') //TODO: Needs work around to get css color of shadow DOM
  // https://github.com/cypress-io/cypress/issues/8843
  cy.get('input').should('be.visible')
  cy.get('input').should('have.attr', 'placeholder', labels.PLACEHOLDER_LABEL)
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('be.visible')
  cy.contains(labels.REPOS).should('be.visible')
  cy.contains(labels.FOLLOWERS).should('be.visible')
  cy.contains(labels.FOLLOWING).should('be.visible')
  //TODO: Should check the info icons after finding work around to get shadow DOM
});

it(`should show user with search result`, () => {
  cy.get('img').should('have.attr', 'src', userInit.avatar_url)
  cy.contains(userInit.name).should('be.visible')
  cy.contains(formatJoinedDate(new Date(userInit.created_at))).should('be.visible')
  cy.contains(formatUsername(userInit.login)).should('be.visible')
  cy.contains(labels.NO_BIO).should('be.visible')
  cy.contains(userInit.public_repos).should('be.visible')
  cy.contains(userInit.followers).should('be.visible')
  cy.contains(userInit.following).should('be.visible')
  cy.contains(userInit.location).should('be.visible')
  cy.findAllByText(labels.NOT_AVAILABLE).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(1)
  })
  cy.contains(userInit.blog).should('be.visible')
  cy.contains(userInit.company).should('be.visible')

  cy.get('input')
    .type(NOT_EXISTS_USER)
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL)
    .click()
  cy.wait(['@getUserNotExists'])
  cy.contains(labels.NO_RESULTS_LABEL).should('be.visible')
  cy.contains(labels.NO_RESULTS_LABEL).should('have.css', 'color', 'rgb(247, 70, 70)')

  cy.get('input')
    .clear()
    .type(NEXT_USER)
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL)
    .click()
  cy.wait(['@getUserNext', '@getUserNextAvatarImage'])

  cy.get('img').should('have.attr', 'src', userNext.avatar_url)
  cy.contains(userNext.name).should('be.visible')
  cy.contains(formatJoinedDate(new Date(userNext.created_at))).should('be.visible')
  cy.contains(formatUsername(userNext.login)).should('be.visible')
  cy.contains(labels.NO_BIO).should('be.visible')
  cy.contains(userNext.public_repos).should('be.visible')
  cy.contains(userNext.followers).should('be.visible')
  cy.contains(userNext.following).should('be.visible')
  cy.findAllByText(labels.NOT_AVAILABLE).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(4);
  })
});

it(`should respond to window width`, () => {
  cy.viewport(responsiveBreakPointWidth.mobileTablet - 1, 660)
  cy.get('[class^=Container_container_]').invoke('width').should('be.gt', 326).and('be.lt', 328)
  cy.get('[class^=UserView_mainContainer] > *').should($children => {
    expectChildrenShouldHaveSameWidth($children, 4, 279)
  })

  cy.viewport(responsiveBreakPointWidth.mobileTablet, 660)
  cy.get('[class^=Container_container_]').invoke('width').should('be.gt', 572).and('be.lt', 574)
  cy.get('[class^=UserView_mainContainer] > *').should($children => {
    expectChildrenShouldHaveSameWidth($children, 4, 493)
  })

  cy.viewport(responsiveBreakPointWidth.tabletDesktop - 1, 660)
  cy.get('[class^=Container_container_]').invoke('width').should('be.gt', 572).and('be.lt', 574)

  cy.viewport(responsiveBreakPointWidth.tabletDesktop, 660)
  cy.get('[class^=Container_container_]').invoke('width').should('be.gt', 729).and('be.lt', 731)
  cy.get('[class^=UserView_mainContainer_]').invoke('width').should('be.gt', 633).and('be.lt', 635)
  cy.get('[class^=UserView_subContainer] > *').should($children => {
    expectChildrenShouldHaveSameWidth($children, 4, 480)
  })
});

function expectChildrenShouldHaveSameWidth($children: JQuery<HTMLElement>, numberOfChildren: number, expectedWidth: number) {
  // eslint-disable-next-line jest/valid-expect
  expect($children).to.have.length(numberOfChildren)
  for (let i = 0; i < numberOfChildren; i++) {
    // eslint-disable-next-line jest/valid-expect
    expect($children.eq(i).width()).to.be.gt(expectedWidth - 1).and.lt(expectedWidth + 1)
  }
}

it(`should be styled in response to theme`, () => {
  // theme = light
  checkLightStyles()  

  // Toggle theme from light -> dark
  cy.get('button').contains(labels.DARK)
    .click()

  // theme = dark
  checkDarkStyles()

  // Toggle theme from dark -> light
  cy.get('button').contains(labels.LIGHT)
    .click()

  // theme = light
  checkLightStyles()  
});

it(`should chage style with hover`, () => {
  // theme = light
  // Header
  cy.task('activateHoverPseudo', { selector: '[class^=ThemeToggleButton_container_]' })
  cy.get('button').contains(labels.DARK).should('have.css', 'color', 'rgb(34, 39, 49)')
  cy.get('button').contains(labels.DARK).should('have.css', 'fill', 'rgb(34, 39, 49)')

  // SearchBox
  cy.task('activateHoverPseudo', { selector: '[class^=SearchBox_button_]' })
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'background-color', 'rgb(96, 171, 255)')
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'color', 'rgb(255, 255, 255)')

  // UserView
  cy.task('activateHoverPseudo', { selector: '[class*=BaseInfos_username_]' })
  cy.contains(formatUsername(userInit.login)).should('have.css', 'text-decoration-line', 'underline')
  cy.task('activateHoverPseudo', { selector: 'a[class*=Info_text_]' })
  cy.contains(userInit.blog).should('have.css', 'text-decoration-line', 'underline')

  // Toggle theme from light -> dark
  cy.get('button').contains(labels.DARK)
    .click()

  // theme = dark
  // Header
  cy.task('activateHoverPseudo', { selector: '[class^=ThemeToggleButton_container_]' })
  cy.get('button').contains(labels.LIGHT).should('have.css', 'color', 'rgb(144, 164, 212)')
  cy.get('button').contains(labels.LIGHT).should('have.css', 'fill', 'rgb(144, 164, 212)')

  // SearchBox
  cy.task('activateHoverPseudo', { selector: '[class^=SearchBox_button_]' })
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'background-color', 'rgb(96, 171, 255)')
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'color', 'rgb(255, 255, 255)')
});


function checkLightStyles() {
  // Background
  cy.get('[class^=Background_background_]').should('have.css', 'background-color', 'rgb(246, 248, 255)')

  // Header
  cy.contains(title).should('have.css', 'color', 'rgb(34, 39, 49)')
  cy.get('button').contains(labels.DARK).should('have.css', 'color', 'rgb(105, 124, 154)')
  cy.get('button').contains(labels.DARK).should('have.css', 'fill', 'rgb(105, 124, 154)')

  // SearchBox
  cy.get('[class^=SearchBox_container_]').should('have.css', 'background-color', 'rgb(254, 254, 254)')
  cy.get('input').should('have.css', 'color', 'rgb(34, 39, 49)')
  // cy.get('input').shadow().find('div').should('have.css', 'color', 'rgb(75, 106, 155)') //TODO: Needs work around to get css color of shadow DOM
  // https://github.com/cypress-io/cypress/issues/8843
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'background-color', 'rgb(0, 121, 255)')
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'color', 'rgb(255, 255, 255)')

  // UserView
  cy.get('[class^=UserView_container_]').should('have.css', 'background-color', 'rgb(254, 254, 254)')
  cy.contains(userInit.name).should('have.css', 'color', 'rgb(43, 52, 66)')
  cy.contains(formatJoinedDate(new Date(userInit.created_at))).should('have.css', 'color', 'rgb(105, 124, 154)')
  cy.contains(formatUsername(userInit.login)).should('have.css', 'color', 'rgb(0, 121, 255)')
  cy.contains(labels.NO_BIO).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.get('[class^=Stats_columnsContainer_]').should('have.css', 'background-color', 'rgb(246, 248, 255)')
  cy.contains(labels.REPOS).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.contains(labels.FOLLOWERS).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.contains(labels.FOLLOWING).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.contains(userInit.public_repos).should('have.css', 'color', 'rgb(43, 52, 66)')
  cy.contains(userInit.followers).should('have.css', 'color', 'rgb(43, 52, 66)')
  cy.contains(userInit.following).should('have.css', 'color', 'rgb(43, 52, 66)')
  cy.contains(userInit.location).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.findAllByText(labels.NOT_AVAILABLE).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(1)
    // eslint-disable-next-line jest/valid-expect
    expect($na.eq(0).css('color')).to.eq('rgb(75, 106, 155)')
    // eslint-disable-next-line jest/valid-expect
    expect($na.eq(0).parent().css('opacity')).to.eq('0.5')
  })
  cy.contains(userInit.blog).should('have.css', 'color', 'rgb(75, 106, 155)')
  cy.contains(userInit.company).should('have.css', 'color', 'rgb(75, 106, 155)')
}

function checkDarkStyles() {
  // Background
  cy.get('[class^=Background_background_]').should('have.css', 'background-color', 'rgb(20, 29, 47)')

  // Header
  cy.contains(title).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.get('button').contains(labels.LIGHT).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.get('button').contains(labels.LIGHT).should('have.css', 'fill', 'rgb(255, 255, 255)')

  // SearchBox
  cy.get('[class^=SearchBox_container_]').should('have.css', 'background-color', 'rgb(30, 42, 71)')
  cy.get('input').should('have.css', 'color', 'rgb(255, 255, 255)')
  // cy.get('input').shadow().find('div').should('have.css', 'color', 'rgb(255, 255, 255)') //TODO: Needs work around to get css color of shadow DOM
  // https://github.com/cypress-io/cypress/issues/8843
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'background-color', 'rgb(0, 121, 255)')
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL).should('have.css', 'color', 'rgb(255, 255, 255)')

  // UserView
  cy.get('[class^=UserView_container_]').should('have.css', 'background-color', 'rgb(30, 42, 71)')
  cy.contains(userInit.name).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(formatJoinedDate(new Date(userInit.created_at))).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(formatUsername(userInit.login)).should('have.css', 'color', 'rgb(0, 121, 255)')
  cy.contains(labels.NO_BIO).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.get('[class^=Stats_columnsContainer_]').should('have.css', 'background-color', 'rgb(20, 29, 47)')
  cy.contains(labels.REPOS).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(labels.FOLLOWERS).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(labels.FOLLOWING).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(userInit.public_repos).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(userInit.followers).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(userInit.following).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(userInit.location).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.findAllByText(labels.NOT_AVAILABLE).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(1)
    // eslint-disable-next-line jest/valid-expect
    expect($na.eq(0).css('color')).to.eq('rgb(255, 255, 255)')
    // eslint-disable-next-line jest/valid-expect
    expect($na.eq(0).parent().css('opacity')).to.eq('0.5')
  })
  cy.contains(userInit.blog).should('have.css', 'color', 'rgb(255, 255, 255)')
  cy.contains(userInit.company).should('have.css', 'color', 'rgb(255, 255, 255)')
}

it(`should add transparency to bio if it is not provided`, () => {
  cy.contains(labels.NO_BIO).should('have.css', 'opacity', '0.75')
});

it(`should render username instead of name if name is not provided`, () => {
  cy.get('input')
    .clear()
    .type(NO_NAME_USER)
  cy.get('button').contains(labels.SEARCH_BUTTON_LABEL)
    .click()
  cy.wait(['@getUserNoName', '@getUserNoNameAvatarImage'])

  cy.findAllByText(NO_NAME_USER).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(1)
  })
  cy.findAllByText(`@${NO_NAME_USER}`).should(($na) => {
    // eslint-disable-next-line jest/valid-expect
    expect($na).to.have.length(1)
  })
});
