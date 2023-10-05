import React, { useState, useEffect } from 'react';
import { Button, Form, ScrollView } from 'tamagui';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '@/contexts/auth';
import { UserCircle2 } from 'lucide-react-native';
import { COLORS } from '@/constants/styles';
import { useThemeContext } from '@/contexts/theme';
import { FormInput } from '@/components/formInput';
import { userService } from '@/services/user';
import { showAlertDialog } from '@/utils/dialog';
import { validateEmail } from '@/utils/validate';

const initForm = {
  birthdate: '',
  email: '',
  lastname: '',
  name: '',
  phone: '',
};

export const EditProfilePassenger = () => {
  const { profile, updateProfile } = useAuthContext();
  const [updateForm, setUpdateForm] = useState({ ...initForm, ...profile.person });
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { isDark } = useThemeContext();
  const navigation = useNavigation();

  useEffect(() => {
    setUpdateForm({
      ...updateForm,
      ...profile.person,
    });
  }, [profile.person]);

  const update = async () => {
    if (validateForm()) {
      try {
        const data = {
          birthdate: updateForm.birthdate,
          email: updateForm.email,
          lastname: updateForm.lastname,
          name: updateForm.name,
          phone: updateForm.phone,
        };
        await userService.updateUserById(profile.user.uid, data);
        updateProfile(data);
      } catch (error) {
        console.log('error al  actualizar', error);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = currentDate.toLocaleDateString('es-ES');
    setUpdateForm({ ...updateForm, birthdate: formattedDate });
  };

  const validateForm = () => {
    const email = updateForm.email.trim().toLowerCase();
    if (email === '') {
      showAlertDialog('El email esta vacio');
      return false;
    }

    if (!validateEmail(email)) {
      showAlertDialog('el email no es valido');
      return false;
    }

    if (updateForm.name === '') {
      showAlertDialog('El nombre esta vacio');
      return false;
    }

    if (updateForm.lastname === '') {
      showAlertDialog('El apellido esta vacio');
      return false;
    }

    if (updateForm.phone === '') {
      showAlertDialog('El telefono esta vacio');
      return false;
    }

    if (updateForm.birthdate === '') {
      showAlertDialog('La fecha de nacimiento esta vacia');
      return false;
    }

    return true;
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
              console.log('hi');
            }}
            padding='$8'>
            <UserCircle2 color={isDark ? COLORS.light : COLORS.dark} size={50} />
            <FormInput
              placeholder='Nombre'
              value={updateForm.name}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, name: text });
              }}
            />

            <FormInput
              placeholder='Apellido'
              value={updateForm.lastname}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, lastname: text });
              }}
            />

            <FormInput
              placeholder='Email'
              value={updateForm.email}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, email: text });
              }}
            />

            <FormInput
              placeholder='Telefono'
              value={updateForm.phone}
              onChangeText={(text) => {
                setUpdateForm({ ...updateForm, phone: text });
              }}
            />

            <View>
              <View>
                <TouchableOpacity
                  style={[
                    styles.inputTextPicker,
                    { backgroundColor: isDark ? COLORS.dark : COLORS.light },
                  ]}
                  onPress={() => {
                    setShowPicker(!showPicker);
                  }}>
                  <TextInput
                    style={[styles.textPicker, { color: isDark ? COLORS.light : COLORS.dark }]}
                    editable={false}
                    placeholder='Seleccione una fecha'
                    onChangeText={(text) => {
                      setUpdateForm({ ...updateForm, birthdate: text });
                    }}
                    value={updateForm.birthdate}
                  />
                </TouchableOpacity>
              </View>
              {showPicker && (
                <DateTimePicker value={date} mode='date' display='calendar' onChange={onChange} />
              )}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Button
                margin='$1'
                size='$3'
                backgroundColor='$green8'
                color='black'
                onPress={() => {
                  update();
                }}>
                Guardar
              </Button>

              <Button
                margin='$1'
                backgroundColor='$red10'
                onPress={() => {
                  navigation.navigate('profile' as never);
                }}
                size='$3'>
                Regresar
              </Button>
            </View>
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
