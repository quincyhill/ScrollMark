// when the button is clicked, inject setPageBackgroundColor to current page
let changeColor = document.querySelector('#changeColor')

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color
})

changeColor.addEventListener(
  'click',
  async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    })
  },
  false
)

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor(color) {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })

  function createPopup() {
    // Create overlay that shows the name of the color
    const overlay = document.createElement('div')
    overlay.className = 'popup'
    // lets see if this will keep it up top
    overlay.style.position = 'fixed'
    overlay.style.top = '0px'
    overlay.style.left = '0px'
    overlay.style.color = 'white'
    overlay.style.padding = '10px'
    overlay.style.zIndex = '9999'
    overlay.style.textAlign = 'center'
    overlay.style.width = '100%'
    overlay.style.height = '4rem'
    overlay.style.display = 'flex'
    overlay.style.justifyContent = 'center'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'
    // Place overlay at the top of the background page
    overlay.innerText = color
    return overlay
  }

  function updatePopup() {
    // Update the overlay with the current scroll percentage
    const scrollPercentage = getScrollPercentage()
    const formattedPercentage = `${Math.round(scrollPercentage * 100)}%`
    overlay.innerText = formattedPercentage
    console.log(document.querySelector('#popupScrollPercentage'))
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

  // Remove pop on click of the overlay
  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay)
  })

  // Add scroll listener to the page
  window.addEventListener('scroll', () => {
    updatePopup()
  })
}
