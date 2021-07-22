import React, {  useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import {
  ProjectFormValues,
} from "../../../app/models/project";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextNumberInput from "../../../app/common/form/TextNumberInput";
import TextArenaInput from "../../../app/common/form/TextArenaInput";
import SelectInput from "../../../app/common/form/SelectInput";

import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate'
import { RootStoreContext } from "../../../app/stores/rootStore";
import { level } from './../../../app/common/options/levelOption';

const validate= combineValidators({
  title:isRequired({message:"The event title is required"}),
  level:isRequired('Level'),
  description:composeValidators(isRequired('Description'),hasLengthGreaterThan(4)({message:'Descriptino needs to be least 5 characters'}))(),
  qcKpi:isRequired("QC KPI"),
  opKpi:isRequired("OP KPI"),
  date:isRequired("Date"),
  time:isRequired("Time"),

})
interface DetailParams {
  id: string;
}
const ProjectForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {

  const rootStore = useContext(RootStoreContext);
  const {createProject,
    editProject,
    submitting,
    loadProject}=rootStore.projectStore;
  const {user}=rootStore.userStore;
  const [project, setProject] = useState(new ProjectFormValues());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadProject(match.params.id)
        .then((project) => {
          setProject(new ProjectFormValues(project))})
        .finally(() => setLoading(false));
     
    }
    console.log(user)
    if (user?.role != 'Manager' && user?.role != 'Teamlead' )
    {
      history.push("/projects")
    }
   
  }, [loadProject, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...project } = values;
    project.date = dateAndTime;
    project.opKpi=Number(project.opKpi)
    project.qcKpi=Number(project.qcKpi)
    if (!project.id) {
      let newProject = {
        ...project,
        id: uuid(),
      };
      
      createProject(newProject);
      
    } else {
      editProject(project);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>{!match.params.id ? "Create Projet":"Edit Project"}</Header>
      </Segment>
        <Segment attached clearing>
          <FinalForm
            validate={validate}
            initialValues={project}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit , invalid,pristine,submitError }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={project.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  row={3}
                  value={project.description}
                  component={TextArenaInput}
                />
                <Field
                  component={SelectInput}
                  options={level}
                  name="level"
                  placeholder="Level"
                  value={project.level}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={project.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Hour"
                    value={project.time}
                  />
                </Form.Group>
                <Field
                  component={TextNumberInput}
                  name="opKpi"
                  placeholder="OP KPI"
                  value={(project.opKpi)}
                  type="number"
                />
                <Field
                  component={TextNumberInput}
                  name="qcKpi"
                  placeholder="QC KPI"
                  value={(project.qcKpi)}
                  type="number"
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                
                <Button
                  onClick={
                    project.id
                      ? () => history.push(`/projects/${project.id}`)
                      : () => history.push("/projects")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ProjectForm);
