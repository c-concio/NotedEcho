import Head from 'next/head';
import Block from '../component/Block';
import React from 'react'

import dynamic from 'next/dynamic';
const EditorJsWithSSR = dynamic(() => import("../component/Editor"), {ssr : false,});

export default class Main extends React.Component {
  componentDidMount() {
    
  }


  render() {
    return (
      <div>

        <div className="flex-row">
          <div className="flex-col">
            <Block/>
            <Block/>
            <Block/>
          </div>
          <EditorJsWithSSR/>
        </div>


      </div>
    )
  }
}