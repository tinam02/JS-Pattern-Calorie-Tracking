//! Storage  Controller
//! Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    //or state
    items: [
      //  items dynamically added here
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    //public methods
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      //   create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //   Calories to numbers
      calories = parseInt(calories);

      // create new item
      newItem = new Item(ID, name, calories);

      //   push new item to data;
      data.items.push(newItem);
      return newItem;
    },
    getTotalCalories: function () {
      // loop through items and sum;
      let total = 0;

      data.items.forEach(function (item) {
        total += item.calories;
      });
      //   set total cals
      data.totalCalories = total;

      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

//!UI Controller
const UICtrl = (function () {
  //* HTML elements
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };

  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="item-${item.id}}">
        <strong>${item.name} </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }; //vraca objekat sa imenom i kalorijama
    },
    addListItem: function (item) {
      // show list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // add class and dynamic id
      li.className = "collection-item";
      li.id = `item-${item.id}`;

      //   add html
      li.innerHTML = ` <strong>${item.name} </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      //   insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//!App Controller (MAIN)
const App = (function (ItemCtrl, UICtrl) {
  //* All initial event listeners -- called in init
  const loadEventListeners = function () {
    //   get UI Selectors from public return in UIctrl
    const UISelectors = UICtrl.getSelectors();

    // add event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  //?   Listener functions
  const itemAddSubmit = function (e) {
    e.preventDefault();

    //check for input from UI Ctrl;
    const input = UICtrl.getItemInput();

    // check for name and calorie input;
    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // add item to UI list
      UICtrl.addListItem(newItem);

      //   get total cals;
      const totalCalories = ItemCtrl.getTotalCalories();
      // add them to the ui
      UICtrl.showTotalCalories(totalCalories);

      //   clear fields
      UICtrl.clearInput();
    }
  };
  return {
    init: function () {
      //Fetch items
      const items = ItemCtrl.getItems();

      //   check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate list with items
        UICtrl.populateItemList(items);
      }
      //   get total cals;
      const totalCalories = ItemCtrl.getTotalCalories();
      // add them to the ui
      UICtrl.showTotalCalories(totalCalories);
      
      //Load evt listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialise
App.init();
