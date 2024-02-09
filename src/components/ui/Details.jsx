import propTypes from "prop-types";

const RAK = [
  { name: "RAK-1", value: "rak1" },
  { name: "RAK-2", value: "rak2" },
  { name: "RAK-3", value: "rak3" },
];

const Details = ({ data }) => {
  const unit = data.set;
  console.log({ data });
  return (
    <div className="space-y-6">
      {RAK.map((rak, i) => {
        return (
          <div key={i}>
            <h4 className="text-lg font-semibold">{rak.name}</h4>
            <div className="flex justify-start" key={i}>
              <p className="min-w-[7rem]">tanaman</p>
              <p>:</p>
              <span className="ml-2">
                {unit ? unit[rak.value]?.tanaman : ""}
              </span>
            </div>
            <div className="flex justify-start">
              <p className="min-w-[7rem]">Media tumbuh</p>
              <p>:</p>
              <span className="ml-2">
                {unit ? unit[rak.value]?.mediaTumbuh : ""}
              </span>
            </div>{" "}
            <div className="flex justify-start">
              <p className="min-w-[7rem]">Berat</p>
              <p>:</p>
              <span className="ml-2">
                {unit ? unit[rak.value]?.weight : ""}
              </span>
            </div>
          </div>
        );
      })}
      <div>
        <div className="flex justify-start items-center">
          <p className="min-w-[7rem] font-semibold">Kecepatan </p>
          <p>:</p>
          <span className="ml-2">{data.RPM} RPM</span>
          <span className="ml-2 text-sm align-middle">(1 jam terakhir)</span>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  data: propTypes.object,
};

export default Details;
