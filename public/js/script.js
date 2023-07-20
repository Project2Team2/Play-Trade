const searchBox = document.querySelector('#search-input')
const searchBtn = document.getElementById("search-button");

/* searchBtn.addEventListener("click", ()=>{
    const searchvalue = document.querySelector('#search-input').value
    
}); */

//toggle button function NOT WORKING
/* document.ready(function() {
    document.querySelector('#sidebarToggle').addEventListener('click', (function() {
      document.querySelector('#layoutSidenav').toggleClass('show');
    }));
  }); */

//pres log in button get routed to main.handlebars NOT WORKING
/* document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        
        // Get the form action URL
        var action = loginForm.getAttribute('action');
        
        // Redirect to the specified URL
        window.location.href = action;
    });
}); */

function up(max) {
  document.getElementById("stockNumber").value = parseInt(document.getElementById("stockNumber").value) + 1;
  if (document.getElementById("stockNumber").value >= parseInt(max)) {
      document.getElementById("stockNumber").value = max;
  }
}
function down(min) {
  document.getElementById("stockNumber").value = parseInt(document.getElementById("stockNumber").value) - 1;
  if (document.getElementById("stockNumber").value <= parseInt(min)) {
      document.getElementById("stockNumber").value = min;
  }
}
