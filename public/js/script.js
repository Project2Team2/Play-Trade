const searchBox = document.querySelector('#search-input')
const searchBtn = document.getElementById("search-button");

/* searchBtn.addEventListener("click", ()=>{
    const searchvalue = document.querySelector('#search-input').value
    
}); */

//toggle button function NOT WORKING
document.addEventListener('DOMContentLoaded', function () {
    var sidebarToggle = document.getElementById('sidebarToggle');
    var layoutSidenav = document.getElementById('layoutSidenav');
    
    sidebarToggle.addEventListener('click', function (event) {
        event.preventDefault();
        
        layoutSidenav.classList.toggle('sb-sidenav-toggled');
    });
});

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