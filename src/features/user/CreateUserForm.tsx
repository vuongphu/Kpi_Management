import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import React, { useContext } from "react";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { roleEmp } from "./../../app/common/options/roleOption";
import SelectInput from "../../app/common/form/SelectInput";
import { observable, observe } from "mobx";
import { observer } from "mobx-react-lite";
const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
  displayName: isRequired("display Name"),
  username: isRequired("username"),
  role: isRequired('role'),
});
interface IProps {
  createUserx: (user: IUserFormValues) => Promise<void>,
  loading: boolean,



}
const CreateUserForm: React.FC<IProps> = ({ createUserx, loading }) => {
  const rootStore = useContext(RootStoreContext);
  const { editing, userChoose, updateUser } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        !editing ?
          createUserx(values).then(()=>{console.log("123")}).catch((error) => ({
            [FORM_ERROR]: error,
          }))
          :
          updateUser(values).catch((error) => ({
            [FORM_ERROR]: error,
          }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (

        <Form onSubmit={handleSubmit} error>

          <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: "none" }}
          >
            <Header>{editing ? "Update Employee" : "Create new Employee"}</Header>
          </Segment>
          <Segment  attached clearing>
            <Grid>
              <Grid.Column width={8}>
                <Field name="username" component={TextInput} placeholder="Username" defaultValue={editing ? userChoose?.username : null} disabled={editing} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field name="displayName" component={TextInput} placeholder="Display Name" defaultValue={editing ? userChoose?.displayName : null} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={8}>
                <Field name="email" component={TextInput} placeholder="Email" defaultValue={editing ? userChoose?.email : null} disabled={editing} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  name="password"
                  component={TextInput}
                  placeholder="Password"
                  type="password"
                  defaultValue={editing ? '' : null}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  component={SelectInput}
                  options={roleEmp}
                  name="role"
                  placeholder="Role"
                  defaultValue={editing  ? userChoose?.role : null}

                />
              </Grid.Column>


              <Grid.Column width={16}>
                <Button
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  loading={submitting}
                  positive
                  content={editing ? "Update Employee" : "Create Employee "}
                  fluid
                />
              </Grid.Column>
              <Grid.Column width={16} >
                {submitError && !dirtySinceLastSubmit && (
                  <ErrorMessage
                    error={submitError}
                  />
                )}
              </Grid.Column>

            </Grid>
          </Segment>
        </Form>
      )}
    />
  );
};
export default observer(CreateUserForm);
