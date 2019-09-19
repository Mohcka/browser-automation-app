const Swal2 = require('sweetalert2')
const { runAutomation } = require('./javascript/automation')

require('materialize-css')
// require("materialize-css/dist/css/materialize.min.css");

document.addEventListener('DOMContentLoaded', e => {
  let startBtn = document.querySelector('.automation-station button')
  let queryTextArea = document.querySelector('.automation-station textarea')
  let instancesInput = document.querySelector('.automation-station input')

  startBtn.addEventListener('click', async e => {
    console.log('start it')
    let searchPhrases = queryTextArea.value.split(/\r?\n/)
    let instances = instancesInput.value

    if (instances <= 0 || instances > 5)
      return Swal2.fire({
        type: 'error',
        title: 'Invalid Automation Instances',
        text:
          'Please enter the amount of browser you want to run which can be 1-5',
        heightAuto: false,
      })

    // if the amount of instances is greater than the number of searches to run
    // set instances down to those amount of searches
    if (instances > searchPhrases.length) {
      instances = searchPhrases.length
    }

    try {
      await runAutomation(searchPhrases, instances)
    } catch (err) {
      console.error('Err occured')

      console.error(err)

      Swal2.fire({
        title: 'Error',
        text:
          'An error occured running the automation.  Perhaps something went wrong with the installation.  Try deleting and reinstalling node_modules and try again',
        type: 'error',
        heightAuto: false,
      })
    }
  })
})
