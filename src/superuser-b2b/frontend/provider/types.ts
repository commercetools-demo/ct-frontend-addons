import { SuperuserStatus } from '../types';

export interface SuperuserContextShape {
  superuserStatus?: SuperuserStatus;
  setSuperuserCarts: (carts: SuperuserStatus['carts']) => void;
}
