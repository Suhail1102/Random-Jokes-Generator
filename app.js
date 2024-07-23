
////................................Accessing the elements .................................
const box= document.getElementById("box");
const btn= document.querySelector(".btn");

//.....................fetching the url

const url = 'https://official-joke-api.appspot.com/jokes/random';

const getjokes= async()=>{
  box.innerHTML=`<h2> Loading.....</h2>`
 let response= await fetch(url);
   console.log(response)//not in json fromat
let data= await response.json()//json format
console.log(data)
  box.innerHTML= `<h2> ${data.setup}<h2><br>`
  setTimeout(() => {
    box.innerHTML+=`<h2>${data.punchline}<h2>`
  }, 2000);
  
};
btn.addEventListener('click', (getjokes));