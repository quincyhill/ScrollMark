const colorChoiceDiv = document.querySelector('#colorChoiceDiv')

// Currently selected button
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

  // Dataset object
  let color = event.target.dataset.color
  event.target.classList.add(selectedClassName)
  chrome.storage.sync.set({ color })

  // Update current color selection
  document.querySelector('#buttonChoice').innerText = color
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  // this shit is not working...
  chrome.storage.sync.get('color', (data) => {
    let currentColor = data.color
    for (let buttonColor of buttonColors) {
      // Create a button with that color
      let button = document.createElement('button')

      // This changes the color in the dataset
      button.dataset.color = buttonColor
      button.style.backgroundColor = buttonColor
      // Add classname to the button
      button.classList.add('button__colorPick')

      // Mark the currently selected color
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName)
      }

      // Register a listener for when the button is clicked
      button.addEventListener('click', handleButtonClick, false)

      colorChoiceDiv.appendChild(button)
    }
  })
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors)

console.log(colorChoiceDiv)
