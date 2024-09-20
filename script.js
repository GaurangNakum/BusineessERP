document.getElementById('fetchData').addEventListener('click', async () => {
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6eXRqbm14dmVnbnN3d2pzbm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MzExNDAsImV4cCI6MjA0MjMwNzE0MH0.47T5g04UTUUhyNiMSJuszjzm9R3xkuV3FFQeNTPSh3o';
  const url = 'https://izytjnmxvegnswwjsnmw.supabase.co/rest/v1/AMAS?select=*';  // Update if needed

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'apikey': apikey,
              'Authorization': `Bearer ${apikey}`,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.length > 0) {
          populateTable(data);
      } else {
          alert('No data found');
      }
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});

function populateTable(data) {
  // Get table header and body elements
  const tableHeader = document.getElementById('tableHeader');
  const tableBody = document.getElementById('tableBody');

  // Clear any existing table rows
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  // Create table headers dynamically from the first data object's keys
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      tableHeader.appendChild(th);
  });

  // Create table rows dynamically for each data object
  data.forEach(rowData => {
      const tr = document.createElement('tr');

      headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = rowData[header];
          tr.appendChild(td);
      });

      tableBody.appendChild(tr);
  });

  // Initialize DataTables on the populated table
  $('#dataTable').DataTable({
      destroy: true,  // Ensure re-initialization on each fetch
      paging: true,   // Enable pagination
      searching: true,  // Enable searching
      ordering: true,   // Enable column sorting
      lengthChange: true,  // Allow changing page size
  });
}
