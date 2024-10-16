const cheerio = require('cheerio');
const fs = require('fs');

function getAllDivsFromHtml(htmlFilePath) {
    // Read the HTML file
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    // Load the HTML content into Cheerio
    const $ = cheerio.load(htmlContent);

    // Find all div elements
    const divs = $('div').toArray();

    // Return the list of divs
    return divs.map(div => $(div).html()); // Extract inner HTML of each div
}

// Example usage
const divs = getAllDivsFromHtml('.\\python\\interactive_map_3.html');
console.log(divs);
