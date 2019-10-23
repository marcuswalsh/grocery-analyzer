// Grocery Analyzer

// Gets product information
let itemList = [];
fetch("grocery-data.txt")
    .then((rawData) => rawData.text())
    .then(processData);


function processData(textData){
    lines = textData.split('\r\n');
    for(i = 0; i < lines.length; i ++){
        itemList.push(createProductObject(lines[i]));
    }
}

function createProductObject(textLine) {
    textLineArray = textLine.split(';');
    return {
        name: textLineArray[0],
        price: Number(textLineArray[1]),
        country: textLineArray[2]
    }
}



// DOM Elements
let outputEl = document.getElementById('output');

// Main Menu & Go Button
document.getElementById('go').addEventListener('click', mainMenu);

function mainMenu() {
    // Get value of menu select element
    let selection = document.getElementById('menu').value;
    // Clears any previous output
    outputEl.innerHTML = '';

    // Take action based on menu selection
    if (selection == 'option1') {
        // Prints every product, one per line
        for(i = 0; i < itemList.length; i ++){
            outputEl.innerHTML += itemList[i].name + ', $' + itemList[i].price + ' (' + itemList[i].country + ')<br>';
        }
        outputEl.innerHTML += 'Total items: ' + itemList.length;

    } else if (selection == 'option2') {
        // Gets price range from user, outputs every item within the range
        let minPrice = prompt('Enter minimum price');
        let maxPrice = prompt('Enter maximum price');
        let itemsPrinted = 0;
        for(i = 0; i < itemList.length; i ++){
            if(itemList[i].price <= maxPrice && itemList[i].price >= minPrice){
                outputEl.innerHTML += itemList[i].name + ', $' + itemList[i].price + ' (' + itemList[i].country + ')<br>';
                itemsPrinted ++;
            }
        }
        outputEl.innerHTML += 'Total items: ' + itemsPrinted;

    } else if (selection == 'option3') {
        // Gets a country from user and outputs every product from that country
        let chosenCountry = prompt('Select a country').toLowerCase();
        let itemsPrinted = 0;
        for(i = 0; i < itemList.length; i ++){
            if(itemList[i].country.toLowerCase() == chosenCountry){
                outputEl.innerHTML += itemList[i].name + ', $' + itemList[i].price + ' (' + itemList[i].country + ')<br>';
                itemsPrinted ++;
            }
        }
        outputEl.innerHTML += 'Total items: ' + itemsPrinted;

    } else if (selection == 'option4') {
        // Prints a random item
        let randIndex = Math.round(Math.random()*itemList.length)-1;
        outputEl.innerHTML += itemList[randIndex].name + ', $' + itemList[randIndex].price + ' (' + itemList[randIndex].country + ')<br>';

    } else if (selection == 'option5'){
        // Raises prices by 7%
        for(i = 0; i < itemList.length; i ++){
            itemList[i].price = Math.round(itemList[i].price*107)/100;
        }
        outputEl.innerHTML = 'Prices raised by 7%';

    } else if(selection == 'option6') {
        // Outputs cheapest, most expensive, and average price of products
        let lowestPrice = itemList[0].price;
        let highestPrice = itemList[0].price;
        let averagePrice = itemList[0].price;

        for(i = 0; i < itemList.length; i ++) {
            averagePrice += itemList[i].price;
            if(itemList[i].price > highestPrice){
                highestPrice = itemList[i].price;
            } else if(itemList[i].price < lowestPrice) {
                lowestPrice = itemList[i].price;
            }
        }
        averagePrice /= itemList.length;
        averagePrice = Math.round(averagePrice*100) / 100;
        outputEl.innerHTML = 'Lowest Price: $' + lowestPrice + '<br>' + 'Highest Price: $' + highestPrice + '<br>' + 'Average Price: $' + averagePrice;

    } else if(selection == 'option7'){
        // Adds a custom product to the list
        let newItem = {name: '', price: '', country: ''}
        newItem.name = prompt('Enter product\'s name');
        newItem.price = Number(prompt('Enter product\'s price'));
        newItem.country = prompt('Enter product\'s country of origin');
        itemList.push(newItem);
        outputEl.innerHTML = 'Item \'' + newItem.name + '\' from ' + newItem.country + ' succesfully added for $' + newItem.price;

    } else if(selection == 'option8') {
        // Removes any products under $15, outputs amount of removed items
        let itemsRemoved = 0;
        for(i = 0; i < itemList.length; i ++) {
            if(itemList[i].price < 15) {
                itemList.splice(i, 1);
                i --;
                itemsRemoved ++;
            }
        }
        outputEl.innerHTML = "Amount of items removed: " + itemsRemoved;

    } else if(selection == 'option9') {
        // Gets product from user to remove, outputs confirmation of removal
        let removedItem = prompt('Enter the name of the item you wish removed').toLowerCase();
        let itemFound = false;
        for(i = 0; i < itemList.length; i ++){
            if(itemList[i].name.toLowerCase() == removedItem){
                itemList.splice(i, 1);
                i --;
                outputEl.innerHTML = "Item succesfully removed";
                itemFound = true;
            }
        }
        if(!itemFound) {
            outputEl.innerHTML = 'Item(s) not found';
        }
    }
}