import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Promotion API",
    version: "1.0.0",
    description: "Promotion API",
  },
  host: "localhost:3000",
  basePath: "/api/promotions",
};
const outputFile = "./swagger-output.json";
const routes = ["./routes/promotions.js"];

swaggerAutogen()(outputFile, routes, doc);
