

function Dashboard(){
    function basic(){
        console.log(3);
    }

    return(
        <>
            <div className="w-full bg-yellow-400 p-2">
                <h1 className="text-xl font-bold">Contacts</h1>
                <div className="mx-auto w-max flex space-x-4">
                    <button onClick={basic}>
                        <span className="icon-[material-symbols--search] text-xl hover:cursor-pointer" />
                    </button>
                    
                    <button onClick={basic}>
                        <span className="icon-[material-symbols--add-rounded] text-xl hover:cursor-pointer" />
                    </button>
                    
                    <button onClick={basic}>
                        <span className="icon-[material-symbols--delete-rounded] text-xl hover:cursor-pointer"></span>
                    </button>
                    
                </div>
                
            </div>
        </>
    )
}

export default Dashboard;