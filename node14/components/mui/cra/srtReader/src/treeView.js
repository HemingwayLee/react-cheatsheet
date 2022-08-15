import React from "react";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';

// const gData = {
//   id: "0",
//   name: "Parent",
//   children: [
//     {
//       id: "1",
//       name: "Child - 1"
//     },
//     {
//       id: "3",
//       name: "Child - 3",
//       children: [
//         {
//           id: "4",
//           name: "Child - 4",
//           children: [
//             {
//               id: "7",
//               name: "Child - 7"
//             },
//             {
//               id: "8",
//               name: "Child - 8"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: "5",
//       name: "Child - 5",
//       children: [
//         {
//           id: "6",
//           name: "Child - 6"
//         }
//       ]
//     }
//   ]
// };

const gData = {
  id: "0",
  name: "Csv files",
  children: [
    // {
    //   id: "1",
    //   name: "Child - 1"
    // },
    // {
    //   id: "2",
    //   name: "Child - 3"
    // },
    // {
    //   id: "3",
    //   name: "Child - 5"
    // }
  ]
};

let gCsv = {};

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
    const allNode = getChildById(gData, nodes.id);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter(value => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  async function ReadFile(file) {
    return await file.text()
  }

  function handleCsvData(data, name) {
    console.log(data);
  }

  function handleCapture({target}) {
    // const fileReader = new FileReader();
    
    // fileReader.readAsDataURL(target.files[0]);
    // fileReader.onload = (e) => {
    //   // const selectedFile = e.target.files[0];
    //   console.log(e);
    // };

    const selectedFile = target.files[0];
    // console.log(selectedFile);

    const promise = new Promise(resolve => {
      const fileContent = ReadFile(selectedFile);
      resolve(fileContent);
    });

    promise.then(fileContent => {
      const filename = selectedFile.name;
      // console.log(filename);

      if (filename in gCsv) {
        alert("csv file already exists");
      } else {
        // $('input.theFile:checkbox').prop('checked', false); 

        // $("#csvFiles").append(
        //   $('<div class="checkbox">').append(
        //     $("<label>").html(`<input class="theFile" type="checkbox" value="${filename}" checked>${filename}</label>`)
        //   )
        // );
        gData.children.push({
          id: uuidv4(),
          name: filename
        });

        // TODO: render automatically
        handleCsvData(fileContent, filename);
      }
    });
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
              onChange={e => getOnChange(e.currentTarget.checked, nodes)}
              onClick={e => e.stopPropagation()}
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.id}
        />
      }
    >
      { console.log("re-render !!!!!") }
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleCapture}>
        Upload File
        <input type="file" accept=".csv" hidden />
      </Button>

      <ResponsiveContainer>
        <TreeView
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowForwardIosIcon />}
        >
          {renderTree(gData)}
        </TreeView>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
