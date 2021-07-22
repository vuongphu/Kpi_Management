import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Grid, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { history } from "./../../../index";

const roleOptions = [
  { key: "op", value: "op", text: "OP" },
  { key: "qc", value: "qc", text: "QC" },
];
const ProjectWorksheetFilter =({ id }: { id: string | undefined }) => {
  const rootStore = useContext(RootStoreContext);
  
  const { loadHostProjects, leadProjects,loadWorkSheetsForLead,loadingInitial,setRoleSelectedByLead, setProjectSelectedByLead,roleSelectedByLead,projectSelectedByLead} = rootStore.worksheetStore!;
  // const [roleSelected, setRoleSelected] = useState<any>();
  // const [projectSelected, setProjectSelected] = useState<any>();
  useEffect(() => {
    if (leadProjects.length ==0)
    {
        loadHostProjects().then(() => console.log(leadProjects));
    }
    if (roleSelectedByLead != null && projectSelectedByLead != null)
    {
        loadWorkSheetsForLead(projectSelectedByLead,roleSelectedByLead)
    }
  }, [loadHostProjects,roleSelectedByLead,projectSelectedByLead]);

  return (
    <Segment.Group>
        <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>   Choose Project - Role  </Header>
      </Segment>
      <Segment attached="top" loading ={loadingInitial}>
        <Grid>
          <Grid.Column width={6}>
            <Dropdown
              placeholder="Select Project"
              fluid
              search
              selection
              onChange={(e, d) => {
                setProjectSelectedByLead(d.value!.toString());
                history.replace(`/confirm/${d.value!.toString()}`)
              }}
              wrapSelection={false}
              defaultValue ={id!= undefined ? id:undefined}
              options={leadProjects.map((project) => ({
                key: project.id,
                value: project.id,
                text: project.title,
                image: {
                  avatar: true,
                  src: `/assets/levelImages/${
                    project.level == "Hard"
                      ? "hard"
                      : project.level == "Normal"
                      ? "normal"
                      : "easy"
                  }.jpg`,
                },
              }))}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Dropdown
              placeholder="Select Role"
              search
              selection
              onChange={(e, d) => {
                setRoleSelectedByLead(d.value!.toString());
              }}
              options={roleOptions}
              wrapSelection={false}
              defaultValue ={roleSelectedByLead}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProjectWorksheetFilter);
