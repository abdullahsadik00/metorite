console.log("hello");
// Functionality
//      Search Component

//          User will be able to filter data in the search component by any of the following:
//          Name
//          Year of strike
//          Meteorite composition (recclass)
//          Mass range (e.g. low to high, inclusive)

// 1 => onload call a function which will fetch the data from api. DONE
// 2 => store the result in a variable
//      We have fetched the data and stored in a local storage. DONE
// 3 => on search check the type of data we want to fetch (ex : Name,Year of strike,Meteorite composition (recclass),Mass range (e.g. low to high, inclusive))
//      Receive data from input box
//      check the type of data
// 4 => if we found the result then show all the data in table format and if no result found with perticular query we show message "no result found"


// let dateSTr = "1880-01-01T00:00:00.000";
// let date = new Date(dateSTr);
// console.log(date.getDate());
// console.log(date.getDay());
// console.log(date.getMonth());
// console.log(date.getFullYear());
// console.log(date.getMinutes());

function fetchData() {
  fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
    .then((response) => response.json())
    .then((res) => {
      localStorage.setItem("response", JSON.stringify(res));
    });
}

// let input = document.getElementById("inputSearchBar");
// input.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("form submitted");
//   let input = document.getElementById("inputBox");
//   let data = localStorage.getItem("response");

//   if (data != undefined) {
//     console.log(input);
//     const foundObject = data.find((item) => item.name === input.value);
//     if (foundObject) {
//       console.log("Object found:", foundObject);
//     } else {
//       console.log("Object not found");
//     }
//   }
// });

let input = document.getElementById("inputSearchBar");
input.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  let data = localStorage.getItem("response");
  let inputBox = document.getElementById("inputBox");

  if (data != undefined) {
    data = JSON.parse(data); // Parse the stored data
    console.log(data.length)

for(const item of data){
  for(const key in item){
    if(item.hasOwnProperty(key) && item[key] == inputBox.value){
      
      console.log(item)
    }
  }
}
    console.log(inputBox.value);
    const foundObject = data.find((item) => item.name === inputBox.value);
    if (foundObject) {
      console.log("Object found:", foundObject);
    } else {
      console.log("Object not found");
    }
  }
});


let tbody = document.querySelector("tbody");
let pageUl = document.querySelector(".pagination");
let itemShow = document.querySelector("#itemPerPage");
let tr = tbody.querySelectorAll("tr");
let emptyBox = [];
let index = 1;
let itemPerPage = 8;

for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

itemShow.onchange = giveTrPerPage;
function giveTrPerPage(){
  itemPerPage = Number(this.value);
  console.log(itemPerPage);
  displayPage(itemPerPage);
  pageGenerator(itemPerPage);
  getpagElement(itemPerPage);
}

function displayPage(limit){
  tbody.innerHTML = '';
  for(let i=0; i<limit; i++){
    tbody.appendChild(emptyBox[i]);
  }
  const  pageNum = pageUl.querySelectorAll('.list');
  pageNum.forEach(n => n.remove());
}
displayPage(itemPerPage);
function pageGenerator(getem){
  const num_of_tr = emptyBox.length;
  if(num_of_tr <= getem){
    pageUl.style.display = 'none';
  }else{
    pageUl.style.display = 'flex';
    const num_Of_Page = Math.ceil(num_of_tr/getem);
    for(i=1; i<=num_Of_Page; i++){
      const li = document.createElement('li'); li.className = 'list';
      const a =document.createElement('a'); a.href = '#'; a.innerText = i;
      a.setAttribute('data-page', i);
      li.appendChild(a);
      pageUl.insertBefore(li,pageUl.querySelector('.next'));
    }
  }
}
pageGenerator(itemPerPage);
let pageLink = pageUl.querySelectorAll("a");
let lastPage =  pageLink.length - 2;

function pageRunner(page, items, lastPage, active){
  for(button of page){
    button.onclick = e=>{
      const page_num = e.target.getAttribute('data-page');
      const page_mover = e.target.getAttribute('id');
      if(page_num != null){
        index = page_num;

      }else{
        if(page_mover === "next"){
          index++;
          if(index >= lastPage){
            index = lastPage;
          }
        }else{
          index--;
          if(index <= 1){
            index = 1;
          }
        }
      }
      pageMaker(index, items, active);
    }
  }

}
var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
pageRunner(pageLink, itemPerPage, lastPage, pageLi);

function getpagElement(val){
  let pagelink = pageUl.querySelectorAll("a");
  let lastpage =  pagelink.length - 2;
  let pageli = pageUl.querySelectorAll('.list');
  pageli[0].classList.add("active");
  pageRunner(pagelink, val, lastpage, pageli);
  
}



function pageMaker(index, item_per_page, activePage){
  const start = item_per_page * index;
  const end  = start + item_per_page;
  const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
  tbody.innerHTML = "";
  for(let j=0; j<current_page.length; j++){
    let item = current_page[j];					
    tbody.appendChild(item);
  }
  Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
     activePage[index-1].classList.add("active");
}





// search content 
var search = document.getElementById("search");
search.onkeyup = e=>{
  const text = e.target.value;
  for(let i=0; i<tr.length; i++){
    const matchText = tr[i].querySelectorAll("td")[2].innerText;
    if(matchText.toLowerCase().indexOf(text.toLowerCase()) > -1){
      tr[i].style.visibility = "visible";
    }else{
      tr[i].style.visibility= "collapse";
    }
  }
}