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

  const [isEditItem, setisEditItem] = useState(false);
  const [editItem, setEditItem] = useState(null);
  function handleEdit(item) {
    setisEditItem((isEditItem) => !isEditItem);
    setEditItem(item);
  }
  function handleChange(val, id, field) {
    const newItemArray = itemArray.map((i) =>
      i.id === id ? { ...i, [field]: field === "price" ? Number(val) : val } : i
    );

    setItemArray(newItemArray);
    setEditItem((prevItem) => ({
      ...prevItem,
      [field]: field === "price" ? Number(val) : val,
    }));
  }
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
    setItemArray([...itemArray, newItem]);
  }
  return (
    <div className="App">
      <Header />
      <ItemForm
        addItem={addItem}
        editItem={editItem}
        isEditItem={isEditItem}
        handleChange={handleChange}
        setIsEditItem={setisEditItem}
      />
      <ItemList
        handleEdit={handleEdit}
        itemArray={itemArray}
        handleDeleteItem={handleDeleteItem}
        isEditItem={isEditItem}
        editItem={editItem}
      />
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

function ItemForm({
  addItem,
  isEditItem,
  editItem,
  handleChange,
  setIsEditItem,
}) {
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
    addItem(newItem);

    setItemEntered("");
    setPrice("");
    setSymbol("$");
  }
  function handleEditForm(e) {
    e.preventDefault();
    //After editing setting the isEditItem value to false so that Submit form will be open
    //and edit form will be closed
    setIsEditItem(false);
  }
  return (
    <div>
      {!isEditItem && (
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
      )}

      {isEditItem && editItem && (
        <form className="edit-form" onSubmit={handleEditForm}>
          <label>Edit Item</label>
          <input
            type="text"
            value={editItem.item}
            onChange={(e) => handleChange(e.target.value, editItem.id, "item")}
            placeholder="Edit Item"
          ></input>
          <label>Edit Price</label>
          <input
            type="text"
            value={editItem.price || ""}
            onChange={(e) =>
              handleChange(Number(e.target.value), editItem.id, "price")
            }
            placeholder="Edit Price"
          ></input>
          <select
            value={editItem.symbol}
            onChange={(e) =>
              handleChange(e.target.value, editItem.id, "symbol")
            }
          >
            <option value="$">$</option>
            <option value="€">€</option>
          </select>
          <button>Done</button>
        </form>
      )}
    </div>
  );
}

function ItemList({
  handleEdit,
  itemArray,
  handleDeleteItem,
  isEditItem,
  editItem,
}) {
  return (
    <div className="item-list">
      {itemArray.map((item) => (
        <Item
          item={item}
          key={item.id}
          isEditItem={isEditItem}
          handleEdit={handleEdit}
          editItem={editItem}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </div>
  );
}

function Item({ handleEdit, item, handleDeleteItem, isEditItem, editItem }) {
  return (
    <div className="item">
      <p>{item.item}</p>
      <p>{item.symbol}</p>
      <p>{item.price}</p>
      <Button onClick={() => handleEdit(item)}>
        {editItem?.id === item.id && isEditItem ? "Close" : " Edit"}
      </Button>
      <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
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
