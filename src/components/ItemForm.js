import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  //we have two states we are trying the update as we work through the page. Both are the input values of name and the produce, which we select based on what we put it as the three
  //then we add a function for submitting and must add the preventDefault so the page does not refresh
  //We create the variable itemData and have its content be an object which will look like the other elements and have the info that we want to display but not the id since the program will create that one by itself
  // We then create a fetch request for a POST so it will be persistant
  function handleSubmit(e) {
    e.preventDefault()
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    }
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem))
    //remember for this process is that we are seeing what we are adding in this case we do on(whatever we are adding of that item in this case we write additem so we get onAddItem). the new item is what we are adding or posting to the page and will be passed as a prop to the shoppinglist form 

    // console.log(itemData)
    // console.log("name", name)
    // console.log("category", category)
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
