const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", function (data) {
    if (isHabitablePlanet(data)) {
      results.push(data);
    }
  })
  .on("end", function () {
    console.log(results);
    console.log("done");
    console.log(results.length);
    console.log("");
    console.log(results.map((planet) => planet["kepler_name"]));
  })
  .on("error", function (err) {
    console.log("error: ");
    console.log(err);
  });
