import React from "react";
import { observer } from "mobx-react-lite";
import { Segment, Label, List } from "semantic-ui-react";
import { ITask } from "../task";
import AddTaskForm from "./AddTaskForm";
import ListItem from "./ListItem";
import { colors } from "../utils";

const TasksList: React.FC<{
  tasks: ITask[];
  group: string;
  addable?: boolean;
}> = ({ tasks, group, addable }) => {
  return (
    <Segment
      clearing
      secondary
      color={addable ? colors.positive : colors.negative}
    >
      <Label
        size="large"
        color={addable ? colors.positive : colors.negative}
        attached="top"
        content={group}
      />
      <List selection>
        {tasks.map(task => (
          <ListItem task={task} key={task.id} />
        ))}
      </List>
      {addable && <AddTaskForm />}
    </Segment>
  );
};

export default observer(TasksList);
