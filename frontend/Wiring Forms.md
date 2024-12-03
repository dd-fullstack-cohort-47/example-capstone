1. identify the form you want to wire up and locate the form in the project.
2. Create a new component for the form.
    * since where the form lives in the project is based on how it is being used, there is no one size fits all solution for where the new component should live.
      * if the form is being used in a single place, it can be placed in the same directory as the component that is using it.
      * if the form is being used in multiple places, it can be placed in the `components` directory.
3. wire the form markup to react hook form
   * create model for target entity/api route if one does not exist. 
   * create an action for sending a request to the apis route.
   * create a status state variable to track the status of the form submission.
   * define default values for the form.
   * define what happens when the form is submitted.
   * tie the form business logic to react hook form.
   * wire form fields to react hook form in markup.
   * create areas to display form errors and form submission messages.
