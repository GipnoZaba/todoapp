import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { ITask } from "../task";
import { TaskStoreContext } from "../taskStore";
import {
  List,
  Segment,
  Grid,
  Button,
  Container,
  Transition
} from "semantic-ui-react";
import { colors } from "../utils";

const ListItem: React.FC<{ task: ITask }> = ({ task }) => {
  const taskStore = useContext(TaskStoreContext);
  const { completeTask, restoreTask, deleteTask } = taskStore;
  const [hoverItemId, setHoverItemId] = useState("");

  return (
    <List.Item className="p-0">
      <Segment
        className="p-2"
        onMouseEnter={() => setHoverItemId(task.id)}
        onMouseLeave={() => setHoverItemId("")}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column stretched className="pr-0" width={2}>
              <Button
                inverted
                icon={task.done ? "undo" : "check"}
                color={task.done ? colors.negative : colors.positive}
                size="tiny"
                onClick={
                  task.done
                    ? () => {
                        restoreTask(task.id);
                        setHoverItemId("");
                      }
                    : () => {
                        completeTask(task.id);
                        setHoverItemId("");
                      }
                }
              />
            </Grid.Column>
            <Grid.Column className="text-break" width={11}>
              <Container className="py-3" content={task.title} />
            </Grid.Column>
            <Grid.Column width={3} verticalAlign="top" textAlign="right">
              <Fragment>
                <Transition
                  visible={hoverItemId === task.id}
                  animation="scale"
                  duration={0}
                >
                  <div>
                    <Button
                      circular
                      inverted
                      disabled={task.done}
                      icon="ban"
                      color={colors.negative}
                      size="tiny"
                      onClick={() => {
                        deleteTask(task.id);
                        setHoverItemId("");
                      }}
                    />
                  </div>
                </Transition>
              </Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </List.Item>
  );
};

export default observer(ListItem);
