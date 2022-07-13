import React from "react";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";

const data = {
  id: "0",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1"
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
          children: [
            {
              id: "7",
              name: "Child - 7"
            },
            {
              id: "8",
              name: "Child - 8"
            }
          ]
        }
      ]
    },
    {
      id: "5",
      name: "Child - 5",
      children: [
        {
          id: "6",
          name: "Child - 6"
        }
      ]
    }
  ]
};

export default function RecursiveTreeView() {
  const [selected, setSelected] = React.useState([]);

  function getChildById(node, id) {
    let array = [];

    function getAllChild(nodes=null) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach(node => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes, id) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach(node => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked, nodes) {
    const allNode = getChildById(data, nodes.id);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter(value => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.some(item => item === nodes.id)}
              onChange={event =>
                getOnChange(event.currentTarget.checked, nodes)
              }
              onClick={e => e.stopPropagation()}
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.id}
        />
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpanded={["0", "3", "4"]}
      defaultExpandIcon={<ArrowForwardIosIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
