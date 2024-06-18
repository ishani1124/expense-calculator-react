import "./App.css";
import { useState } from "react";
const initialItems = [
  {
    item: "Blanket",
    id: 1,
    price: 10,
    denomination: "$",
  },
  {
    item: "Pen",
    id: 2,
    price: 1,
    denomination: "€",
  },
  {
    item: "Phone",
    id: 3,
    price: 2000,
    denomination: "$",
  },
];
function App() {
  const [itemArray, setItemArray] = useState(initialItems);

  function handleDeleteItem(id) {
    setItemArray(itemArray.filter((item) => item.id !== id));
  }
  function addItem(newItem) {
    return setItemArray(() => [...itemArray, newItem]);
  }
  return (
    <div className="App">
      <Header />
      <ItemForm addItem={addItem} />
      <ItemList itemArray={itemArray} handleDeleteItem={handleDeleteItem} />
      <Footer />
    </div>
  );
}

function Header() {
  return <div className="head"> Expense Calculator</div>;
}

function ItemForm({ addItem }) {
  const [itemEntered, setItemEntered] = useState("");
  const [denomination, setDenomination] = useState("$");
  const [price, setPrice] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      denomination,
      item: itemEntered,
      price,
    };
    if (!itemEntered || !price) return alert("Fill the Form");
    // console.log(newItem);
    addItem(newItem);
    setItemEntered("");
    setPrice("");
    setDenomination("$");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Item</label>
        <input
          type="text"
          value={itemEntered}
          onChange={(e) => setItemEntered(e.target.value)}
          placeholder="Enter Item"
        ></input>
        <label>Enter Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter Price"
        ></input>
        <select
          value={denomination}
          onChange={(e) => setDenomination(e.target.value)}
        >
          <option value="$">$</option>
          <option value="€">€</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

function ItemList({ itemArray, handleDeleteItem }) {
  return (
    <div>
      {" "}
      {itemArray.map((item) => (
        <Item item={item} handleDeleteItem={handleDeleteItem} />
      ))}
    </div>
  );
}

function Item({ item, handleDeleteItem }) {
  return (
    <div className="item">
      <p>{item.item}</p>
      <p>{item.denomination}</p>
      <p>{item.price}</p>
      <button>Edit</button>
      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </div>
  );
}
function Footer() {
  return <div>Your total expense is X</div>;
}

export default App;
