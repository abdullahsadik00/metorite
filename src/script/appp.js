let tbody = document.querySelector("tbody");
let pageUL = document.querySelector(".pagination");
let paginationNumbers = document.querySelector(".pagination1");
let perPage = document.querySelector("#itemPerPage");
let preButton = document.getElementById("prev-button");
let nextButton = document.getElementById("next-button");
let tr = tbody.querySelectorAll("tr");
let pageLimit = 120;
let pageCount = 1;
let currentPage = 1;

// map
const map = L.map("map");
map.setView([18.66, 74.71], 7);

const displayMap = () => {
  // const map = L.map("map");
  // map.setView([18.66, 74.71], 7);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([18.66, 74.71], {
    title: `india`,
  })
    .bindPopup(`india sadik 22 `)
    .addTo(map);
};

const updateMap = (mapData) =>{
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

}

////////////////////////////////////////////////map end here///////////////////////////////////////////////////////////////
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


// 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// openModalBtn.addEventListener("click", openModal);
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);

function myFunction(a) {
  console.log(originalData)
  alert(a);
  const filteredData = originalData.filter(item=>{
    return item.recclass == a
  })
  console.log(filteredData)
  updateChart(filteredData);
  updateMap(filteredData)
  // displayMap(filteredData);
  openModal();
}
const createRows = (initial, last,dataToBeDisplay) => {
  let tbody = document.getElementById("tbody");
  const hasChildElements = tbody.hasChildNodes();
  if (hasChildElements) {
    tbody.innerHTML = "";
  }
  for (let i = initial - 1; i < last; i++) {
    let date = new Date(dataToBeDisplay[i].year);
    let year = date.getFullYear()
    let row = `
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onclick="myFunction('${
      dataToBeDisplay[i].name
    }')"> ${dataToBeDisplay[i].name}</td>
    <td class="px-6 py-4"
    >${i + 1}</td>
    <td class="px-6 py-4"
    onclick="myFunction('${
      dataToBeDisplay[i].mass
    }')"
    >${dataToBeDisplay[i].mass} </td>
    <td class="px-6 py-4"
    onclick="myFunction('${
      year
    }')"
    >${year}</td>
    <td class="px-6 py-4"
    onclick="myFunction('${
      dataToBeDisplay[i].recclass
    }')"
    >${dataToBeDisplay[i].recclass}</td>
    <td class="px-6 py-4">50.775</td>
    <td class="px-6 py-4">6.08333</td>
    
  </tr>
    `;
    tbody.innerHTML += row;
  }
};
const setCurrentPage = (pageNum, data) => {
  // new code
  if(pageNum == 1 || pageNum < 1){
    pageNum = 1
  }
  document.getElementById("pageNumber").innerHTML = pageNum;
  if (pageNum == 1) {
    const initial = pageNum;
    const last = pageNum * 10;
    createRows(initial, last, data);
    console.log(initial, last);
    console.log(pageNum)
  } else {
    const initial = (pageNum - 1) * 10 + 1;
    const last = pageNum * 10;
    createRows(initial, last, data);
    console.log(initial, last);
  }
  // end here

};


function fetchData() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((res) => {
      // data = res;
      return res;
    });
}




let input = document.getElementById("inputSearchBar");
let originalData = []; // Make a copy of the original data

input.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputBox = document.getElementById("inputBox");
  const searchValue = inputBox.value.trim().toLowerCase();

  if (searchValue) {
    const filteredData = originalData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    if (filteredData.length > 0) {
      console.log("Objects found:", filteredData);
      setCurrentPage(1,filteredData)
      // createRows(filteredData);
    } else {
      console.log("No matching objects found");
      tbody.innerHTML = "<tr><td colspan='10'>No matching objects found</td></tr>";
    }
  } else {
    console.log("Displaying all data");
    console.log(originalData);
    setCurrentPage(1,originalData)

    // createRows(originalData); // Display the original data
  }
  inputBox.value = ""; // Clear the search input
});

















fetchData()
  .then((fetchedData) => {
    originalData = [...fetchedData]
    console.log(originalData);
    setCurrentPage(1, originalData);
    preButton.addEventListener("click", () => {
      console.log("previous button has beenn clicked");
      currentPage--;
      if(currentPage !== 1)
      setCurrentPage(currentPage - 1, originalData);
    });
    nextButton.addEventListener("click", () => {
      let tbody = document.getElementById("tbody");
      tbody.innerHTML += "";
currentPage++;
      setCurrentPage(currentPage + 1, originalData);
      console.log("next button has beenn clicked");
    });
    updateChart(fetchedData);
    displayMap();
    // updateMap(fetchedData)
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
