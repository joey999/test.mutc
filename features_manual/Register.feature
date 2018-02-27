@musc
Feature: Register new user

  Background:
    Given I go to /cgi-bin/bug.pl?action=register page

  Scenario: Check fields
    Then I should see 'login' input
    And I should see 'email' input
    And I should see 'password' input
    And I should see 'password_confirm' input
    And I should see 'sex' 'option' manual
    And I should see 'news' 'checkbox' manual

  Scenario: Create user with correct values
    When I set fields manual:
      | Login            | test_zaq14asx |
      | Email            | zaqq@zaa.ru   |
      | Password         | 12345678      |
      | Confirm password | 12345678      |
      | Your sex         | male          |
    And I click 'Register' button manual
    Then I should see message 'Congratulations! You have been successfully registered.'

  Scenario: Try to create user with empty fields
    When I set fields manual:
      | Login            |  |
      | Email            |  |
      | Password         |  |
      | Confirm password |  |
      | Your sex         |  |
    And I click 'Register' button manual
    Then I should see message 'error'

  Scenario: Try to input in Login more than 16 symbols
    When I set '123456789123456789' value to field 'Login'
    Then I should see value of fields manual:
      | Login | 1234567891234567 |

  Scenario: Try to input in Email two @ symbols
    When I set fields manual:
      | Login            | test_zaq14zsx |
      | Email            | zaqq@za@a.ru  |
      | Password         | 12345678      |
      | Confirm password | 12345678      |
      | Your sex         | male          |
    And I click 'Register' button manual
    Then I should see message ' - not a valid email address'

  Scenario: Try to input in Password more than 16 symbols
    When I set '123456789123456789' value to field 'Password'
    Then I should see value of fields manual:
      | Password | 1234567891234567 |

  Scenario: Try to create user with incorrect field 'confirm password'
    When I set fields manual:
      | Login            | test_zaq16axx |
      | Email            | zaqq@za.ru    |
      | Password         | 12345678      |
      | Confirm password | 123456789     |
      | Your sex         | male          |
    And I click 'Register' button manual
    Then I should see message '- password doesn't match confirmation'

  Scenario: Try to create user with incorrect password field (with spaces)
    When I set fields manual:
      | Login            | test_zaq11adx |
      | Email            | zaqq@za.ru    |
      | Password         | 1234  5678    |
      | Confirm password | 1234  5678    |
      | Your sex         | male          |
    And I click 'Register' button manual
    Then I should see message '- password incorrect'

  Scenario: Try to create user with incorrect Email field (with spaces)
    When I set fields manual:
      | Login            | test_zaq17dcx |
      | Email            | zaq  q@za.ru  |
      | Password         | 12345678      |
      | Confirm password | 12345678      |
      | Your sex         | male          |
    And I click 'Register' button manual
    Then I should see message '- email incorrect'

  Scenario: Try to create duplicate user
    When I set fields manual:
      | Login            | test_zaq17wsx |
      | Email            | zaqq@zaa.ru   |
      | Password         | 12345678      |
      | Confirm password | 12345678      |
      | Your sex         | male          |
    And I click 'Register' button manual
    And I go to /cgi-bin/bug.pl?action=register page
    And I set fields manual:
      | Login            | test_zaq17wsx |
      | Email            | zaqq@zaa.ru   |
      | Password         | 12345678      |
      | Confirm password | 12345678      |
      | Your sex         | male          |
    Then I should see message 'login is already registered'

  Scenario: Check Reset button
    When I set fields manual:
      | Login            | test_zaasdasdq12wsx |
      | Email            | zaqq@za@ asd.ru     |
      | Password         | 1235678             |
      | Confirm password | 12345678            |
      | Your sex         | male                |
    And I click 'Register' button manual
    And I click 'Reset' button manual
    Then I should see value of fields manual:
      | Login            |  |
      | Email            |  |
      | Password         |  |
      | Confirm password |  |
      | Your sex         |  |