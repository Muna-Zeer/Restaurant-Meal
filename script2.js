const number = [];
const ITEMS = [


    {
        name: "Caramel Donuts",
        price: 8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUJNgqavAJWtXj5mehl7R2lCk3ec6kBTFgg&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
    {
        name: "Shrimps Rice",
        price: 12,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5v4LdlW9NNJopxbGoqEmoaWawexvMTEtBw&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
    {
        name: "Vegetable Pizza",
        price: 17,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1q-nxrgcH6a0il6N8rweiCpr5DrG055Xz4g&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
    {
        name: "Cheese Burger",
        price: 35,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZyPe3tteMV9ZwaWKnwiykDkCDYRDnz861Q&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
    {
        name: "Italian Pasta",
        price: 23,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajO4Kkch5Jeh45DX58l0W95GRrdDnTQqcuA&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
    {
        name: "Beef Samosa",
        price: 14,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIiseC_7hG9o6bptFxxZ234eiJ6ez32t6S9A&usqp=CAU",
        borderColor: "#CD104D",
        amount: 0
    },
];
function renderCard(ITEMS, index) {
    console.log("hello");
    const cont = document.getElementById("container");
    cont.innerHTML += `  <div class="items" id="items" style="border:1px solid ${ITEMS.borderColor}"onclick="changeBorder(${index})">
      <div class="image" style="background-image:url(${ITEMS.image});"></div>
  <div class="base"><h4>${ITEMS.name}</h4><h6 style="display: inline;">${ITEMS.price}$</h6>
  
  </div>
  </div>`;
}

function viewCard() {
    const cont = document.getElementById("container");
    cont.innerHTML = "";
    for (let i = 0; i < ITEMS.length; i++) {
        renderCard(ITEMS[i], i);
    }
}
let Item = [];
async function changeBorder(index) {
    console.log("card clicked");
    var ENTRY_NUM;
    try {
        ENTRY_NUM = parseInt(prompt("How Many item you want to add!!"));
        if (isNaN(ENTRY_NUM)) {
            throw new Error("Invalid Value")
        }
    } catch (error) {
        ENTRY_NUM = 0;
        alert("Invalid input. Defaulting to 0.");
    }
    number.push(ENTRY_NUM);
    TotalCCartItem();

    var arr = JSON.parse(localStorage.getItem("ITEMS")) || [];
    ITEMS[index].amount = ENTRY_NUM;
    for (var i = 0; i < ITEMS.length; i++) {
        ITEMS[index].amount = ENTRY_NUM;
    }
    const arrItem = { amount: ITEMS[index].amount, name: ITEMS[index].name, price: ITEMS[index].price };
    Item.push(arrItem);
    const oldLists = JSON.parse(localStorage.getItem("lists")) || [];
    let found = false;
    for (let i = 0; i < oldLists.length; i++) {
        if (oldLists[i].name === arrItem.name) {
            oldLists[i].amount = arrItem.amount;
            found = true;
            break;
        }
    }

    if (!found) {
        oldLists.push(arrItem);
    }

    localStorage.setItem("lists", JSON.stringify(oldLists));

    localStorage.setItem("numberAmount", JSON.stringify(number));
    ITEMS[index].borderColor = "green";
    viewCard();
}
console.log("arrItem outside", Item);
const TotalCCartItem = () => {
    var summ = 0;
    for (var w = 0; w < number.length; w++) {
        summ += number[w];
    }
    localStorage.setItem("summ", JSON.stringify(summ));

    console.log("  TotalCCartItemCart", summ);
    const storedLists = JSON.parse(localStorage.getItem("summ"));
    console.log("storedLists", JSON.stringify(storedLists));
    if (storedLists === null) {
        document.getElementById("value").innerHTML = 0;

    } else {
        document.getElementById("value").innerHTML = storedLists;

    }

}

