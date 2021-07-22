import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Segment,
  Button,
  Form,
  CheckboxProps,
  Checkbox,
  Table,
  Grid,
  Popup,
  Header,
  Icon,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IWorksheet } from "../../app/models/worksheet";
import { observer } from "mobx-react-lite";
import WorksheetForm from "./WorksheetForm";
import { format } from "date-fns";
const WorksheetTable = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modelStore;
  const {
    loadingInitial,
    worksheetBy,
    loadWorkSheets,
    worksheetArray,
    deleteWorksheet,
    roleSelected,
    projectSelected
  } = rootStore.worksheetStore;
  const [listItem, setListItem] = useState<string[]>([]);
  const [state, setstate] = useState({ checked: false });
  const [stateAll, setStateAll] = useState({ checked: false });
  const [Worksheets, setWorksheets] = useState<IWorksheet[]>([]);
 
  const handleAddWorkSheet = () => {

    openModal(<WorksheetForm id={undefined} />)
  };
  useEffect(() => {
   
    if (stateAll.checked === true) {
      let b = worksheetBy.filter((x) => !x.confirm).map((it, i) => it.id);
      setListItem(b);
    } else {
      setListItem([]);
    }
  }, [stateAll, loadWorkSheets]);
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>   Work Sheet
          <Popup
            content="Create new record"
            trigger={
              <Button color="teal" floated="right" circular icon="add circle" disabled={(roleSelected == null || projectSelected == null)} onClick={() =>
                handleAddWorkSheet()
              }></Button>
            }
          /></Header>
      </Segment>
      <Segment attached loading={loadingInitial}>
        <Table celled selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Stt</Table.HeaderCell>
              <Table.HeaderCell>Productivity</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Note</Table.HeaderCell>
              <Table.HeaderCell>Confirm</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {worksheetArray.map((it, i) => (
              <Table.Row key={i} onClick={() => console.log(it.id)}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{it.productivity}</Table.Cell>
                <Table.Cell>{format(it.day, "dd/MM/YYYY")}</Table.Cell>
                <Table.Cell>{format(it.hour, "HH:mm")}</Table.Cell>
                <Table.Cell>{it.note}</Table.Cell>
                <Table.Cell>{it.confirm && <Icon size='large' disabled name='check circle outline' ></Icon>}</Table.Cell>
                <Table.Cell>
                  {!it.confirm && (
                    <Button.Group>
                      <Popup
                        content="Edit record"
                        trigger={
                          <Button
                            onClick={() =>
                              openModal(<WorksheetForm id={it.id} />)
                            }
                            to="/login"
                            icon="edit"
                          />
                        }
                      />
                      <Popup
                        content="Delete record"
                        trigger={
                          <Button
                            onClick={() => deleteWorksheet(it.id,roleSelected,projectSelected)}
                            size="medium"
                            icon="delete"
                          />
                        }
                      />
                    </Button.Group>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </Fragment>
  );
};

export default observer(WorksheetTable);
