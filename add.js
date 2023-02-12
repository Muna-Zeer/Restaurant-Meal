

let tol = 0;

const drawTask = (arrItem, index) => {
  document.getElementById("list").innerHTML += `
  <div class="menu" id="menu">
  <p>${arrItem.name}</p>
  <p>${arrItem.price}* ${arrItem.amount}</p>
  
  <p>${mul(arrItem)}</p>
  <button class="delete" onclick="handleDelete(${index})"><i class="ph-x-circle" style="color: #ffffff;background-color:#CD104D;padding:3px"></i></button>
  </div>
  <hr width="40%" style="padding: 2px;background-color:#CD104D">
  </div>
  `;
  totalList(arrItem);

}
let resultmul = [];
const mul = (arrItem) => {
  resultmul = arrItem.price * arrItem.amount;

  return resultmul;

}

let summation = [];
const totalList = (arrItem) => {
  let list = JSON.parse(localStorage.getItem("lists"));
  const amount = parseInt(arrItem.amount);
  const price = parseInt(arrItem.price);
  const arr = { amount: amount, price: price }
  let summ = amount * price;

  tol = 0;

  for (var h = 0; h < list.length; h++) {
    tol += list[h].amount * list[h].price;

  }
  console.log("tol in for loop", tol);
  console.log("summation indide function", tol);

  localStorage.setItem("summation", JSON.stringify(tol));
  console.log("localStorage", localStorage);
  console.log("  Total", summ);
  const storedTasks = JSON.parse(localStorage.getItem("summation"));
  console.log("storedtasks", JSON.stringify(storedTasks));
  if (storedTasks === null) {
    document.getElementById("total").innerHTML = 0;
  } else {
    document.getElementById("total").innerHTML = storedTasks;
  }

}
console.log("the summation outside", summation);
console.log("the tol outside", tol);


const drawAllLists = () => {
  document.getElementById("list").innerHTML = " ";
  Item = JSON.parse(localStorage.getItem("lists"));
  for (let i = 0; i < Item.length; i++) {
    drawTask(Item[i], i);
  }
}

const loadLists = () => {
  Item = JSON.parse(window.localStorage.lists) || [];
  drawAllLists();
}

const handleDelete = (index) => {

  let storedTotal = JSON.parse(localStorage.getItem("summation")) || [];
  if (typeof storedTotal !== "number" || isNaN(storedTotal)) {
    storedTotal = 0;
    console.log('the recent value of stored total = 0');
  }
  
  // follow steps to splice item when click on the delete button
  if (summation.length !== null && summation.length !== 0 && summation.length !== undefined) {
    let tol = summation.splice(index, 1);
    console.log("tol", tol);
    storedTotal -= tol[0];
    console.log("storedTotal", storedTotal);
  } else {
    console.log('this is for error');
    storedTotal = 0;
    console.log("Array is empty. Setting storedTotal to 0");
    summation = [];
    console.log('summation', summation);
    document.getElementById("total").innerHTML = 0;
    // document.getElementById("value").innerHTML = 0;
    alert("Array is empty. Do you want to delete this item?");
  }
  
  localStorage.setItem("summation", JSON.stringify(storedTotal));
  
  
  const deleteItem = Item.splice(index, 1);
  console.log('the splice of item =', deleteItem);
  localStorage.setItem("lists", JSON.stringify(Item));
  deleteItemFromCart(index);
 
  drawAllLists();
}

const deleteItemFromCart = (index) => {
  //delete amount of item from shopping cart
  let cart = JSON.parse(localStorage.getItem("numberAmount")) || [];

  var item = cart[index];
  cart.splice(index, 1);
  localStorage.setItem("numberAmount", JSON.stringify(cart));
  //reduce the sum by removed item amount
  let sumAmount = JSON.parse(localStorage.getItem("summ"));
  sumAmount -= item;

  console.log('sumAmount', sumAmount);
  localStorage.setItem("summ", JSON.stringify(sumAmount));

  // Call the function to update the element's value
  let element = document.getElementById("value");
  console.log('the value of element', element);

  if (!element) {
    console.error("Element with id 'value' not found in the DOM.");
  } else {
    if (sumAmount === null || sumAmount === undefined) {
      element.innerHTML = 0;
    } else {
      element.innerHTML = sumAmount.toString();
    }
  }
}

const deleteAll = () => {

  Item = [];
  summation = 0;

  let updateSum = 0;
  const storedLists = JSON.parse(localStorage.getItem("summ"));

  localStorage.setItem("summ", updateSum);

  const storedTotal = JSON.parse(localStorage.getItem("summation"));
  localStorage.setItem("summation", summation);

  localStorage.setItem("lists", JSON.stringify(Item));
  drawAllLists();
  document.getElementById("clear-btn").style.display = "none";
  document.getElementById("add").innerHTML = 0;
  document.getElementById("value").innerHTML = 0;
  document.getElementById("list").innerHTML = "<h1>No Item in your cart</h1> ";
}


const storedLists = JSON.parse(localStorage.getItem("summ"));

if (storedLists === null) {
  document.getElementById("add").innerHTML = 0;

} else {
  document.getElementById("add").innerHTML = storedLists;

}





