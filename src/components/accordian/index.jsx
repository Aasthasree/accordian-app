import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let updated = [...multiple];
    const index = updated.indexOf(getCurrentId);

    if (index === -1) updated.push(getCurrentId);
    else updated.splice(index, 1);

    setMultiple(updated);
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setEnableMultiSelection(!enableMultiSelection);
          // Optional: Reset selections when toggling mode
          setSelected(null);
          setMultiple([]);
        }}
        className={`toggle-button ${enableMultiSelection ? "active" : ""}`}
      >
        {enableMultiSelection
          ? "Disable Multi Selection"
          : "Enable Multi Selection"}
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={() =>
                  enableMultiSelection
                    ? handleMultiSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {(enableMultiSelection
                ? multiple.includes(dataItem.id)
                : selected === dataItem.id) && (
                <div className="content">{dataItem.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
