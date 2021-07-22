import React, { Fragment, useContext, useEffect, useState } from "react";
import { Segment, Button, Form, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "./../../app/stores/rootStore";
import { IWorksheet, WorksheetFormValues } from "../../app/models/worksheet";
import { observer } from "mobx-react-lite";
import DateInput from "../../app/common/form/DateInput";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { FORM_ERROR } from "final-form";
import { v4 as uuid } from "uuid";
import TextArenaInput from "../../app/common/form/TextArenaInput";
import { changeZoneDate, combineDateAndTime } from "../../app/common/util/util";
const validate = combineValidators({
  productivity: isRequired("productivity"),
  day: isRequired("day"),
  hour: isRequired("hour"),
});
const WorksheetForm = ({ id }: { id: string | undefined }) => {
  const rootStore = useContext(RootStoreContext);
  const { closeModal } = rootStore.modelStore;
  const { loadWorksheet, editWorksheet, createWorksheet, roleSelected, projectSelected } =
    rootStore.worksheetStore;
  const [state, setstate] = useState<IWorksheet>();
  const [worksheet, setWorksheet] = useState(new WorksheetFormValues());
  const [loading, setLoading] = useState(false);
  const initWorksheet = async () => {
    var initWorksheet = new WorksheetFormValues()
    initWorksheet.day = new Date()
    initWorksheet.hour = new Date("2022-05-18T01:00:00.000Z")

    return initWorksheet
  }


  useEffect(() => {
    if (id != undefined) {
      setLoading(true);
      loadWorksheet(id)
        .then((worksheets) => {
          var currentDate = new Date();
          currentDate.setHours(worksheets.hour.getHours(), worksheets.hour.getMinutes(), worksheets.hour.getSeconds())
          worksheets.hour = currentDate
          setWorksheet(new WorksheetFormValues(worksheets));
          
        })
        .finally(() => setLoading(false));
    }
    else {
      setLoading(true)

      // initWorksheet().then((initWorksheet)=>
      // {
      //   setWorksheet(new WorksheetFormValues(initWorksheet))
      // })
      // .finally(()=> setLoading(false))
      var initWorksheet = new WorksheetFormValues()
      initWorksheet.day = new Date()
      var currentDate = new Date();
      currentDate.setHours(8, 0, 0)
      initWorksheet.hour = currentDate;
      setWorksheet(initWorksheet)
      setLoading(false)

      // 

    }
  }, [loadWorksheet, id]);
  const handleFinalFormSubmit = (values: any) => {
    
    const {  ...worksheet } = values;

    worksheet.productivity = Number(worksheet.productivity)
    // worksheet.hour = changeZoneDate(hour )
    // worksheet.day = changeZoneDate(day)
    
    if (!worksheet.id) {
      let newWorksheet = {
        ...worksheet,
        id: uuid(),
      };
      
      setLoading(true);
      createWorksheet(newWorksheet, roleSelected, projectSelected).then()
        .finally(() => { setLoading(false); closeModal() });
    } else {
      setLoading(true);
      editWorksheet(worksheet, roleSelected, projectSelected).then()
        .finally(() => { setLoading(false); closeModal() });
    }
    // closeModal();
  };

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>{id == undefined ? "Create record" : "Edit record"}</Header>
      </Segment>
      <Segment attached clearing>
        <FinalForm
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          initialValues={worksheet}

          render={({
            handleSubmit,
            submitError,
            invalid, pristine,
            dirtySinceLastSubmit,
          }) => (
            <Form onSubmit={handleSubmit} error >
              <Field
                name="productivity"
                placeholder="Productivity"
                value={String(worksheet.productivity)}
                type="number"
                component={TextInput}
              />
              <Form.Group widths="equal">
                <Field
                  component={DateInput}
                  name="day"
                  date={true}
                  placeholder="Day"
                  value={worksheet.day}
                />
                <Field
                  component={DateInput}
                  name="hour"
                  time={true}
                  placeholder="Hour"
                  value={worksheet.hour}


                />
              </Form.Group>
              <Field
                name="note"
                placeholder="Note"
                value={worksheet.note}
                component={TextArenaInput}
              />

              <Button
                disabled={loading}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                onClick={closeModal}
                disabled={loading}
                floated="right"
                type="button"
                content="Cancel"
              />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                  error={submitError}
                />
              )}

            </Form>
          )}
        />
      </Segment>
    </Fragment>
  );
};
export default observer(WorksheetForm)