@musc
Feature: UI ./Login to site

  Background:
    Given I go to /cgi-bin/bug.pl?action=login page

  Scenario: entering login page
    Then I should see 'login' input
    And I should see 'password' input
    And I should see a 'Login' button

  @ISSUE:mutc-14
  Scenario: Login by correct user and correct password
    When I enter '__joey12__' in 'login' input
    And I enter '12345678' in 'password' input
    And I click 'Login' button
    Then I should see message 'Successfully authorized!'

  Scenario: Login by correct user and incorrect password
    When I enter '__joey12__' in 'login' input
    And I enter '123456789' in 'password' input
    And I click 'Login' button
    Then I should see message 'Login or password is invalid!'

  Scenario: Login by incorrect user and incorrect password
    When I enter 'xzqwdzas' in 'login' input
    And I enter '123456789' in 'password' input
    And I click 'Login' button
    Then I should see message 'Login or password is invalid!'

  Scenario: Check length control of login field (max 16 symbols)
    When I enter '123456789123456789' in 'login' input
    Then I should see value of fields manual:
      | login | 1234567891234567 |
