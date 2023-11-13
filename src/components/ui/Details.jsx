
const RAK = ["RAK-1", "RAK-2", "RAK-3"]
const Details = () => {
    return (
        <div className="space-y-6">
            {
                RAK.map((rak, i) => {
                    return <div key={i}>
                        <h4 className="text-lg">{rak}</h4>
                        <div className="flex items-center justify-start space-x-2">
                            <p>tanaman:</p>
                            <span>jagung</span>
                        </div>
                        <div className="flex items-center justify-start space-x-2">
                            <p>Media tanam:</p>
                            <span>pupuk</span>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Details;