import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Task, TaskState } from '../types/task';
import { useTasks } from '../hooks/useTasks';
import { boolean, object, string } from 'yup';
import { Formik } from 'formik';
import Button from '../components/Button';

const AddTaskScreen: React.FC = () => {

  const [showModalDate, setShowModalDate] = useState(false);
  const [showModalTime, setShowModalTime] = useState(false);
  const{createTask} = useTasks();

  const addTaskSchema = object({
    title: string()
      .required('Le titre est obligatoire')
      .max(64, 'Titre trop long !'),
    description: string()
      .required('La description est obligatoire')
      .max(64, 'Description trop longue !'),
    hasDueDate: boolean(),
    date: string().nullable().when('hasDueDate', {
      is: true,
      then: schema => schema.required('La date est obligatoire'),
      otherwise: schema => schema.notRequired(),
    }),
    hasDueTime: boolean(),
    time: string().nullable().when('hasDueTime', {
      is: true,
      then: schema => schema.required("L'heure est obligatoire"),
      otherwise: schema => schema.notRequired(),
    }),
  });
  const handleAddTask = (title:string, description:string,hasDueDate:boolean,date:string,hasDueTime:boolean,time:string) => {
    const newTask: Task = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      state: TaskState.InProgress, 
      title,
      description,
      hasDueDate,
      dueDate: hasDueDate ? date : null,
      hasDueTime,
      dueTime: hasDueTime && time ? time : null,
    };

    createTask(newTask);
    
  };

  return (
    <View style={styles.page}>
      <Formik 
        initialValues={{title: '', description: '', hasDueDate: false, date: '', hasDueTime: false, time: '' }}
        validationSchema={addTaskSchema}
        onSubmit={(values,{ resetForm }) =>{
          handleAddTask(
          values.title, values.description,values.hasDueDate,values.date,values.hasDueTime,values.time
        );
        resetForm();
        } 
      }
      >
        {({ errors, values, isValid, touched, handleChange, handleSubmit,setFieldValue, isSubmitting }) => 
        (<>
          <TextInput
            placeholder="Nom de la tâche"
            value={values.title}
            onChangeText={handleChange('title')}
            style={styles.input}
          />
          {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

          <TextInput
            placeholder="Description de la tâche"
            value={values.description}
            onChangeText={handleChange('description')}
            style={styles.input}
          />
          {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}        

          <View style={styles.toogleAndLabel}>
          <TouchableOpacity
            style={values.hasDueDate ? styles.taskMarkerDone : styles.taskMarker}
            onPress={() => setFieldValue('hasDueDate', !values.hasDueDate)}
          />
            <Text>Mettre une date limite </Text>
          </View>

          {values.hasDueDate &&(
            <>
              <TouchableOpacity  onPress={() => setShowModalDate(true)}>
                <Text style={styles.input}>
                  {values.date?new Date(values.date).toLocaleDateString():"Sélectionner une date"}
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
          {values.hasDueTime &&(
            <TouchableOpacity  onPress={() => setShowModalTime(true)}>
              <Text style={styles.input}>
                {values.time?new Date(values.time).toLocaleTimeString():"Sélectionner une heure"}
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
          <Button text='Ajouter' onPress={()=>handleSubmit()} disabled={!isValid || isSubmitting}/>

        </>)} 
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  page:{
    paddingHorizontal:20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#393E46',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  toogleAndLabel:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      marginVertical: 10,
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor:'#393E46',
    borderColor: '#222831',
    marginRight: 15,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#00ADB5',
    marginRight: 15,
  },
    errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default AddTaskScreen;
