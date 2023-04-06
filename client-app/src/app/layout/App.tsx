import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
// import List from "semantic-ui-react/dist/commonjs/elements/List";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import { IActivity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivity] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivity(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: IActivity){
    activity.id 
    ? setActivity([...activities.filter(x => x.id !== activity.id), activity])
    : setActivity([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

function handleDeleteActivity(id:string){
  setActivity([...activities.filter(x => x.id !== id)])
}

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
