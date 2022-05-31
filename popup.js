// when the button is clicked, inject activateOverlay to current page
const activateButton = document.querySelector('#activateButton')

chrome.storage.sync.get('color', ({ color }) => {
  activateButton.style.backgroundColor = color
})

activateButton.addEventListener(
  'click',
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // Edit this a bit more
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: activateOverlay,
    })
  },
  false
)

// Activate overlay
function activateOverlay(color) {
  // Make sure this is also comptatable with firefox as well
  // Ignore this since the next time we deal with color will be highlighitng stuff

  /*
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
  */

  function createPopup() {
    // Create overlay that shows the name of the color
    const overlay = document.createElement('div')
    overlay.className = 'popup'
    // lets see if this will keep it up top
    overlay.style.position = 'fixed'
    overlay.style.top = '8rem'
    overlay.style.right = '0px'
    overlay.style.color = 'white'
    overlay.style.padding = '10px'
    overlay.style.zIndex = '9999'
    overlay.style.textAlign = 'center'
    overlay.style.width = '8rem'
    overlay.style.height = '8rem'
    overlay.style.display = 'flex'
    overlay.style.justifyContent = 'center'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'

    // Place overlay at the top of the background page
    // Make this a div and put stuff in it
    const scrollPercentage = getScrollPercentage()
    const innerPercentageDiv = document.createElement('div')
    innerPercentageDiv.id = 'overlayInnerPercentageDiv'
    innerPercentageDiv.innerText = `${Math.round(scrollPercentage * 100)}%`
    overlay.appendChild(innerPercentageDiv)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.style.display = 'flex'
    buttonsDiv.style.flexDirection = 'row'
    buttonsDiv.style.justifyContent = 'space-between'

    const minimizeButton = document.createElement('button')
    minimizeButton.innerText = '-'
    minimizeButton.style.backgroundColor = 'gray'
    minimizeButton.style.color = 'white'

    const closeButton = document.createElement('button')
    closeButton.innerText = 'X'
    closeButton.style.backgroundColor = 'red'
    closeButton.style.color = 'white'

    // Set them inside
    buttonsDiv.appendChild(minimizeButton)
    buttonsDiv.appendChild(closeButton)

    // Yeah
    overlay.appendChild(buttonsDiv)

    return overlay
  }

  function updatePopup() {
    // Update the overlay with the current scroll percentage
    const scrollPercentage = getScrollPercentage()
    const innerPercentageDiv = document.querySelector(
      '#overlayInnerPercentageDiv'
    )
    const formattedPercentage = `${Math.round(scrollPercentage * 100)}%`
    innerPercentageDiv.innerText = formattedPercentage
  }

  // Create a function that lets the user know how far down the page they are
  function getScrollPercentage() {
    // EZ werk
    const doc = document.documentElement
    const win = window
    return (
      (doc.scrollTop || win.pageYOffset || doc.clientTop) /
      (doc.scrollHeight || win.pageYOffset || doc.clientHeight || 1)
    )
  }

  const overlay = createPopup()

  document.body.appendChild(overlay)

  console.log('hellooo')

  // Should just remove if the x button is there
  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay)
  })

  // Add scroll listener to the page
  window.addEventListener('scroll', () => {
    updatePopup()
  })
}
