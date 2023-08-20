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
