const page = document.querySelector('#page')

// Here is that current class name
let selectedClassName = 'current'

const presetButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']

// The button choice
const buttonChoice = document.querySelector('#buttonChoice')

// React to a button click by making the selected button and saving
function handleButtonClick(event) {
  // Remove the styling from the the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  )

  if (current && current !== event.target) {
    current.classList.remove(selectedClassName)
  }

  // What is the dataset object?
  let color = event.target.dataset.color
  event.target.classList.add(selectedClassName)
  chrome.storage.sync.set({ color })

  // Create popup that shows the name of the color
  const popup = document.createElement('div')
  popup.id = 'mypopup'

  // Place popup at the top of the background page
  popup.style.position = 'absolute'
  popup.style.top = '0px'
  popup.style.left = '0px'
  popup.style.backgroundColor = 'darkblue'
  popup.style.color = 'white'
  popup.style.padding = '10px'
  popup.style.fontSize = '20px'
  popup.style.zIndex = '9999'
  popup.style.fontFamily = 'sans-serif'
  popup.style.textAlign = 'center'
  popup.style.width = '100%'
  popup.style.height = '100%'
  popup.style.display = 'flex'
  popup.style.alignItems = 'center'
  popup.style.justifyContent = 'center'
  popup.innerText = color
  document.body.appendChild(popup)

  console.log('hellllllllllllloooooo cheyyenne')

  // Remove the popup after 3 seconds
  setTimeout(() => {
    document.body.removeChild(popup)
  }, 3000)
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get('color', (data) => {
    let currentColor = data.color
    for (let buttonColor of buttonColors) {
      // Create a button with that color
      let button = document.createElement('button')

      // This changes the color in the dataset
      button.dataset.color = buttonColor
      button.style.backgroundColor = buttonColor

      // Mark the currently selected color
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName)
      }

      // Register a listener for when the button is clicked
      button.addEventListener('click', handleButtonClick, false)
      page.appendChild(button)
    }
  })
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors)
