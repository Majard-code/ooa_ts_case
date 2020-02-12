import { createAction, ActionsUnion } from "../action-helper";
import { IError } from "../../utils/types";

export const UPLOAD_MCS = 'UPLOAD_MCS';
export const UPLOAD_MCS_START = 'UPLOAD_MCS_START';
export const UPLOAD_MCS_SUCCESS = 'UPLOAD_MCS_SUCCESS';
export const UPLOAD_MCS_FAILED = 'UPLOAD_MCS_FAILED';

export const PREVIEW_IMG = 'PREVIEW_IMG';

export interface IMcsResponse {
  result: any
}

export const McsEditActions = {
  uploadMcs: (payload: FormData) => createAction(UPLOAD_MCS, payload),
  uploadMcsStart: () => createAction(UPLOAD_MCS_START),
  uploadMcsSuccess: (payload: IMcsResponse) => createAction(UPLOAD_MCS_SUCCESS, payload),
  uploadMcsFailed: (payload: IError) => createAction(UPLOAD_MCS_FAILED, payload),

  previewImg: (payload: any) => createAction(PREVIEW_IMG, payload),
}

export type TMcsEditActions = ActionsUnion<typeof McsEditActions>;
