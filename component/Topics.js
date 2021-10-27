import React from "react";
import style from "../styles/Topics.module.css";
import { setTopicsData } from "../pages/notebookData";

export var changeTopicFunction;

export default class Topics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topics: []
        };

        this.changeTopics = this.changeTopics.bind(this);
        changeTopicFunction = this.changeTopics;
    }

    changeTopics(newTopics) {
        console.log(newTopics);
        setTopicsData(newTopics);
        this.setState({
            topics: newTopics
        });
    }

    render() {
        return (
            <ul id={style.topicsList}>
                {
                    this.state.topics.map((element, index) => {
                        return (<li className={style.listItem} key={`topic${index}`}>{element}</li>)
                    })
                }
            </ul>
        )
    }
}