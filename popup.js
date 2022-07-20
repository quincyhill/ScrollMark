// NOTE: no need for an activateButton, instead will be replaced with a snapshot button
// when the button is clicked, inject activateOverlay to current page
const activateButton = document.querySelector('#activateButton')

chrome.storage.sync.get('color', ({ color }) => {
  activateButton.style.backgroundColor = color
})

activateButton.addEventListener(
  'click',
  // Our async call back function
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // Read more of the API to get this working
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: activateOverlay,
    })
  },
  false
)

// NOTE: removing the overlay
// This will change
function activateOverlay(color) {
  // Make sure this is also comptatable with firefox as well
  // Ignore this since the next time we deal with color will be highlighitng stuff

  const updatePercentage = () => {
    // Update the overlay with the current scroll percentage
    const scrollPercentage = getScrollPercentage()

    // NOTE: The id of the component will be the actual element, this current one isnt going to work
    const innerPercentageDiv = document.querySelector(
      '#overlayInnerPercentageDiv'
    )
    const formattedPercentage = `${Math.round(scrollPercentage * 100)}%`

    innerPercentageDiv.innerText = formattedPercentage
  }

  // Create a function that lets the user know how far down the page they are
  const getScrollPercentage = () => {
    // Actually needs to fix the percentage thing.. but eh
    const doc = document.documentElement
    const win = window
    return (
      (doc.scrollTop || win.pageYOffset || doc.clientTop) /
      (doc.scrollHeight || win.pageYOffset || doc.clientHeight || 1)
    )
  }

  // Need to add event listener on whatever page i'm on and what not.....
  window.addEventListener('scroll', () => {
    updatePopup()
  })
}
