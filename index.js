let customers = [];
const capacity = 25;
let seatsLeft = 25;

const guestCount = React.createRef();
const primaryGuestName = React.createRef();
const phoneNumber = React.createRef();

function handleSubmit(e) {
  e.preventDefault();

  let newValue = primaryGuestName.current.value.trim();

//   if(customers.name.toLowerCase() === newValue.toLowerCase()){
//     alert("Guest name already exists");
//     return;
//   }

const isDuplicate = customers.some((item) => item.name.toLowerCase().trim() === newValue.toLowerCase());

console.log(isDuplicate);
if (isDuplicate) {
  alert("Guest name already exists");
  return;
}

  if(guestCount.current.value > seatsLeft){
    alert("Guest count exceeds capacity");
    return;
  }
  if(!guestCount.current.value || !primaryGuestName.current.value || !phoneNumber.current.value){
    alert("Please fill all the fields");
    return;
  }

  if(seatsLeft - guestCount.current.value < 0){
    alert("No more seats available");
    return;
  }

  customers.push({
    count: guestCount.current.value,
    name: primaryGuestName.current.value,
    phone: phoneNumber.current.value,
    checkIn: new Date().toLocaleString(),
  });

  seatsLeft -= Number(guestCount.current.value);

  
  guestCount.current.value = "";
  primaryGuestName.current.value = "";
  phoneNumber.current.value = "";

  rootElement.render(<App />);
}

const App = () => (
  <div className="App" style={{ textAlign: "center" }}>
    <div>
      <h2>Total Capacity:{capacity} </h2>
      <h2>Seats Left: {seatsLeft}</h2>
    </div>

    {/* Create a form here for the input count, name and phone number with a submit button*/}

    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Guests Count" ref={guestCount} />
      <input
        type="text"
        placeholder="Primary Guest Name"
        ref={primaryGuestName}
      />
      <input type="number" placeholder="Phone Number" ref={phoneNumber} />
      <button>Add Entry</button>
    </form>

    <table border="1px" style={{ margin: "auto" }}>
      <thead>
        <tr>
          <th>Count</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Check In</th>
          <th>Remove Entry</th>
        </tr>
      </thead>
      <tbody>
        {/* Complete table to show records of customers */}

        {customers.map((item, index) => (
          <tr key="index">
            <td>{item.count}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.checkIn}</td>
            <td>
             <button onClick={
                ()=>{
                    seatsLeft += Number(item.count);

                    customers.splice(index,1);

                    rootElement.render(<App />);

                }



             }>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<App />);
