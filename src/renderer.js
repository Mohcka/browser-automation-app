const Swal2 = require('sweetalert2')
const { runAutomation } = require('./javascript/automation')

require('materialize-css')
// require("materialize-css/dist/css/materialize.min.css");

document.addEventListener('DOMContentLoaded', e => {
  let startBtn = document.querySelector('.start-btn')

  startBtn.addEventListener('click', async e => {
    console.log('start it')
    try {
      await runAutomation()
    } catch (err) {
      console.error('Err occured')

      console.error(err)

      Swal2.fire({
        title: 'Error',
        text:
          'An error occured running the automation.  Perhaps something went wrong with the installation',
        type: 'error',
        heightAuto: false,
      })
    }
  })
})
