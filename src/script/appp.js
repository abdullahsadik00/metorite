let tbody = document.querySelector("tbody");
let pageUL = document.querySelector(".pagination");
let paginationNumbers = document.querySelector(".pagination1");
let perPage = document.querySelector("#itemPerPage");
let preButton = document.getElementById("prev-button");
let nextButton = document.getElementById("next-button");
let tr = tbody.querySelectorAll("tr");
let pageLimit = 120;
let pageCount = 1;
let currentPage = 3;

const createRows = (initial, last) => {
  let tbody = document.getElementById("tbody");
  const hasChildElements = tbody.hasChildNodes();

  if (hasChildElements) {
    tbody.innerHTML = "";
  }

  for (let i = initial - 1; i < last; i++) {
    let row = `
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${
      data[i].name
    }</td>
    <td class="px-6 py-4">${i + 1}</td>
    <td class="px-6 py-4">Composition Type</td>
    <td class="px-6 py-4">${data[i].mass} </td>
    <td class="px-6 py-4">${data[i].year}</td>
    <td class="px-6 py-4">${data[i].recclass}</td>
    <td class="px-6 py-4">50.775</td>
    <td class="px-6 py-4">6.08333</td>
    <td class="px-6 py-4">12</td>
    <td class="px-6 py-4">USA</td>
  </tr>
    `;
    tbody.innerHTML += row;
  }
};
perPage.onchange = giveTrPerPage;

function giveTrPerPage() {
  pageLimit = Number(this.value);
  console.log(pageLimit);
}

const enalbeButton = (button) => {
  button.classList.remove("disabled:opacity-50");
  button.removeAttribute("disabled");
};
const disableButton = (button) => {
  button.classList.add("disabled:opacity-50");
  button.setAttribute("disabled", true);
};

const handlePageButton = () => {
  if (currentPage === 1) {
    disableButton(preButton);
  } else {
    enalbeButton(preButton);
  }

  console.log(pageCount);
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enalbeButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll("pagination").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className =
    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  pageUL.appendChild(pageNumber);
};

const getPaginationNumber = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
  console.log(pageCount);
};
const setCurrentPage = (pageNum, data) => {
  // new code
  if (pageNum == 1) {
    const initial = pageNum;
    const last = pageNum * 10;
    createRows(initial, last, data);
    console.log(initial, last);
  } else {
    const initial = (pageNum - 1) * 10 + 1;
    const last = pageNum * 10;
    createRows(initial, last, data);
    console.log(initial, last);
  }
  // end here

  currentPage = pageNum;
  handleActivePageNumber();

  const prevRange = (pageNum - 1) * pageLimit;
  const currRange = pageNum * pageLimit;
  //
  tr.forEach((item, index) => {
    item.classList.add("hidden");
    if (index < currRange && index >= prevRange) {
      item.classList.remove("hidden");
    }
  });
};

let input = document.getElementById("inputSearchBar");
input.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
  let inputBox = document.getElementById("inputBox");

  if (data != undefined) {
    data = JSON.parse(data); 
    console.log(data.length);

    for (const item of data) {
      for (const key in item) {
        if (item.hasOwnProperty(key) && item[key] == inputBox.value) {
          console.log(item);
        }
      }
    }
    console.log(inputBox.value);
    const foundObject = data.find((item) => item.name === inputBox.value);
    if (foundObject) {
      console.log("Object found:", foundObject);
      createRows(foundObject);
    } else {
      console.log("Object not found");
    }
  }
});

function fetchData() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((res) => {
      data = res;
      return data;
    });
}
function Example() {
  console.log("example");
}
fetchData()
  .then((fetchedData) => {
    console.log(fetchedData);
    getPaginationNumber();
    setCurrentPage(1, fetchData);

    preButton.addEventListener("click", () => {
      console.log("previous button has beenn clicked");
      setCurrentPage(currentPage - 1, fetchData);
    });
    nextButton.addEventListener("click", () => {
      let tbody = document.getElementById("tbody");
      tbody.innerHTML += "";

      setCurrentPage(currentPage + 1, fetchData);
      console.log("next button has beenn clicked");
    });
    document.querySelectorAll(".pagination").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));

      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
