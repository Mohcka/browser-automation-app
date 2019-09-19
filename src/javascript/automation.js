const { Builder, By, Key, until } = (webdriver = require('selenium-webdriver'))
const {
  ServiceBuilder,
  Options,
} = (firefox = require('selenium-webdriver/firefox'))
const geckoPath = require('geckodriver').path

const Swal2 = require('sweetalert2')

const { chunkify } = require('../utils/array_utils')

exports.runAutomation = async (phrases, instances = 1) => {
  // Set service builder to use geckodriver installed in node_modules
  await new firefox.ServiceBuilder(geckoPath).build()
  // init FFox options
  const fireOpts = new firefox.Options()
  // Set preferences to disable web notifications
  fireOpts.setPreference('dom.webnotifications.enabled', false)
  fireOpts.setPreference('dom.push.enabled', false)

  // Create n number of drivers for every instance requested
  let phrasesChunks = chunkify(phrases, instances).map(phrasesChunk => {
    // Instanciate a new driver for this chunk
    let driverInstance = new Builder()
      .forBrowser('firefox')
      .withCapabilities(fireOpts)

    return { phrases: phrasesChunk, driverInstance: driverInstance }
  })

  console.log(phrasesChunks)

  try {
    for (let i = 0; i < phrasesChunks.length; i++) {
      phrasesChunks[i].driverInstance = await phrasesChunks[
        i
      ].driverInstance.build()
    }
    console.log('before map')

    phrasesChunks.forEach(async phraseChunk => {
      console.log('After map')
      let driverInstance = phraseChunk.driverInstance

      for (let j = 0; j < phraseChunk.phrases.length; j++) {
        let searchPhrase = phraseChunk.phrases[j]
        console.log(searchPhrase)

        await driverInstance.get('http://www.google.com/ncr')
        await driverInstance
          .findElement(By.name('q'))
          .sendKeys(searchPhrase, Key.RETURN)
        await driverInstance.wait(
          until.titleIs(`${searchPhrase} - Google Search`),
          5000
        )
        // open new tab
        // console.log(`${j + 1} : ${phraseChunk.phrases.length}`)
        if (j + 1 < phraseChunk.phrases.length) {
          await driverInstance.executeScript("window.open('','_blank');")
          let handles
          await driverInstance.getAllWindowHandles().then(h => (handles = h))
          console.log(handles)

          await driverInstance.switchTo().window(handles[handles.length - 1])
          // await driverInstance.wait(until.titleIs(`New Tab`), 5000)
        }
      }
    })
  } catch (err) {
    console.error(err)
  } finally {
    console.log('Done')
  }

  // try {
  //   // Create Driver with chosen browser and configs
  //   driver = await new Builder()
  //     .forBrowser('firefox')
  //     .withCapabilities(fireOpts)
  //     .build()
  //   // Try a google search
  //   await driver.get('http://www.google.com/ncr')
  //   await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
  //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000)

  //   Swal2.fire({
  //     type: 'success',
  //     title: 'Automation Complete',
  //     heightAuto: false,
  //   })
  // } catch (err) {
  //   console.log(err)

  //   Swal2.fire({
  //     title: 'Error',
  //     text:
  //       'An error occured running the automation.  Perhaps something went wrong with the installation',
  //     type: 'error',
  //     heightAuto: false,
  //   })
  // }
}
