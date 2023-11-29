import propTypes from "prop-types";

const RAK = [
  { name: "RAK-1", value: "rak1" },
  { name: "RAK-2", value: "rak2" },
  { name: "RAK-3", value: "rak3" },
];

const Details = ({ data }) => {
  //   console.log("detail component", { data });
  const unit = data.set;
  return (
    <div className="space-y-6">
      {RAK.map((rak, i) => {
        return (
          <div key={i}>
            <h4 className="text-lg font-semibold">{rak.name}</h4>
            {/* {data.map((set, i) => {
                            return <> */}
            <div className="flex items-center justify-start space-x-2" key={i}>
              <p className="w-28">tanaman</p>
              <p>:</p>
              <span>{unit ? unit[rak.value]?.tanaman : ""}</span>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <p className="w-28">Media tumbuh</p>
              <p>:</p>
              <span>{unit ? unit[rak.value]?.mediaTumbuh : ""}</span>
            </div>
            {/* </> */}

            {/* })} */}
          </div>
        );
      })}
    </div>
  );
};

Details.propTypes = {
  data: propTypes.object,
};

export default Details;
