import { useState } from "react";

function Dashboard() {
  const [drop, setDrop] = useState<number | null>(null);

  return (
    <>
      <div className="w-full bg-gray-100 p-2 rounded-lg">
        <h1 className="text-xl font-bold">Contacts</h1>
        <div className="mx-auto w-max flex space-x-2">
          <button onClick={() => drop == 1 ? setDrop(null) : setDrop(1)} className={`px-2 py-1 m-0 ${drop === 1 ? "rounded-t-lg bg-gray-400":""}`}>
            <span className={`icon-[material-symbols--search] text-xl hover:cursor-pointer ${drop === 1 ? "text-white":""}`} />
          </button>

          <button onClick={() => drop == 2 ? setDrop(null) : setDrop(2)} className={`px-2 py-1 m-0 ${drop === 2 ? "rounded-t-lg bg-gray-400":""}`}>
            <span className={`icon-[material-symbols--add-rounded] text-xl hover:cursor-pointer ${drop === 2 ? "text-white":""}`} />
          </button>

          <button onClick={() => drop == 3 ? setDrop(null) : setDrop(3)} className={`px-2 py-1 ${drop === 3 ? "rounded-t-lg bg-gray-400":""}`}>
            <span className={`icon-[material-symbols--delete-outline-rounded] text-xl hover:cursor-pointer ${drop === 3 ? "text-white":""}`}></span>
          </button>
        </div>
        {drop === 1 && (
          <form action="" className="flex mx-auto w-full space-x-4 bg-gray-400 p-2">
            <label htmlFor="fname">First</label>
            <input type="text" id="fname" name="fname" />
            <label htmlFor="lname">Last</label>
            <input type="text" id="lname" name="lname" />
            <label htmlFor="phone">Phone #</label>
            <input type="text" id="phone" name="phone" />
            <button>Search</button>
          </form>
        )}
        {drop === 2 && (
          <form action="" className="flex mx-auto w-full space-x-4 bg-gray-400 p-2">
            <label htmlFor="fname">First</label>
            <input type="text" id="fname" name="fname" />
            <label htmlFor="lname">Last</label>
            <input type="text" id="lname" name="lname" />
            <label htmlFor="phone">Phone #</label>
            <input type="text" id="phone" name="phone" />
            <button>Add</button>
          </form>
        )}
        {drop === 3 && (
          <form action="" className="flex mx-auto w-full space-x-4 bg-gray-400 p-2">
            <label htmlFor="fname">First</label>
            <input type="text" id="fname" name="fname" />
            <label htmlFor="lname">Last</label>
            <input type="text" id="lname" name="lname" />
            <button>Delete</button>
          </form>
        )}
      </div>
      <div>
        contacts...
      </div>
    </>
  );
}

export default Dashboard;
