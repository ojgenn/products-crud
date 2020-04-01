import {EUnits} from '../enums/units.enum';
import {ISelect} from '../interfaces/select.interface';

export function getUnits(): ISelect<EUnits>[] {
  return [
    {
      key: EUnits.LITER,
      value: 'liter'
    },
    {
      key: EUnits.KG,
      value: 'kg'
    },
    {
      key: EUnits.GRAM,
      value: 'gram'
    },
    {
      key: EUnits.PCS,
      value: 'pcs'
    }
  ];
}
