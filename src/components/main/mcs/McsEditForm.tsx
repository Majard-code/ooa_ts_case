import React, { useEffect } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, requiredPhoto, photoIsPhoto } from '../../../utils/validators';
import styled from 'styled-components';
import Input from '../../uiComponents/Input';
import Button from '../../uiComponents/Button';
import FileInput from '../../uiComponents/FileInput';
import TextArea from '../../uiComponents/TextArea';
import { ActionWithPayload, Action } from '../../../store/action-helper';
import DateTimeInput from '../../uiComponents/DateTimeInput';
import { noImage } from '../../../utils/urls';
import StringButton from '../../uiComponents/StringButton';

const SMcsEditForm = styled.form`
display: grid;
gap: 20px;
grid-template-columns: max-content 1fr;
grid-template-areas: "pp fp";
width: 100%;
height: max-content;
padding: 20px;
border: 1px solid lightgrey;
@media (max-width: 767px) {
  grid-template-columns: 1fr;
  grid-template-areas: "pp" "fp";
}
`;

const SPhotoPlace = styled.div`
grid-area: pp;
display: grid;
gap: 20px;
grid-template-rows: max-content max-content max-content 1fr;
justify-items: center;
width: 100%;
height: 100%;
img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
`;

const SFieldsPlace = styled.div`
grid-area: fp;
display: grid;
gap: 10px;
`;

const SLabels = styled.p`
display: block;
font-weight: 900;
`;

const SRadioGroup = styled.div`
text-align: center;
input {
  display: none;
}
div input + label {
  display: block;
  width: 250px;
  line-height: 40px;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  background-color: white;
}
div:first-child input + label{
  border-radius: 20px 20px 0 0; 
  border-top: 1px solid lightgray;
}
div:last-child input + label{
  border-radius: 0 0 20px 20px; 
}
input:checked + label {
  font-weight: 900;
  background-color: lightgray;
}
`;

const SButton = styled(Button)`
justify-self: center;
`;
const SStringButton = styled(StringButton)`
justify-self: center;
margin-top: 20px;
margin-bottom: 10px;
`;

interface IProps {
  errors: string[] | null,
  editPhotoUrl: string,
  previewImg: (payload: any) => ActionWithPayload<"PREVIEW_IMG", any>,
  formValues: any,
  getMcs: () => Action<"GET_MCS">,
}

const McsEditForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = (props) => {
  const { formValues, previewImg } = props;
  let photo: File | undefined = undefined;

  console.log(formValues?.category)

  if (formValues) {
    if (formValues.photo) {
      photo = formValues.photo;
    }
  }

  useEffect(() => {
    if (photo) {
      let fileReader = new FileReader();
      fileReader.onloadend = function () {
        if (photo?.type.match('image.*')) {
          previewImg(fileReader.result);
        } else {
          previewImg(noImage);
        }
      }
      fileReader.readAsDataURL(photo);
    } else {
      previewImg(noImage);
    }
  }, [photo, previewImg]);



  return (
    <SMcsEditForm onSubmit={props.handleSubmit}>
      <SPhotoPlace>
        <img src={props.editPhotoUrl} alt="Mcs" />
        <Field name='photo' component={FileInput} validate={[requiredPhoto, photoIsPhoto]} />
        <SLabels>Категория:</SLabels>
        <SRadioGroup>
          <div>
            <Field name='category' component='input' type='radio' value='coming' id='coming' />
            <label htmlFor='coming' >Ближайшие</label>
          </div>
          <div>
            <Field name='category' component='input' type='radio' value='custom' id='custom' />
            <label htmlFor='custom' >Индивидуальные</label>
          </div>
          <div>
            <Field name='category' component='input' type='radio' value='kids' id='kids' />
            <label htmlFor='kids' >Детские</label>
          </div>
          <div>
            <Field name='category' component='input' type='radio' value='vip' id='vip' />
            <label htmlFor='vip' >Премиум</label>
          </div>

        </SRadioGroup>
      </SPhotoPlace>
      <SFieldsPlace>
        <SLabels>Название:</SLabels>
        <Field name='name' component={TextArea} type='text' validate={[required]} />
        <SLabels>Описание:</SLabels>
        <Field name='description' component={TextArea} type='text' validate={[required]} />
        {formValues && formValues.category === 'coming' && 
          <>
            <SLabels>Дата:</SLabels>
            <Field name='date' component={DateTimeInput} type='date' validate={[required]} />
            <SLabels>Время:</SLabels>
            <Field name='time' component={DateTimeInput} type='time' validate={[required]} />
          </>
        }
        <SLabels>Стоимость:</SLabels>
        <Field name='price' component={Input} type='text' validate={[required]} />
        <SButton>Добавить</SButton>
      <SStringButton onClick={() => props.getMcs()}>Отменить</SStringButton>
      </SFieldsPlace>
    </SMcsEditForm >
  );
}

export default reduxForm<{}, IProps>({ form: 'mcsedit' })(McsEditForm);