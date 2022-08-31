import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
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
  const [password, set_password] = useState(() => create_password(requirements[0].checked, requirements[1].checked, requirements[2].checked, requirements[3].checked, characterLength));
  const [errorState, set_error_state] = useState(false);
  const [copied, set_copied] = useState(false);

  function update(value) {
    const reqChars = requirements.reduce((sets, req) => sets + Number(req.checked), 0);
    
    if (!reqChars || !value || value < reqChars)
      set_error_state(true);
    else
      set_error_state(false);

    set_char_length(value);
  }

  function handle_change(event) {
    const index = requirements.findIndex(req => req.name === event.target.value);
    const element = requirements[index];

    set_requirements(prevReqs => {
      const reqsult = prevReqs.slice(0, index).concat({ ...element, checked: !element.checked }).concat(prevReqs.slice(index + 1));
      const reqChars = reqsult.reduce((sets, req) => sets + Number(req.checked), 0);

      if (!reqChars || characterLength < reqChars)
        set_error_state(true);
      else
        set_error_state(false);

      return reqsult;

    });
  }

  function generate_password() {
    if (errorState)
      return;

    let newPassword, strengthValue;

    newPassword = create_password(requirements[0].checked, requirements[1].checked, requirements[2].checked, requirements[3].checked, characterLength);
    strengthValue = zxcvbn(newPassword).score;
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
        set_strength({ label: "medium", name: "medium", index: 3 });
        break;
      case 4:
        set_strength({ label: "strong", name: "strong", index: 4 });
    }
    set_password(newPassword);
  }

  function copy_to_clipboard() {
    set_copied(true);
    navigator.clipboard.writeText(password);

    setTimeout(() => set_copied(false), 1333);
  }

  return (
    <div className="App">
      <header>
        <h2 className="app-name">Password Generator</h2>
      </header>
      <main className="main-section">
        <div className="password-display">
          {!errorState && <p className="password">{password}</p>}
          {errorState && <p className="password default">P4$5W0rD!</p> }
          <div className="copy-section">
            {copied && <p className="copy-text">COPIED</p>}
            <button className="copy" disabled={errorState} onClick={copy_to_clipboard}></button>
          </div>
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
              {!errorState && <p className="rating-message">{strength.label}</p>}
              <ul className={`color-rating ${strength.name}`}>
                <li className={`${strength.index >= 1 ? "active" : "inactive"} ${errorState ? "not-allowed" : ''}`}></li>
                <li className={`${strength.index >= 2 ? "active" : "inactive"} ${errorState ? "not-allowed" : ''}`}></li>
                <li className={`${strength.index >= 3 ? "active" : "inactive"} ${errorState ? "not-allowed" : ''}`}></li>
                <li className={`${strength.index >= 4 ? "active" : "inactive"} ${errorState ? "not-allowed" : ''}`}></li>
              </ul>
            </div>
          </div>
          <button className={`generate ${errorState ? "not-allowed" : ''}`} onClick={generate_password}>
            <p>GENERATE</p>
            <span className="generate-icon"></span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;