import "./App.css";
import { useState } from "react";
const initialItems = [
  {
    item: "Blanket",
    id: 1,
    price: 10,
    symbol: "$",
  },
  {
    item: "Pen",
    id: 2,
    price: 1,
    symbol: "€",
  },
  {
    item: "Phone",
    id: 3,
    price: 1000,
    symbol: "$",
  },
];
function App() {
  const [itemArray, setItemArray] = useState(initialItems);
  const totalExpenseDollar = itemArray
    .filter((i) => i.symbol === "$")
    .reduce((a, item) => a + item.price, 0);
  const totalExpenseEuro = itemArray
    .filter((i) => i.symbol === "€")
    .reduce((a, item) => a + item.price, 0);

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
      <Footer
        totalExpenseDollar={totalExpenseDollar}
        totalExpenseEuro={totalExpenseEuro}
        itemArray={itemArray}
      />
    </div>
  );
}

function Header() {
  return <div className="head"> Expense Calculator</div>;
}

function ItemForm({ addItem, findTotal }) {
  const [itemEntered, setItemEntered] = useState("");
  const [symbol, setSymbol] = useState("$");
  const [price, setPrice] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      symbol,
      item: itemEntered,
      price,
    };
    if (!itemEntered || !price) return alert("Fill the Form");
    // console.log(newItem);
    addItem(newItem);

    setItemEntered("");
    setPrice("");
    setSymbol("$");
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
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
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
    <div className="item-list">
      {" "}
      {itemArray.map((item) => (
        <Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} />
      ))}
    </div>
  );
}

function Item({ item, handleDeleteItem }) {
  //const [isEditItem, setisEditItem] = useState(false);
  return (
    <div className="item">
      <p>{item.item}</p>
      <p>{item.symbol}</p>
      <p>{item.price}</p>
      <button>Edit</button>
      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>{" "}
    </div>
  );
}
function Footer({ totalExpenseEuro, totalExpenseDollar, itemArray }) {
  return (
    <div className="footer">
      {itemArray.length > 0 ? (
        <p>
          Your total expense is ${totalExpenseDollar} and €{totalExpenseEuro}{" "}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
