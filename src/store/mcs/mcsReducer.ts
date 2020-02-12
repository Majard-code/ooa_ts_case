import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus, McsViewMode, McsSelectorType } from "../../utils/enums";

export interface IMc {
  id: number | null,
  name: string | null,
  description: string | null,
  category: 'coming' | 'custom' | 'kids' | 'vip',
  date: string | null,
  time: string | null,
  price: number | null,
  menu: string[] | null,
}

export interface IMcsState {
  readonly mcs: IMc[] | null,
  readonly mcsViewMode: McsViewMode,
  readonly getStatus: RequestStatus,
  readonly mcsSelectorActive: McsSelectorType | null,
  readonly errors: string[] | null,
  readonly initialValues: IMc,
}

const initState: IMcsState = {
  mcs: null,
  mcsViewMode: McsViewMode.Edit,
  getStatus: RequestStatus.Default,
  mcsSelectorActive: null,
  errors: null,
  initialValues: {
    id: null,
    name: null,
    description: null,
    category: 'coming',
    date: null,
    time: null,
    price: null,
    menu: null,
  }
}

export const mcs: Reducer<IMcsState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'GET_MCS_START':
      return {
        ...state,
        getStatus: RequestStatus.Request,
      }
    case 'GET_MCS_SUCCESS':
      console.log(action.payload)
      return {
        ...state,
        mcs: action.payload.result.mcs,
        mcsViewMode: McsViewMode.Main,
        getStatus: RequestStatus.Success,
        errors: null,
      }
    case 'GET_MCS_FAILED':
      console.log(action.payload)
      return {
        ...state,
        mcsViewMode: McsViewMode.Main,
        getStatus: RequestStatus.Failed,
        errors: action.payload.errors,
      }
    case 'SET_MCS_SELECTOR':
      if(state.mcsSelectorActive === action.payload) {
        return {
          ...state,
          mcsSelectorActive: null,
        }
      } else {
        return {
          ...state,
          mcsSelectorActive: action.payload,
        }
      }
    case 'SET_MCS_VIEW_MODE':
      return {
        ...state,
        mcsViewMode: action.payload.mode,
        initialValues: {
          ...state.initialValues,
          category: action.payload.category,
        }
      }
    default:
      return state;
  }
}