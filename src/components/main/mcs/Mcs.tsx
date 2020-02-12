import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../store/reducers';
import { McsActions } from '../../../store/mcs/mcsActions';
import { UserStatus, RequestStatus, McsViewMode, McsSelectorType } from '../../../utils/enums';
import { Redirect } from 'react-router-dom';
import PreloaderPage from '../../preloader/preloaderPage/preloaderPage';
import Errors from '../../uiComponents/Errors';
import McsSelector from './McsSelector';
import McsSelectorEmpty from './McsSelectorEmpty';
import McsEditForm from './McsEditForm';
import { McsEditActions } from '../../../store/mcsEdit/mcsEditActions';
import { toFormData } from '../../../utils/utils';
import Button from '../../uiComponents/Button';
import { getFormValues } from 'redux-form';
import NoBr from '../../uiComponents/NoBr';

const SMcs = styled.section`

`;

const Mcs: React.FC<TPropsFromRedux> = props => {
  const { getMcs, getMcsStart, mcs, userStatus, editPhotoUrl } = props;
  useEffect(() => {
    getMcs();
    return (() => { getMcsStart() })
  }, [getMcs, getMcsStart])

  switch (userStatus) {
    case UserStatus.Unauthorized:
      return (
        <Redirect to='/login' />
      )
    case UserStatus.Request:
      return (
        <PreloaderPage />
      )
    case UserStatus.AuthorizedUser:
      return (
        <Redirect to='/' />
      )
    case UserStatus.AuthorizedAdmin:
      switch (mcs.getStatus) {
        case RequestStatus.Default:
        case RequestStatus.Request:
          return (
            <PreloaderPage />
          )
        case RequestStatus.Failed:
          return (
            <Errors>ОШИБКА СЕРВЕРА. ПЕРЕЗАГРУЗИТЕ СТРАНИЦУ. ОБРАТИТЕСЬ К АДМИНИСТРАТОРУ.</Errors>
          )
        case RequestStatus.Success:
          switch (mcs.mcsViewMode) {
            case McsViewMode.Main:
              return (
                <SMcs>
                  <h1>Мастер-классы</h1>
                  <McsSelector
                    type={McsSelectorType.Coming}
                    name={'Ближайшие'}
                    active={props.mcs.mcsSelectorActive}
                    setMcsSelector={props.setMcsSelector}
                  />
                  {props.mcs.mcsSelectorActive === McsSelectorType.Coming && <Button onClick={() => props.setMcsViewMode({ mode: McsViewMode.Add, category: 'coming' })}>Добавить</Button>}
                  {props.mcs.mcsSelectorActive === McsSelectorType.Coming && props.mcs.mcs?.map((mc, i) => {
                    if (mc.category === 'coming') {
                      return <McsSelectorEmpty key={i} />
                    }
                  })}
                  <McsSelector
                    type={McsSelectorType.Custom}
                    name={'Индивидуальные'}
                    active={props.mcs.mcsSelectorActive}
                    setMcsSelector={props.setMcsSelector}
                  />
                  {props.mcs.mcsSelectorActive === McsSelectorType.Custom && <Button onClick={() => props.setMcsViewMode({ mode: McsViewMode.Add, category: 'custom' })}>Добавить</Button>}
                  {props.mcs.mcsSelectorActive === McsSelectorType.Custom && props.mcs.mcs?.map((mc, i) => {
                    if (mc.category === 'custom') {
                      return <McsSelectorEmpty key={i} />
                    }
                  })}
                  <McsSelector
                    type={McsSelectorType.Kids}
                    name={'Детские'}
                    active={props.mcs.mcsSelectorActive}
                    setMcsSelector={props.setMcsSelector}
                  />
                  {props.mcs.mcsSelectorActive === McsSelectorType.Kids && <Button onClick={() => props.setMcsViewMode({ mode: McsViewMode.Add, category: 'kids' })}>Добавить</Button>}
                  {props.mcs.mcsSelectorActive === McsSelectorType.Kids && props.mcs.mcs?.map((mc, i) => {
                    if (mc.category === 'kids') {
                      return <McsSelectorEmpty key={i} />
                    }
                  })}
                  <McsSelector
                    type={McsSelectorType.Vip}
                    name={'Vip'}
                    active={props.mcs.mcsSelectorActive}
                    setMcsSelector={props.setMcsSelector}
                  />
                  {props.mcs.mcsSelectorActive === McsSelectorType.Vip && <Button onClick={() => props.setMcsViewMode({ mode: McsViewMode.Add, category: 'vip' })}>Добавить</Button>}
                  {props.mcs.mcsSelectorActive === McsSelectorType.Vip && props.mcs.mcs?.map((mc, i) => {
                    if (mc.category === 'vip') {
                      return <McsSelectorEmpty key={i} />
                    }
                  })}
                </SMcs>
              )
            case McsViewMode.Add:
              return (
                <SMcs>
                  <h1>Добавление <NoBr>мастер-класса</NoBr></h1>
                  <McsEditForm
                    initialValues={props.initialValues}
                    getMcs={props.getMcs}
                    formValues={props.formValues}
                    previewImg={props.previewImg}
                    editPhotoUrl={editPhotoUrl}
                    errors={null}
                    onSubmit={(data: any) => { props.uploadMcs(toFormData(data)) }}
                  />
                </SMcs>
              )
            case McsViewMode.Edit:
              return (
                <SMcs>
                  <h1>Редактирование <NoBr>мастер-класса</NoBr></h1>
                  <McsEditForm
                    initialValues={{ category: 'coming' }}
                    getMcs={props.getMcs}
                    formValues={props.formValues}
                    previewImg={props.previewImg}
                    editPhotoUrl={editPhotoUrl}
                    errors={null}
                    onSubmit={(data: any) => { props.uploadMcs(toFormData(data)) }}
                  />
                </SMcs>
              )
          }
      }
  }
}

const connector = connect((state: IAppState) => ({
  userStatus: state.auth.userStatus,
  mcs: state.mcs,
  editPhotoUrl: state.mcsEdit.editPhotoUrl,
  initialValues: state.mcs.initialValues,
  formValues: getFormValues('mcsedit')(state),
}), {
  getMcs: McsActions.getMcs,
  getMcsStart: McsActions.getMcsStart,
  setMcsSelector: McsActions.setMcsSelector,
  uploadMcs: McsEditActions.uploadMcs,
  previewImg: McsEditActions.previewImg,
  setMcsViewMode: McsActions.setMcsViewMode,
});
type TPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Mcs);
