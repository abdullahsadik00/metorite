// map
const displayMap = (mapData)=>{
  const map = L.map("map");
map.setView([18.66, 74.71], 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
for (let i = 0; i < mapData.length; i++) {
  const d = mapData[i];
  L.marker([d.reclat, d.reclong], {
    title: `${d.name}`,
  })
    .bindPopup(
` <span> Name</span>
<h2>${d.name}</h2>
<span>Class</span>
<h2>${d.recclass}</h2>
<span>Mass (g)</span>
<h2>${d.mass}</h2>
<span>Year</span>
<h2>${d.year}</h2>
<span>Country</span>
<h2>Yemen</h2>
`
    )
    .addTo(map);
}
L.marker([18.66, 74.71], {
  title: `india`,
})
  .bindPopup(`india sadik 22 `)
  .addTo(map);

}
console.log(L);

// bar graph
// Initialize the year histogram
const yearHistogram = new Chart(document.getElementById("yearHistogram"), {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Number of Strikes by Year",
        data: [],
        backgroundColor: "rgb(225, 85, 33, 0.2)",
        borderColor: "rgb(225, 85, 33, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function updateChart(results) {
  console.log(results);
  const average = document.getElementById("averageStrikes");
  const total = document.getElementById("totalStrikes");

  const years = results.map((item) =>
    item.year ? item.year.substring(0, 4) : "Unknown"
  );
  const yearCounts = {};
  years.forEach((year) => (yearCounts[year] = (yearCounts[year] || 0) + 1));

  // Update the year histogram data
  yearHistogram.data.labels = Object.keys(yearCounts);
  yearHistogram.data.datasets[0].data = Object.values(yearCounts);

  yearHistogram.update();

  // Calculate and log the average strikes
  const averageStrikes = calculateAverageStrikes(yearCounts);
  console.log("Average Strikes per Year:", averageStrikes);
  average.innerHTML = `${averageStrikes}`;
  // Calculate and log the total strikes
  const totalStrikes = calculateTotalStrikes(yearCounts);
  console.log("Total Strikes:", totalStrikes);
  total.innerHTML = `${totalStrikes}`;
}

// Calculate the average number of strikes
function calculateAverageStrikes(yearCounts) {
  const totalYears = Object.keys(yearCounts).length;
  const totalStrikes = Object.values(yearCounts).reduce(
    (total, count) => total + count,
    0
  );

  if (totalYears === 0) {
    return 0;
  }

  const averageStrikes = Math.round(totalStrikes / totalYears);
  return averageStrikes;
}

// Calculate the total number of strikes
function calculateTotalStrikes(yearCounts) {
  const totalStrikes = Object.values(yearCounts).reduce(
    (total, count) => total + count,
    0
  );
  return totalStrikes;
}

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
  document.getElementById("pageNumber").innerHTML = pageNum;
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
    updateChart(fetchedData);
    displayMap(fetchedData)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
