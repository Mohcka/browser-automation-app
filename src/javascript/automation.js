const { Builder, By, Key, until } = (webdriver = require('selenium-webdriver'))
const {
  ServiceBuilder,
  Options,
} = (firefox = require('selenium-webdriver/firefox'))
const geckoPath = require('geckodriver').path

const Swal2 = require('sweetalert2')

exports.runAutomation = async phrases => {
  // Set service builder to use geckodriver installed in node_modules
  await new firefox.ServiceBuilder(geckoPath).build()
  // init FFox options
  const fireOpts = new firefox.Options()
  // Set preferences to disable web notifications
  fireOpts.setPreference('dom.webnotifications.enabled', false)
  fireOpts.setPreference('dom.push.enabled', false)

  try {
    // Create Driver with chosen browser and configs
    driver = await new Builder()
      .forBrowser('firefox')
      .withCapabilities(fireOpts)
      .build()
    // Try a google search
    await driver.get('http://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000)

    Swal2.fire({
      type: 'success',
      title: 'Automation Complete',
      heightAuto: false,
    })
  } catch (err) {
    console.log(err)

    Swal2.fire({
      title: 'Error',
      text:
        'An error occured running the automation.  Perhaps something went wrong with the installation',
      type: 'error',
      heightAuto: false,
    })
  }
}
