import { Reducer } from "redux";
import { TAppActions } from "../actions";
import { RequestStatus } from "../../utils/enums";
import { noImage } from "../../utils/urls";

export interface IMcsEditState {
  readonly editPhotoUrl: string,
  readonly uploadStatus: RequestStatus,
  readonly message: string | null,
  readonly errors: string[] | null,
}

const initState: IMcsEditState = {
  editPhotoUrl: noImage,
  uploadStatus: RequestStatus.Default,
  message: null,
  errors: null,
}

export const mcsEdit: Reducer<IMcsEditState, TAppActions> = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOAD_MCS_START':
      return {
        ...state,
        uploadStatus: RequestStatus.Request,
      }
    case 'UPLOAD_MCS_SUCCESS':
      console.log(action.payload)
      return {
        ...state,
        uploadStatus: RequestStatus.Success,
        errors: null,
      }
    case 'UPLOAD_MCS_FAILED':
      console.log(action.payload)
      return {
        ...state,
        uploadStatus: RequestStatus.Failed,
        errors: action.payload.errors,
      }
    case 'PREVIEW_IMG':
      return {
        ...state,
        editPhotoUrl: action.payload,
      }
    default:
      return state;
  }
}