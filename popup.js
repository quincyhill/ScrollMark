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
}
