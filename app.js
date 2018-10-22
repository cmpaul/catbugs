/**
 * app.js
 * Display cats from the Cat API (https://thecatapi.com)
 */

/**
 * Makes the HTTP request and formats the response
 * @param {string} url 
 * @returns {Object}
 */
function fetch(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return JSON.parse(xhttp.responseText); 
}

/**
 * Fetches categories and populates the select list
 * @param {string} selectedCategory 
 */
function getCategories(selectedCategory) {
    var selectList = document.getElementById('category');
    var categories = fetch('https://api.thecatapi.com/v1/categories');
    categories.forEach(function(category) {
        var opt = document.createElement('option');
        opt.value = category.id;
        opt.innerHTML = category.name;
        if (selectedCategory === category.id) {
            opt.selected = true;
        }
        selectList.appendChild(opt);
    });
};

/**
 * Gets cats for a given category and displays them
 * @param {string} category 
 */
function getCats(category) {
    if (!category) return;
    var catPics = document.getElementById('cat-pics');
    var cats = fetch('https://api.thecatapi.com/v1/images/search?&category_ids=' + category);
    if (!cats || cats.length === 0) {
        var p = document.createElement('p');
        p.innerHTML = 'No cats found';
        catPics.appendChild(p);
        return;
    }
    cats.forEach(function(cat) {
        var item = document.createElement('li');
        var img = document.createElement('img');
        img.src = cat.url;
        item.appendChild(img);
        catPics.appendChild(item);
    })
}

/**
 * Initialize the app
 */
function init() {
    var urlParts = /category=([^&]*)/gi.exec(window.location.href);
    var category = urlParts[1];
    getCategories(category);
    getCats(category);
}
