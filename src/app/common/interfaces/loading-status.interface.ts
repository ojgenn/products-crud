import {ELoadingStatus} from '../enums/loading-status.enum';
import {ELoadingActions} from '../enums/loading-actions.enum';

export interface ILoadingStatus {
  status: ELoadingStatus;
  action: ELoadingActions;
}
