import { createAction, ActionsUnion } from "../action-helper";
import { IMc } from "./mcsReducer";
import { McsSelectorType, McsViewMode } from "../../utils/enums";
import { IError } from "../../utils/types";

export const GET_MCS = 'GET_MCS';
export const GET_MCS_START = 'GET_MCS_START';
export const GET_MCS_SUCCESS = 'GET_MCS_SUCCESS';
export const GET_MCS_FAILED = 'GET_MCS_FAILED';

export const SET_MCS_SELECTOR = 'SET_MCS_SELECTOR';
export const SET_MCS_VIEW_MODE = 'SET_MCS_VIEW_MODE';

export interface IMcsResponse {
  result: {
    mcs: IMc[] | null,
  }
}

export const McsActions = {
  getMcs: () => createAction(GET_MCS),
  getMcsStart: () => createAction(GET_MCS_START),
  getMcsSuccess: (payload: IMcsResponse) => createAction(GET_MCS_SUCCESS, payload),
  getMcsFailed: (payload: IError) => createAction(GET_MCS_FAILED, payload),

  setMcsSelector: (payload: McsSelectorType) => createAction(SET_MCS_SELECTOR, payload),
  setMcsViewMode: (payload:{ mode: McsViewMode, category: 'coming' | 'custom' | 'kids' | 'vip' }) => createAction(SET_MCS_VIEW_MODE, payload),
}

export type TMcsActions = ActionsUnion<typeof McsActions>;
