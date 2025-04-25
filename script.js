const menuItems = {
  rice: [
    "White Rice",
    "Bhagara Rice",
    "Kothimeera Rice",
    "Pudina Rice",
    "Jeera Rice",
    "Lemon Rice",
    "Pulihora Rice(Chintapondu)",
    "Gongura Rice",
    "Tomato Rice",
    "Curd Rice",
    "Veg Biryani",
    "Veg Dum Biryani",
    "Paneer Biryani",
    "Mushroom Biryani",
    "Kaju Biryani",
    "Panaskaya Biryani",
  ],
  roti: [
    "Chapathi",
    "Pulka",
    "Poori",
    "Rumal Roti",
  ],
  gravycurry: [
    "paneer Curry",
    "Mixed Veg Curry",
    "Chenna Masala Curry",
    "Pool Makani",
    "Baby Corn Curry",
    "Kaju Curry"
  ],
  curry:[
    "Allam Mirchi Vankai",
    "Guthi Vankai",
    "Kaju Mulakada",
    "Sanagapappu Birakai",
    "Aloo Tomato",
    "Aloo Capsicum",
    "Chikudikaya Tomato",
  ],
  fry:[
    "Baby Corn 65",
    "Cabbage 65",
    "Dondakai 65",
    "Aloo 65",
    "Gobi 65",
    "Dondakai Oil Fry",
    "Bendakai Oil Fry",
    "Aloo Fry",
    "Aratikai Kobbari",
    "Vankai Fry",
    "Cabbage Fry",
    "Aloo Menthikura",
  ],
  dal:[
    "Mamidikai Pappu",
    "Menthikura Pappu",
    "Paalakura Pappu",
    "ThotaKura Pappu",
    "Tomato Pappu",
    "Gongura Pappu",
    "Mulakkada Pappu",
  ],
  sambar:[
    "Majjiga Charu",
    "Majjiga Pulusu",
    "Rasam",
    "Sambar",
    "Oolva Charu",
    "Pachi Pulusu",
  ],
  curd:[
    "Curd",
    "Raita",
  ],
  rotichutney:[
    "Beerakai",
    "Gongura",
    "Dondakai",
    "Kothimeera",
    "Mullangi",
    "Sorakai",
    "vankai",
    "Tomato",
    "Dosakaya",
  ],
  sweets:[
    "Badusha",
    "Bobbatlu",
    "Pornam",
    "Boondi Laddu",
    "carrot Halwa",
    "Sorakaya Halwa",
    "Cheekara Pongal",
    "Double Ka Meeta",
    "Gulab Jaamun",
    "Rava Kesari",
    "Sagubiyyam Payasam(sugar)",
    "Sagubiyyam payasam(bellam)",
  ],
  hot:[
    "Aloo Samosa",
    "Aratikai Bajji",
    "Mirchi Bajji",
    "Thamalapak Bajji",
    "Thamalapak Vada",
    "Masala Vada",
    "Gaari",
    "Sweet Corn Samosa",
  ],
  chips:[
    "Chips",
    "Dahi Mirchi",
    "Papad",
    "Minapa Vadiyalu",
    "Podi",
    "Ghee",
  ],
  pickels:[
    "Aavakai",
    "Lemon",
    "Tomato",
  ],
  extraitems:[
    "Fruit Salad",
    "Ice Cream",
    "Sweet Paan,Paan",
    "Veg Cutlets",
    "Veg Machuria",
    "Welcome Drink",
  ],
  extraservice:[
    "Boys",
    "Water",
  ]
};

function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  Object.entries(menuItems).forEach(([category, items]) => {
    const section = document.createElement("div");
    section.className = "category-section";

    const heading = document.createElement("h4");

    let limitNote = "";
    if (category === "rice") {
      limitNote = " (any 3)";
    } else if (category === "roti") {
      limitNote = " (any 1)";
    } else if (category === "gravycurry") {
      limitNote = " (any 1)";
    } else if(category === "curry") {
      limitNote = " (any1)";
    } else if(category === "fry") {
      limitNote = " (any1)";
    } else if(category === "dal") {
      limitNote = " (any1)";
    } else if(category === "sambar") {
      limitNote = " (any1)";
    } else if(category === "curd") {
      limitNote = " (any2)";
    } else if(category === "rotichutney") {
      limitNote = " (any1)";
    } else if(category === "sweets") {
      limitNote = " (any1)";
    } else if(category === "hot") {
      limitNote = " (any1)";
    } else if(category === "chips") {
      limitNote = " (any5)";
    } else if(category === "pickels") {
      limitNote = " (any1)";
    }
    heading.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} Items${limitNote}`;
    section.appendChild(heading);

    const column = document.createElement("div");
    column.className = "menu-column";

    items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = `menu-item ${category}`;
      itemDiv.innerText = item;
      itemDiv.addEventListener("click", () => {
        itemDiv.classList.toggle("selected");
        updatePreview();
      });
      column.appendChild(itemDiv);
    });

    section.appendChild(column);
    menuDiv.appendChild(section);
  });
}

function updatePreview() {
  const preview = document.getElementById("selectedPreview");
  preview.innerHTML = "";

  Object.keys(menuItems).forEach(category => {
    const selected = Array.from(document.querySelectorAll(`.menu-item.${category}.selected`)).map(el => el.innerText);
    if (selected.length > 0) {
      const section = document.createElement("div");
      section.innerHTML = `<strong>${category.toUpperCase()}:</strong><br>` + selected.map(i => `• ${i}`).join("<br>");
      preview.appendChild(section);
    }
  });
}

function sendToWhatsApp() {
  const members = document.getElementById("members").value;
  const functionDate = document.getElementById("functionDate").value;
  const functionTime = document.getElementById("functionTime").value;


  if (!members) {
    alert("Please enter the number of members.");
    return;
  }

const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();

let message = `Sri Sai Caterers Order\n`;
message += `Order Date: ${date}\n`;
message += `Order Time: ${time}\n`;
message += `Function Date: ${functionDate}\n`;
message += `Function Time: ${functionTime}\n`;
message += `Members: ${members}\n\n`;



  Object.keys(menuItems).forEach(category => {
    const selected = Array.from(document.querySelectorAll(`.menu-item.${category}.selected`)).map(el => el.innerText);
    if (selected.length > 0) {
      message += `${category.toUpperCase()}:\n${selected.map(item => `• ${item}`).join("\n")}\n\n`;
    }
  });

  if (message.trim() === "") {
    alert("Please select at least one menu item.");
    return;
  }

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", loadMenu);
