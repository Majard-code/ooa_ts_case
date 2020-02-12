import { TRegisterActions } from "./register/registerActions";
import { TMobMenuActions } from "./mobMenu/mobMenuActions";
import { TAuthActions } from "./auth/authActions";
import { TConfirmMailActions } from "./confirmMail/confirmMailActions";
import { TAccountActions } from "./account/accountActions";
import { TUsersActions } from "./users/usersActions";
import { TForgetActions } from "./forget/forgetActions";
import { TContactsActions } from "./contacts/contactsActions";
import { TContactsEditActions } from "./contactsEdit/contactsEditActions";
import { TMcsActions } from "./mcs/mcsActions";
import { TMcsEditActions } from "./mcsEdit/mcsEditActions";

export type TAppActions = 
TRegisterActions |
TMobMenuActions |
TAuthActions |
TConfirmMailActions |
TAccountActions |
TUsersActions |
TForgetActions |
TContactsActions |
TContactsEditActions |
TMcsActions |
TMcsEditActions;