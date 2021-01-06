
const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  message1.textContent = 'Loading'

  const location = search.value

  fetch('/weather?address='+location).then(response => {
    response.json().then(data => {
      console.log(data);
      if (data.error) {
        message2.textContent = data.error
      }
      else{
        message1.textContent = data.location
        message2.textContent = data.response
      }
    })
  })
})