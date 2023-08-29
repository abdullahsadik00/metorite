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
      console.log(item.year.format('D-MM-YYYY'))
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
let pageUL = document.querySelector(".pagination");
let paginationNumbers = document.querySelector(".pagination1");
let perPage = document.querySelector("#itemPerPage");
let preButton = document.getElementById("prev-button")
let nextButton = document.getElementById("next-button")
let tr = tbody.querySelectorAll("tr")
console.log(tr.length)
let pageLimit = 2;
let pageCount = Math.ceil(tr.length / pageLimit)
let currentPage = 3;
// console.log(tbody);
// console.log(pageUL);
// console.log(itemShow);
// console.log(tr);

perPage.onchange = giveTrPerPage;

function giveTrPerPage(){
pageLimit = Number(this.value)
  console.log(pageLimit)
}

const enalbeButton = (button) =>{
  button.classList.remove("disabled:opacity-50")
  button.removeAttribute("disabled")
}
const disableButton = (button) => {
  button.classList.add("disabled:opacity-50")
  button.setAttribute("disabled",true)
}

const handlePageButton = () => {
  if(currentPage === 1){
    disableButton(preButton)
  }else{
    enalbeButton(preButton)
  }

  console.log(pageCount)
  if(pageCount === currentPage){
    disableButton(nextButton)
  }else{
    enalbeButton(nextButton)
  }
}
// handlePageButton()
const handleActivePageNumber = () => {
  document.querySelectorAll("pagination").forEach((button) => {
    button.classList.remove("active")
    const pageIndex = Number(button.getAttribute("page-index"));
    if(pageIndex == currentPage){
      button.classList.add("active")
    }
  })
}

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button")
  pageNumber.className = "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index)
  pageNumber.setAttribute("aria-label", "Page " + index)

  pageUL.appendChild(pageNumber)
}

const getPaginationNumber = () => {
  for(let i = 1 ; i <= pageCount ; i++) {
    appendPageNumber(i)
  }
  console.log(pageCount)
}

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  handleActivePageNumber();
  handlePageButton();

  const prevRange = (pageNum - 1) * pageLimit;
  const currRange = (pageNum) * pageLimit;

  tr.forEach((item,index) => {
    item.classList.add("hidden");
    if(index < currRange && index >= prevRange){
      item.classList.remove("hidden")
    }
  })
}

window.addEventListener("load",()=>{
  getPaginationNumber()
  setCurrentPage(1)

  preButton.addEventListener("click",()=>{
    setCurrentPage(currentPage - 1)
  })
  nextButton.addEventListener("click",()=>{
    setCurrentPage(currentPage + 1)
  })
  document.querySelectorAll(".pagination").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

                if (pageIndex) {
                    button.addEventListener("click", () => {
                        setCurrentPage(pageIndex);
                    });
                }
  } )
})