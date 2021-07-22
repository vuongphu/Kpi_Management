import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Grid, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { setProjectProps } from "./../../app/common/util/util";


const roleOptions = [
  { key: "op", value: "op", text: "OP" },
  { key: "qc", value: "qc", text: "QC" },
];
const WorksheetFilter = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUserProjects, userProjects,loadWorkSheets,loadingInitial,setRoleSelected, setProjectSelected,roleSelected,projectSelected} = rootStore.worksheetStore!;
  // const [roleSelected, setRoleSelected] = useState<any>();
  // const [projectSelected, setProjectSelected] = useState<any>();
  useEffect(() => {
    if (userProjects.length ==0)
    {
      loadUserProjects().then(() => console.log(userProjects));
    }
    if (roleSelected != null && projectSelected != null)
    {
        loadWorkSheets(projectSelected,roleSelected)
    }
  }, [loadUserProjects,roleSelected,projectSelected]);

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
                setProjectSelected(d.value!.toString());
              }}
              wrapSelection={false}
              defaultValue ={projectSelected}
              options={userProjects.map((project) => ({
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
                setRoleSelected(d.value!.toString());
              }}
              options={roleOptions}
              wrapSelection={false}
              defaultValue ={roleSelected}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(WorksheetFilter);
