import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";



function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  //first we have the [items, setItems] = useState([]) for the fetch request. the items is the state we are changing and the setItems is what we are using to change that state. the empty array in the useState is to make sure we are not stuck in a loop and for the items to be rendered into.

  //This is set up to update the state in order to replace our current state which is an empty array with the one from our json server. 
  //When they are asking to display a list of items from the server when the application first loads this is the formula we follow 
  useEffect(() => {
    fetch(" http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
  }, [])

  //We use the fetch first and get use the url. Then the .then.
  //We take what we want from the box which are the items, in this case what is changing and we take what is changing that state
  //By taking those two aspects we get .then((items) => setItems(items))

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }
  //This function is a callback function that is working together with the itemForm js. This is going to make sure things stay persistant and the data is going from child to parent. The set([...items, newItem]) is going to be the process of taking the state of items, creating a copy and then adding the new item to the array 

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }
  //In this process we are adding a handle update item to change the state of the items that are displayed on the page. We are working on this to either add or take something off the cart. We are iterating through the array of the elements. This in order if the item we selected has the same id as the one we are updating to then we return updated item but if not then we get back our original item 
  //The setitems(updateditems) is set to invoke throught the updateditems list
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  //Here on the itemForm we add the onHandle and in this case its the additem prop which is equal to the callback function we set and handleAddItem
  //By doing this we have this callback function so when we render the data it is being sent frm the itemForm

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
  }
  //this is the callback function for the delete attribute. We use filter to remove items and then we delete based on id. as we filter through, if the id of the one we clicked does not equal the other ones than it will be left alone so only the one with that id is going to be deleted
  //the prop deleted item is what we are working with or the property we are working with 
  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
