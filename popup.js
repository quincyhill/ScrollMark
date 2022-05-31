// when the button is clicked, inject setPageBackgroundColor to current page
let changeColor = document.getElementById('changeColor')

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
    // Create popup that shows the name of the color
    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.style.position = 'absolute'
    popup.style.top = '0px'
    popup.style.left = '0px'
    popup.style.color = 'white'
    popup.style.padding = '10px'
    popup.style.zIndex = '9999'
    popup.style.textAlign = 'center'
    popup.style.width = '100%'
    popup.style.height = '4rem'
    popup.style.display = 'flex'
    popup.style.justifyContent = 'center'
    popup.style.backgroundColor = 'rgba(0,0,0,0.5)'

    // Place popup at the top of the background page
    popup.innerText = color

    return popup
  }

  const popup = createPopup()
  document.body.appendChild(popup)

  console.log('hellllllllllllloooooo cheyyenne')

  // Remove pop on click of the popup
  popup.addEventListener('click', () => {
    document.body.removeChild(popup)
  })
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
