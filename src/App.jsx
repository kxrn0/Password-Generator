import { useState } from "react";
import Slider from "./components/Slider";
import arrow from "./assets/arrow.svg";
import copy from "./assets/copy.svg";

function App() {
  const [characterLength, set_char_length] = useState(10);
  const [requirements, set_requirements] = useState([
    { title: "Include Uppercase Characters", name: "uppercase", checked: true },
    { title: "Include Lowercase Characters", name: "lowercase", checked: true },
    { title: "Include Numbers", name: "numbers", checked: true },
    { title: "Include Symbols", name: "symbols", checked: false }
  ]);
  const [strength, set_strength] = useState({ label: "medium", name: "medium", index: 3 });
  const [password, set_password] = useState('')

  function update(value) {
    set_char_length(value);
  }

  function handle_change(event) {
    const index = requirements.findIndex(req => req.name === event.target.value);
    const element = requirements[index];

    set_requirements(prevReqs => prevReqs.slice(0, index).
      concat({ ...element, checked: !element.checked }).
      concat(prevReqs.slice(index + 1))
    );
  }

  function generate_password() {
    const strengthValue = requirements.reduce((sum, req) => sum + Number(req.checked), 0);
    // strengthValue -= strengthValue ? 1 : 0;

    console.log(strengthValue);

    switch (strengthValue) {
      case 0:
        set_strength({ label: "too weak!", name: "too-weak", index: 0 });
        break;
      case 1:
        set_strength({ label: "too weak!", name: "too-weak", index: 1 });
        break;
      case 2:
        set_strength({ label: "weak", name: "weak", index: 2 });
        break;
      case 3:
        set_strength({ label: "meduim", name: "medium", index: 3 });
        break;
      case 4:
        set_strength({ label: "strong", name: "strong", index: 4 });
    }
  }

  return (
    <div className="App">
      <header>
        <h2>Password Generator</h2>
      </header>
      <main>
        <div className="password-display">
          <p className="password">1234567890</p>
          <button className="copy">
            <img src={copy} alt="copy icon" />
          </button>
        </div>
        <div className="char-length">
          <p>Character Length</p>
          <p className="char-number">{characterLength}</p>
        </div>
        <Slider from={0} to={20} update_value={update} />
        <div className="requirements">
          <ul>
            {requirements.map(req => (
              <li key={req.name}>
                <input type="checkbox" id={`${req.name}-box`} checked={req.checked} onChange={handle_change} value={req.name} />
                <label htmlFor={`${req.name}-box`}>{req.title}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="strenght">
          <p>STRENGTH</p>
          <div className="rating">
            <p className="rating-message">{strength.message}</p>
            <ul className="color-rating">
              <li className={strength.index && strength.index >= 1 ? "active" : "inactive"}></li>
              <li className={strength.index && strength.index >= 2 ? "active" : "inactive"}></li>
              <li className={strength.index && strength.index >= 3 ? "active" : "inactive"}></li>
              <li className={strength.index && strength.index >= 4 ? "active" : "inactive"}></li>
            </ul>
          </div>
        </div>
        <button className="generate" onClick={generate_password}>
          <p>GENERATE</p>
          <img src={arrow} alt="generate icon" />
        </button>
      </main>
    </div>
  );
}

export default App;