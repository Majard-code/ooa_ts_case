export enum RequestStatus {
  Default,
  Request,
  Success,
  Failed,
}

export enum UserStatus {
  Unauthorized,
  Request,
  AuthorizedUser,
  AuthorizedAdmin,
}

export enum AccountEdit {
  Name,
  Password,
}

export enum ContactsEdit {
  Phone,
  Address,
  Coordinates,
}

export enum ConfirmForms {
  Off,
  AdminToUser,
  UserToAdmin,
  DeleteUser,
  Success,
}

export enum McsViewMode {
  Main,
  Add,
  Edit,
}

export enum McsSelectorType {
  Coming,
  Custom,
  Kids,
  Vip,
}