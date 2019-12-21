import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input";
import axios from "axios";
const subjects = ["Please Select", "Food 101", "Vegetable 101", "Cooking 101"];
const targetDate = moment("12/21/2019 17:00:00");
function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [sub, setSub] = React.useState("Please Select");
  const [timer, setTimer] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [ isLoading , setIsLoading] = React.useState(false);
  const submit = () => {
    setIsLoading(true)
    axios.get("http://www.mocky.io/v2/5dfded443100000d1fc96e78")
    .then(response => {
      const {data} = response
      setMessage(data.response)
      setIsLoading(false)
    } )
    };
  const updateTimer = () => {
    const diffH = targetDate.diff(moment(), "hours");
    const diffM = targetDate.diff(moment(), "minutes") % 60;
    const diffS = targetDate.diff(moment(), "seconds") % 60;
    setTimer(`${diffH} hours ${diffM} minutes ${diffS} seconds`);
  };
  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios.get("http://www.mocky.io/v2/5dfde973310000ed1ac96e6d")
    .then(response => {
      setSub(response.data.subject)
    })
    return () => clearInterval(interval);
  }, []);
  console.log("State: ", { name, email, check, sub });
  return (
    <div className="App">
      <div className="title"> Welcome to Registration page</div>
      <p>Forms ends in </p>
      <p> {timer} </p>
      <Input
        label="Name"
        value={name}
        icon="address-book"
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={email}
        icon="envelope"
        onChangeFromComponent={value => setEmail(value)}
      />

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select value={sub} onChange={event => setSub(event.target.value)}>
              {subjects.map(subject => (
                <option key={subject}> {subject} </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={check}
              onChange={event => setCheck(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-link ${isLoading && "is-loading" }`} 
          onClick={submit}
          disabled ={isLoading}
          >
            submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
