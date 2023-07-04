// Get the search input element
const searchInput = document.getElementById('searchInput');
// Get the table body element
const tableBody = document.getElementById('tbody1');
// Get all table rows
const rows = tableBody.getElementsByTagName('tr');
// Add event listener to the search input
searchInput.addEventListener('input', function () {
  const searchText = searchInput.value.toLowerCase();
  // Loop through all table rows
  for (let i = 0; i < rows.length; i++) {
    const rowData = rows[i].getElementsByTagName('td');
    let found = false;
    // Loop through all table cells in current row
    for (let j = 0; j < rowData.length; j++) {
      const cellData = rowData[j].textContent.toLowerCase();
      
      // Check if the cell data contains the search text
      if (cellData.includes(searchText)) {
        found = true;
        break;
      }
    }

    // Show/hide the row based on the search result
    if (found) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
});
