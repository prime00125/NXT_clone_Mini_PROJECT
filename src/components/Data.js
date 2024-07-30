import "./Data.css";
import { useState } from "react";

function Data() {
  const [subtotal, setSubtotal] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [roundOff, setRoundOff] = useState("");
  const [total, setTotal] = useState("");
  const [rows, setRows] = useState([
    {
      siNo: 1,
      item: "",
      qty: "",
      price: "",
      hsnCode: "",
      amount: "",
      purity: "",
      weight: "",
    },
  ]);

  const addNewRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        siNo: prevRows.length + 1,
        item: "",
        qty: "",
        hsnCode: "",
        price: "",
        amount: "",
        purity: "",
        weight: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Parse the input values or default to 0
    const weight = parseFloat(updatedRows[index].weight) || 0;
    const price = parseFloat(updatedRows[index].price) || 0;
    const qty = parseFloat(updatedRows[index].qty) || 0;

    // Calculate the amount
    const amount = (weight * price * qty).toFixed(2);

    // Update the amount field for the specific row
    updatedRows[index].amount = amount;

    // Update the state with the modified rows
    setRows(updatedRows);

    // Calculate the total amount
    const totalAmount = updatedRows.reduce((acc, row) => {
      return acc + parseFloat(row.amount);
    }, 0);

    // Set the total amount
    setSubtotal(totalAmount.toFixed(2));
  };

  const calculateTotal = () => {
    const subtotalValue = parseFloat(subtotal);
    const cgstRate = 1.5; // CGST rate (1.5%)
    const sgstRate = 1.5; // SGST rate (1.5%)

    const cgstAmount = (subtotalValue * cgstRate) / 100;
    const sgstAmount = (subtotalValue * sgstRate) / 100;

    const totalValue = subtotalValue + cgstAmount + sgstAmount;

    setCgst(cgstAmount.toFixed(2));
    setSgst(sgstAmount.toFixed(2));
    setTotal(totalValue.toFixed(2));
  };
  return (
    <div className="main">
      <div className="header">
        <div className="left">
          <label> Customer Name </label>
          <input type="text" name="name" placeholder="Enter Name" /> <br />
          <label>Customer </label>
          <input type="text" placeholder="Customer" />
        </div>
        <div className="right">
          <label>Date</label>
          <input type="date" id="date" />
        </div>
      </div>

      <table className="category">
        <thead>
          <tr>
            <th>Si NO </th>
            <th style={{ paddingLeft: "200px", paddingRight: "176px" }}>
              Item
            </th>
            <th style={{ paddingLeft: "20px", paddingRight: "80px" }}>
              hsn code
            </th>
            <th style={{ paddingLeft: "20px", paddingRight: "40px" }}>
              purity
            </th>
            <th style={{ paddingLeft: "10px", paddingRight: "45px" }}>
              weight
            </th>
            <th style={{ paddingLeft: "20px", paddingRight: "40px" }}>qty</th>
            <th style={{ paddingLeft: "20px", paddingRight: "150px" }}>
              price
            </th>
            <th style={{ paddingLeft: "20px", paddingRight: "120px" }}>
              amount
            </th>
          </tr>
          <br />
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="si">{row.siNo}</td>
              <td>
                <input
                  type="text"
                  className="item"
                  value={row.item}
                  onChange={(e) =>
                    handleInputChange(index, "item", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="code"
                  type="text"
                  value={row.hsnCode}
                  onChange={(e) =>
                    handleInputChange(index, "hsnCode", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="purity"
                  type="text"
                  value={row.purity}
                  onChange={(e) =>
                    handleInputChange(index, "purity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="weight"
                  type="text"
                  value={row.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  className="qty"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", e.target.value)
                  }
                >
                  <option value="">QTY</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className="price"
                  type="text"
                  value={row.price}
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="amount"
                  type="text"
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="addition" onClick={addNewRow}>
        +
      </button>
      <button className="caluclate" onClick={calculateTotal}>
        SUBMIT
      </button>

      <div className="checkout">
        <input
          type="text"
          placeholder="Subtotal"
          value={subtotal}
          onChange={(e) => setSubtotal(e.target.value)}
        />
        <br />
        CGST 1.5% <input type="text" value={cgst} readOnly />
        <br />
        SGST 1.5% <input type="text" value={sgst} readOnly />
        <br />
        Round off{" "}
        <input
          type="text"
          value={roundOff}
          onChange={(e) => setRoundOff(e.target.value)}
        />
        <br />
        Total <input type="text" value={total} readOnly />
        <br />
      </div>
    </div>
  );
}
export default Data;
