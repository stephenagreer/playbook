import React, { useState } from "react";
import { DraggableProvider, List, ListItem } from "playbook-ui";

// Initial items to be dragged
const data = [
  {
    id: "31",
    text: "Philadelphia",
  },
  {
    id: "32",
    text: "New Jersey",
  },
  {
    id: "33",
    text: "Maryland",
  },
  {
    id: "34",
    text: "Connecticut",
  },
];

const DraggableWithList = (props) => {
  const [initialState, setInitialState] = useState(data);


  return (
    <>
    <DraggableProvider initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
        <List enableDrag
            {...props}
        >
            {initialState.map(({ id, text }) => (
                <ListItem dragId={id}
                    key={id}
                >
                    {text}
                </ListItem>
            ))}
        </List>
    </DraggableProvider>
    </>

  );
};

export default DraggableWithList;
