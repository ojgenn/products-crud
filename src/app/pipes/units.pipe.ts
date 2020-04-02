import {Pipe, PipeTransform} from '@angular/core';

import {EUnits} from '../common/enums/units.enum';
import {ISelect} from '../common/interfaces/select.interface';
import {getUnits} from '../common/helpers/get-units';

@Pipe({
  name: 'units'
})
export class UnitsPipe implements PipeTransform {

  transform(value: EUnits): string {
    const unit: ISelect<EUnits> = getUnits().find((item: ISelect<EUnits>) => item.key === value);

    return unit.value || '';
  }
}
