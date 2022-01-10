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
    getItemByID: function (id) {
      let found = null;
      // loop through items;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
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
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
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
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;

      //show buttons
      UICtrl.showEditState();
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: function (total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      //opposite of cleareditstate
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
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

    // edit icon;
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
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
  // update item submit;
  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      //   get list item id
      const listId = e.target.parentNode.parentNode.id;

      // split it at the dash and set into array
      const listIdArray = listId.split("-");

      // get id; its the second item in the array
      const id = parseInt(listIdArray[1]);

      //get item
      const itemToEdit = ItemCtrl.getItemByID(id);

      // set current item;
      ItemCtrl.setCurrentItem(itemToEdit);

      // add it to form
      UICtrl.addItemToForm();
    }
  };

  return {
    init: function () {
      //Fetch items
      const items = ItemCtrl.getItems();
      // hide buttons
      UICtrl.clearEditState();
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

