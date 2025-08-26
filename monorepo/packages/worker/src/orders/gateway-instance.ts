import { getIdoSellApiKey, getIdosellUrl } from "../env";
import { createGatewayInstance } from "./idosell-gateway";

const getGatewayInstance = () => {
  const idosellApiKey = getIdoSellApiKey();
  const idosellUrl = getIdosellUrl();
  const gatewayInstance = createGatewayInstance(idosellApiKey, idosellUrl);
  return gatewayInstance;
};

export { getGatewayInstance };
