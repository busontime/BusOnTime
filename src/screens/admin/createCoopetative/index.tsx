import { FormInput } from '@/components/formInput';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Form, Label, ScrollView, SizableText, Spinner, View, XStack } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { showAlertDialog, showErrorDialog, showSuccessDialog } from '@/utils/dialog';
import { cooperativeService } from '@/services/cooperative';

const initForm = {
  alias: '',
  date_foundation: '',
  name: '',
};

export const CreateCooperative = () => {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formValues, setFormValues] = useState(initForm);
  const navigation = useNavigation();

  const create = async () => {
    if (validateForm()) {
      try {
        const data = {
          alias: formValues.alias,
          date_foundation: formValues.date_foundation,
          name: formValues.name,
        };
        console.log(data);
        await cooperativeService.createCooperative(data);
        showSuccessDialog('Cooperativa creada con exito');
        navigation.navigate('cooperative-list' as never);
      } catch (error) {
        showErrorDialog('ocurrio un error intentelo mas tarde');
        console.log('Error al crear la cooperativa', error);
      }
    }
  };

  const validateForm = () => {
    if (formValues.name === '') {
      showAlertDialog('El nombre esta vacio');
      return false;
    }
    return true;
  };

  const onChange = (value, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const formattedDate = currentDate.toLocaleDateString('es-ES');
      setFormValues({ ...formValues, date_foundation: formattedDate });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          bg={'$backgroundFocus'}
          f={1}
          space='$3'
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Form
            alignItems='center'
            height='100%'
            width='100%'
            gap='$3'
            onSubmit={() => {
              setStatus('submitting');
            }}
            padding='$8'>
            <View>
              <Label>Nombre:</Label>
              <FormInput
                placeholder='Nombre'
                value={formValues.name}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, name: text });
                }}
              />
            </View>

            <View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setShowPicker(!showPicker);
                  }}>
                  <Label margin='$1'>Fecha de creacion:</Label>
                  <FormInput
                    editable={false}
                    placeholder='Seleccione una fecha'
                    value={formValues.date_foundation}
                    onChangeText={(text) => {
                      setFormValues({ ...formValues, date_foundation: text });
                    }}
                  />
                </TouchableOpacity>
              </View>
              {showPicker && (
                <DateTimePicker value={date} mode='date' display='calendar' onChange={onChange} />
              )}
            </View>

            <View>
              <Label>Alias:</Label>
              <FormInput
                placeholder='Nombre'
                value={formValues.alias}
                onChangeText={(text) => {
                  setFormValues({ ...formValues, alias: text });
                }}
              />
            </View>

            <XStack gap='$5'>
              <Button
                size='$3'
                backgroundColor='$green8'
                icon={status === 'submitting' ? () => <Spinner /> : undefined}
                onPress={async () => {
                  await create();
                }}>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  {status === 'submitting' ? 'Creando...' : 'Crear'}
                </SizableText>
              </Button>

              <Button
                backgroundColor={status === 'submitting' ? '$gray10' : '$red9'}
                disabled={status === 'submitting'}
                onPress={() => {
                  navigation.navigate('cooperative-list' as never);
                }}
                size='$3'>
                <SizableText color={'$color'} fontWeight={'bold'}>
                  Cancelar
                </SizableText>
              </Button>
            </XStack>
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
