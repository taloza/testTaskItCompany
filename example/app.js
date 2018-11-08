import '../lib/react-ui-tree.css';
import './theme.css';
import './app.css';
import cx from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree from '../lib/react-ui-tree.js';
//import tree from './tree';
import NavigationTree from '../NavigationTree'
import packageJSON from '../package.json';

class App extends Component {
  state = {
    active: null,
    tree: {}
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };

  onClickNode = node => {
    this.setState({
      active: node
    });
  };

  componentDidMount()
  {
    console.log("componentDidMount");

    fetch('../NavigationTree.json')
      .then(function(response) {
             //console.log(response.json());
        return response.json();
      })
      .then((data)=> {
        var treeData = this.parsNodeChildren(data.nodes);

        console.log(treeData); 
        this.setState({
          tree: {
            module: 'react-ui-tree',
            children:treeData
          }
        });        
      });
  };


  render() {
    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector">
          <h1>
            {packageJSON.name} {packageJSON.version}
          </h1>
          <button onClick={this.updateTree}>update tree</button>
          <pre>{JSON.stringify(this.state.tree, null, '  ')}</pre>
        </div>
      </div>
    );
  }

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

  updateTree = () => {
    const { tree } = this.state;
    tree.children.push({ module: 'test' });
    this.setState({
      tree: tree
    });
  };


  parsNode(jsonNodesI){ 
    var res = {};
    res.module = jsonNodesI.id; //todo:add more attributes
    
      if (jsonNodesI.nodes && jsonNodesI.nodes.length > 0){
        res.children = this.parsNodeChildren(jsonNodesI.nodes)        
        //console.log(jsonNodesI.nodes);
      }
      else
      {
        res.leaf = true;
      }      
      return res;
  }

  parsNodeChildren(jsonNodes){ 
    var result=[];
    if (jsonNodes && jsonNodes.length > 0){
      for(var i = 0; i<jsonNodes.length; i++ ){
        result.push(this.parsNode(jsonNodes[i]));
      }     
    }
    //console.log(result);
    return result; 
  }



}

ReactDOM.render(<App />, document.getElementById('app'));



