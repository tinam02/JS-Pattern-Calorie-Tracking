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
      {
        id: 0,
        name: "Steak",
        calories: 1200,
      },
      {
        id: 2,
        name: "Cookie",
        calories: 100,
      },
      {
        id: 3,
        name: "Egg",
        calories: 70,
      },
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
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }
  };
  return {
    init: function () {
      //Fetch items
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items);

      //Load evt listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialise
App.init();
