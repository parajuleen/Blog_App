import React from 'react'
import { ErrorMessage,useField } from 'formik'

const Error = ({name}) => {

  const [field, meta] = useField(name) 
    // usefield is hook provided by formik to interact with specific fields in a form. The name field  from the input field is passed as props.The useField returns an array size 3 where first object is spread as field (Field object contains the properties for the form field like value, name, onChange, and onBlur)  and second object as meta (This object contains information about the field's validation state, such as touched, error, and initialValue.)
  
      


  return (
  <>
   <div className='text-red-500 text-center'>
    
    {meta.touched && meta.error ? <div>{meta.error}</div> :""}
   </div>
  </>
  )
}

export default Error
