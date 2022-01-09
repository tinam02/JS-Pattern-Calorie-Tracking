//* Storage  Controller
//* Item Controller
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
    logData: function () {
      return data;
    },
  };
})();

//*UI Controller
const UICtrl = (function () {

    const UISelectors={
        itemList:'#item-list'
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
      document.querySelector(UISelectors.itemList).innerHTML=html
    },
  };
})();

//*App Controller (MAIN)
const App = (function (ItemCtrl, UICtrl) {
  return {
    init: function () {
      //Fetch items
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

// Initialise
App.init();
