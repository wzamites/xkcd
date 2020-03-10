const changeImage = () => {
  disableButton()
  fetch('/api')
    .then(response => response.json())
    .then((data) => {
      document.getElementById('comicImg').src = data
      enableButton()
    })
}

const disableButton = () => {
  document.getElementById("button").disabled = true
  document.getElementById("button").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>'
}

const enableButton = () => {
  document.getElementById("button").disabled = false
  document.getElementById("button").innerHTML = 'Random'
}
