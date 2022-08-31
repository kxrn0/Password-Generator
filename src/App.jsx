import { useState } from "react";
import Slider from "./components/Slider";
import create_password from "./password";

function App() {
  const [characterLength, set_char_length] = useState(10);
  const [requirements, set_requirements] = useState([
    { title: "Include Uppercase Letters", name: "uppercase", checked: true },
    { title: "Include Lowercase Letters", name: "lowercase", checked: true },
    { title: "Include Numbers", name: "numbers", checked: true },
    { title: "Include Symbols", name: "symbols", checked: false }
  ]);
  const [strength, set_strength] = useState({ label: "medium", name: "medium", index: 3 });
  const [password, set_password] = useState(create_password(requirements[0].checked, requirements[1].checked, requirements[2].checked, requirements[3].checked, characterLength));

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

    switch (strengthValue) {
      case 0:
        set_strength({ label: "", name: "too-weak", index: 0 });
        break;
      case 1:
        set_strength({ label: "too weak!", name: "too-weak", index: 1 });
        break;
      case 2:
        set_strength({ label: "weak", name: "weak", index: 2 });
        break;
      case 3:
        set_strength({ label: "medium", name: "medium", index: 3 });
        break;
      case 4:
        set_strength({ label: "strong", name: "strong", index: 4 });
    }

    set_password(create_password(requirements[0].checked, requirements[1].checked, requirements[2].checked, requirements[3].checked, characterLength));
  }

  return (
    <div className="App">
      <header>
        <h2 className="app-name">Password Generator</h2>
      </header>
      <main className="main-section">
        <div className="password-display">
          <p className="password">{password}</p>
          <button className="copy">
          </button>
        </div>
        <div className="container">
          <div className="char-length">
            <p className="char-label">Character Length</p>
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
          <div className="strength">
            <p className="strength-label">STRENGTH</p>
            <div className="rating">
              <p className="rating-message">{strength.label}</p>
              <ul className={`color-rating ${strength.name}`}>
                <li className={strength.index && strength.index >= 1 ? "active" : "inactive"}></li>
                <li className={strength.index && strength.index >= 2 ? "active" : "inactive"}></li>
                <li className={strength.index && strength.index >= 3 ? "active" : "inactive"}></li>
                <li className={strength.index && strength.index >= 4 ? "active" : "inactive"}></li>
              </ul>
            </div>
          </div>
          <button className="generate" onClick={generate_password}>
            <p>GENERATE</p>
            <span className="generate-icon"></span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;