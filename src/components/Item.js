import React from "react";
//here we have the props as callback function we have in the other children
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      })
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
  }
  //Here we are creating a patch request
  //to do this we first use the shopping list as this is a child component of that parent.
  //We follow the structure. The $items.id part is because when we are going to that specific item the id will let us know where we are trying to click
  //The stringify isincart is set to the item that is not in the cart

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item))
  }
  //for this we dont need a header since we are not trying to update or getting any information back again nor do we need a body
  //We take the () => onHandle(item) the () is empty since thats what we are accomplishing 
  //again the url is attacking specifcally based on the id number of each element
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
