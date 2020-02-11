import React, { Fragment, useEffect, useContext } from "react";
import { TaskStoreContext } from "./taskStore";
import TasksList from "./features/TasksList";
import { Segment, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const App = () => {
  const taskStore = useContext(TaskStoreContext);
  const { tasksByDate, overdueTasks, doneTasks } = taskStore;

  useEffect(() => {
    taskStore.loadTasks();
  }, [taskStore]);

  return (
    <Segment attached>
      <Grid stackable>
        <Grid.Column width={8}>
          <Fragment>
            {tasksByDate.length === 0 ? (
              <Fragment key="Default">
                <TasksList addable tasks={[]} group="Today" />
              </Fragment>
            ) : (
              tasksByDate.map(([group, appTasks]) => (
                <Fragment key={group}>
                  <TasksList addable tasks={appTasks} group={group} />
                </Fragment>
              ))
            )}
          </Fragment>
        </Grid.Column>
        <Grid.Column width={8}>
          <TasksList tasks={overdueTasks} group="Overdue" />
          <TasksList tasks={doneTasks} group="Done" />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(App);
