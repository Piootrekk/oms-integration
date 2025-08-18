import { getIdoSellApiKey, getIdosellUrl } from "./env";
import { transformOrderResults } from "./orders/orders-transform";
import {
  createGatewayInstance,
  getSearchOrders,
} from "./orders/idosell-gateway";

const mainExec = async () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);
  const arrayOf1000 = Array.from(Array(1000).fill(0), (_, index) => index);
  const searchedOrders = await getSearchOrders(gatewayInstance, arrayOf1000);
  const selectedResults = searchedOrders.Results.map((order) => {
    return transformOrderResults(order);
  });
  console.log(
    JSON.stringify({
      limit: searchedOrders.resultsLimit,
      all: searchedOrders.resultsNumberAll,
      resultsPage: searchedOrders.resultsPage,
      numberPage: searchedOrders.resultsNumberPage,
      errors: searchedOrders.Results.map((res) =>
        res.errors.find((err) => err.faultCode)
      ),
    })
  );
};

mainExec().catch((err: Error) => {
  console.error(err);
  process.exit(1);
});
