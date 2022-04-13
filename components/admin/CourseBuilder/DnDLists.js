
import { useState } from '@wordpress/element';
import { Icon } from '@wordpress/components';
import SortableTree, { getVisibleNodeCount, getTreeFromFlatData, getNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
// import FileExplorerTheme from '../components/Editor/CustomTheme';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Sidebar from '../EditorSidebar';
// const FileExplorerTheme = require('../components/Editor/CustomTheme');

const DnDLists = ({items}) => {

  const [ listData, setListData ] = useState( [
    { 
      title: 'Section1',
      children: [
        {
          title: 'Lesson1',
        },
      ]
    },
    { 
      title: 'Section2',
      children: [
        {
          title: 'Introduction2'
        }
      ]
    },
    { 
      title: 'Section3',
      children: [
        {
          title: 'Introduction3'
        }
      ]
    },
    { 
      title: 'Section4',
      children: [
        {
          title: 'Introduction4'
        }
      ]
    },
  ] );
  
  const [ treeData2, setTreeData2 ] = useState( [
    { 
      title: 'Tree 2 Section1',
      children: [
        {
          title: 'Tree 2 lesson'
        }
      ]
    },
  ] );
  
  const handleEditNode = () => {
    
  }
  
  const rowHeight = ({index, treeIndex, node, path}) => {
    console.log('row');
    console.log({index, treeIndex, node, path});
    return 70;
    // return path.length === 1 ? 28 : 70;
  }
  
  const generateNodeProps = (extendedNode) => {
    // console.log('extendedNode');
    // console.log(extendedNode);
    let className;
    if(extendedNode.parentNode) {
      className = 'text-base bg-white text-main rounded-3xl w-full p-4 cursor-pointer';
    } else {
      className = 'text-base text-grey-dark px-4 w-full cursor-pointer';
    }
    return ({
      // title: <a href={extendedNode.node.url}>{extendedNode.node.title}</a>
      className,
      rowHeight: 10,
      buttons: [
        <FontAwesomeIcon onClick={handleEditNode} className="h-6 mx-2" icon={{prefix: 'fas', iconName: 'pencil-alt'}} />,
        <FontAwesomeIcon className="h-6 " icon={{prefix: 'fas', iconName: 'trash'}} />
      ]
    })
  }

  const visibleNodeCount = getVisibleNodeCount({treeData})
  
  const nodeHeight = 70;
  return (
    <>
      <SortableTree
        style={{ height: nodeHeight * visibleNodeCount }}
        treeData={ treeData }
        onChange={ setTreeData }
        name="structure"
        generateNodeProps={generateNodeProps}
        maxDepth={2}
        theme={FileExplorerTheme}
        rowHeight={rowHeight}
        // isVirtualized={false}
      />
      <h2>Tree 2</h2>
      <SortableTree
        style={{ height: nodeHeight * visibleNodeCount }}
        treeData={ treeData2 }
        onChange={ setTreeData2 }
        name="structure"
        generateNodeProps={generateNodeProps}
        maxDepth={2}
        theme={FileExplorerTheme}
        rowHeight={rowHeight}
        // isVirtualized={false}
      />
    </>
  );
}

export default CourseStructure;