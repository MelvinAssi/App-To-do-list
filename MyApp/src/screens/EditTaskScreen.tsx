import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTasks } from '../hooks/useTasks';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '../navigations/TabNavigator';
import { CrudStackParamList } from '../navigations/CrudNavigator';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Task } from '../types/Task';
import Button from '../components/Button';

type DetailTaskRouteProp = RouteProp<CrudStackParamList, 'EditTask'>;
type NavigationProp = StackNavigationProp<RootTabParamList>;
type Props = {
  route: DetailTaskRouteProp;
};

const EditTaskScreen: React.FC<Props> = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const { updateTask } = useTasks();
  const [showModalDate, setShowModalDate] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);

  const handleEditTask = (title:string, description:string,hasDueDate:boolean,date:string,hasDueTime:boolean,time:string) => {
    
    task.title = title;
    task.description =description;
    task.hasDueDate =hasDueDate;
    task.dueDate = hasDueDate && date ? date : null,
    task.hasDueTime =hasDueTime;
    task.dueTime =  hasDueTime && time ? time : null,
    updateTask(task);
    navigation.goBack();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est obligatoire').max(64, 'Titre trop long !'),
    description: Yup.string().required('La description est obligatoire').max(255, 'Description trop longue !'),
    hasDueDate: Yup.boolean(),
    date: Yup.string()
      .nullable()
      .when('hasDueDate', {
        is: true,
        then: (schema) => schema.required('La date est obligatoire'),
      }),
    hasDueTime: Yup.boolean(),
    time: Yup.string()
      .nullable()
      .when('hasDueTime', {
        is: true,
        then: (schema) => schema.required('L\'heure est obligatoire'),
      }),
  });

  return (
    <View style={styles.page}>
      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          hasDueDate: task.hasDueDate,
          date: task.dueDate ? new Date(task.dueDate).toISOString() : '',
          hasDueTime: task.hasDueTime,
          time: task.dueTime ? new Date(task.dueTime).toISOString() : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values,{resetForm}) => { handleEditTask(
          values.title, values.description,values.hasDueDate,values.date,values.hasDueTime,values.time
        )
        resetForm()
      }}
      >
        {({ handleChange, handleSubmit,isValid, values, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nom de la tâche"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
            {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <View style={styles.toogleAndLabel}>
              <TouchableOpacity
                style={values.hasDueDate ? styles.taskMarkerDone : styles.taskMarker}
                onPress={() => setFieldValue('hasDueDate', !values.hasDueDate)}
              />
              <Text>Mettre une date limite</Text>
            </View>

            {values.hasDueDate && (
              <>
                <TouchableOpacity onPress={() => setShowModalDate(true)}>
                  <Text style={styles.input}>
                    {values.date ? new Date(values.date).toLocaleDateString() : 'Sélectionner une date'}
                  </Text>
                </TouchableOpacity>
                {touched.date && errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

                <View style={styles.toogleAndLabel}>
                  <TouchableOpacity
                    style={values.hasDueTime ? styles.taskMarkerDone : styles.taskMarker}
                    onPress={() => setFieldValue('hasDueTime', !values.hasDueTime)}
                  />
                  <Text>Mettre une heure limite</Text>
                </View>
              </>
            )}

            {values.hasDueTime && (
              <TouchableOpacity onPress={() => setShowModalTime(true)}>
                <Text style={styles.input}>
                  {values.time ? new Date(values.time).toLocaleTimeString() : 'Sélectionner une heure'}
                </Text>
              </TouchableOpacity>
            )}
            {touched.time && errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

            <DateTimePickerModal
              isVisible={showModalDate}
              mode="date"
              locale="fr_FR"
              onConfirm={(selectedDate) => {
                setFieldValue('date', selectedDate.toISOString());
                setShowModalDate(false);
              }}
              onCancel={() => setShowModalDate(false)}
            />

            <DateTimePickerModal
              isVisible={showModalTime}
              mode="time"
              locale="fr_FR"
              onConfirm={(selectedTime) => {
                setFieldValue('time', selectedTime.toISOString());
                setShowModalTime(false);
              }}
              onCancel={() => setShowModalTime(false)}
            />
            <Button text='Editer' onPress={() => handleSubmit() } disabled={!isValid} />

          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { paddingHorizontal: 20, flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#393E46',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  toogleAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#393E46',
    marginRight: 15,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#00ADB5',
    marginRight: 15,
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#EEEEEE',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default EditTaskScreen;
