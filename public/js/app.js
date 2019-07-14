
fetch('http://puzzle.mead.io/puzzle').then((response) =>{

response.json().then((data) =>{

    console.log(data)
})

})






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
//messageone.textContent='from javascript'

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

   const location = search.value
   console.log(location);
   fetch('/weather?address='+location).then((response) =>{

    response.json().then((data) =>{

        if(data.error)
        {
            messageone.textContent = data.error
        }
        else{
            messageone.textContent = data.location
            
            messagetwo.textContent= data.forecast
        }

    })


})
})




