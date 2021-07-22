import { Observer, observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Checkbox, CheckboxProps, Grid, Header, Popup, Segment, Table } from 'semantic-ui-react';
import { IUserManager } from '../../app/models/user';
import { IWorksheet } from '../../app/models/worksheet';
import { RootStoreContext } from '../../app/stores/rootStore';
import WorksheetForm from '../worksheets/WorksheetForm';
import CreateUserForm from './CreateUserForm'
interface IProps {
  userManager: IUserManager[],
  loading: boolean,
  deleteUser: (user: IUserManager) => void
  editing: boolean,
  setEdit: (editing: boolean, user: string) => void
  userEdit: string | null
}

const EmployeeList: React.FC<IProps> = ({
  editing, setEdit, userEdit, userManager, loading, deleteUser
}) => {
  const rootStore = useContext(RootStoreContext);
  const { worksheetBy, loadWorkSheets, worksheetArray } =
    rootStore.worksheetStore;
  const [listItem, setListItem] = useState<Number[]>([]);
  const [stateAll, setStateAll] = useState({ checked: false });
  const [Worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  //   setWorksheets(worksheetBy)
  const checkboxChangeHandler = (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    if (data.checked) setListItem([...listItem, Number(data.name)]);
    else setListItem(listItem.filter((item) => item != Number(data.name)));
  };

  const handleEdit = (usename: string) => {
    setEdit(usename != userEdit, usename)
  };
  const tbodyStyles = {
    display: 'block',
    height: '40vh',
    overflow: 'auto',
  };
  const trStyle = {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
  };
  useEffect(() => {
    if (stateAll.checked === true) {
      let b = worksheetBy.filter((x) => !x.confirm).map((it, i) => it.id);
      setListItem(b);
    } else {
      setListItem([]);
    }
  }, [stateAll]);
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}>
        <Header>{"Employees"}</Header>
      </Segment>
      <Segment attached clearing>
        <Grid>
          <Grid.Column width={16}>
            <Table celled selectable striped role="grid" aria-labelledby="header">
              <Table.Header>
                <Table.Row style={trStyle}>
                  <Table.HeaderCell style={{ colSpan: "3", id: "header" }}>DisplayName</Table.HeaderCell>
                  <Table.HeaderCell style={{ colSpan: "3", id: "header" }}>Role</Table.HeaderCell>
                  <Table.HeaderCell style={{ colSpan: "3", id: "header" }}>UserName</Table.HeaderCell>
                  <Table.HeaderCell style={{ colSpan: "3", id: "header" }}>Email</Table.HeaderCell>
                  <Table.HeaderCell style={{ colSpan: "3", id: "header" }}>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body style={tbodyStyles}>
                {userManager.map((it, i) => (
                  <Table.Row style={trStyle} key={i} onClick={() => console.log(i)}>
                    <Table.Cell>{it.displayName}</Table.Cell>
                    <Table.Cell>{it.role}</Table.Cell>
                    <Table.Cell>{it.username}</Table.Cell>
                    <Table.Cell>{it.email}</Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Popup
                          content={(editing && it.username == userEdit) ? "Cancel" : "Edit"}
                          trigger={
                            <Button
                              onClick={() => handleEdit(it.username)}
                              to="/login"
                              size="medium"
                              icon={(editing && it.username == userEdit) ? "user cancel" : "edit"}
                            />
                          }
                        />
                        <Popup
                          content={"Delete user"}
                          trigger={
                            <Button
                              onClick={() => deleteUser(it)}
                              size="medium"
                              icon="delete"
                              loading={loading}
                            />
                          }
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
}
export default observer(EmployeeList)
