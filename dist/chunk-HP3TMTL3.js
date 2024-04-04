// src/superuser/frontend/hooks/standalone-price.ts
import { useCallback } from "react";
import { mutate } from "swr";
var useStandalonePrice = ({
  sdk,
  mutatePath = "/action/cart/getCart"
}) => {
  const changePrice = useCallback(async (lineItemId, price) => {
    const payload = {
      lineItemId,
      price
    };
    const res = await sdk.callAction({ actionName: `cart/changePrice`, payload });
    mutate(mutatePath, res);
  }, []);
  return { changePrice };
};

export {
  useStandalonePrice
};
