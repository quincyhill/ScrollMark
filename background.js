// background.js

let color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  // Will be also updated
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)

  let count = 12
  console.log(count)
})
