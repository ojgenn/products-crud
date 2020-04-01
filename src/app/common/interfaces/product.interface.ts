import {EUnits} from '../enums/units.enum';

export interface IProduct {
  id?: string;
  name: string;
  img: string;
  units: EUnits;
}
