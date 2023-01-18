import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  console.log(items);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.InputA}>
              <td>{d["First Name"]}</td>
              <td>{d["Last Name"]}</td>
              <td>{d["Gender"]}</td>
              <td>{d["Age"]}</td>
              <td>{d["Country"]}</td>
              <td>{d["Date"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
