import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Spinner } from 'tamagui';
import { editProfile } from '@/mock/EditProfile';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '@/routes/styles';

export const PassengerRegister = () => {
  const [updateForm, setUpdateForm] = useState(editProfile);
  const [status, setStatus] = useState<'off' | 'submiting' | 'submitted'>('off');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (status === 'submiting') {
      const timer = setTimeout(() => {
        setStatus('off');
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = () => {
    setIsSaving(true);
    setStatus('submiting');

    setTimeout(() => {
      setIsSaving(false);
      setStatus('submitted');
    }, 2000);
  };

  return (
    <Form
      alignItems='center'
      backgroundColor='$backgroundFocus'
      height='100%'
      width='100%'
      gap='$3'
      onSubmit={function (): void {
        setStatus('submiting');
      }}
      padding='$8'>
      <Image backgroundColor='white' source={0} width={100} height={100} borderRadius={50} />

      <Input
        width='90%'
        backgroundColor='$background'
        borderColor='$background'
        color='white'
        padding='$3'
        margin='$2'
        size='$5'
        placeholder='Nombre'
        value={updateForm.name}
        onChangeText={(text) => {
          if (!isSaving && isEditing) {
            setUpdateForm({ ...updateForm, name: text });
          }
        }}
        disabled={!isEditing || isSaving}
      />

      <Input
        width='90%'
        backgroundColor='$background'
        borderColor='$background'
        color='white'
        margin='$2'
        padding='$3'
        size='$5'
        placeholder='Apellido'
        value={updateForm.lastname}
        onChangeText={(text) => {
          if (!isSaving && isEditing) {
            setUpdateForm({ ...updateForm, lastname: text });
          }
        }}
        disabled={!isEditing || isSaving}
      />

      <Input
        width='90%'
        backgroundColor='$background'
        borderColor='$background'
        color='white'
        margin='$2'
        padding='$3'
        size='$5'
        placeholder='Email'
        value={updateForm.email}
        onChangeText={(text) => {
          if (!isSaving && isEditing) {
            setUpdateForm({ ...updateForm, email: text });
          }
        }}
        disabled={!isEditing || isSaving}
      />

      <Input
        width='90%'
        backgroundColor='$background'
        borderColor='$background'
        color='white'
        margin='$2'
        padding='$'
        size='$5'
        placeholder='Telefono'
        value={updateForm.phone}
        onChangeText={(text) => {
          if (!isSaving && isEditing) {
            setUpdateForm({ ...updateForm, phone: text });
          }
        }}
        disabled={!isEditing || isSaving}
      />

      <View>
        <View>
          <TouchableOpacity
            style={styles.inputTextPicker}
            onPress={() => {
              setShowPicker(!showPicker && isEditing);
            }}>
            <TextInput
              style={styles.textPicker}
              editable={false}
              value={date.toLocaleDateString('es-ES')}
            />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker value={date} mode='date' display='spinner' onChange={onChange} />
        )}
      </View>

      <Form.Trigger asChild>
        <Button
          disabled={isSaving}
          size='$3'
          backgroundColor='$green11Light'
          color='black'
          icon={isSaving ? () => <Spinner /> : undefined}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}>
          {isEditing ? 'Guardar' : 'Editar'}
        </Button>
      </Form.Trigger>
    </Form>
  );
};
