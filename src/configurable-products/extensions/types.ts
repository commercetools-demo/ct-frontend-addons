import { LineItem } from "../../shared/types";

export interface AddToCartBody {
    lineItems: LineItem[];
    configurableComponents?: LineItem[];
  }