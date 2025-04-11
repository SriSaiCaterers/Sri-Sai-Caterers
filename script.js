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

  if (!members) {
    alert("Please enter the number of members.");
    return;
  }

  let message = `Sri Sai Caterers Order\n`;
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
