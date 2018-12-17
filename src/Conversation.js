import React, {Component} from 'react';
import Message from './Message';
import Reply from './Reply'

class Conversation extends Component {
  render() {


    return (
      <article className='conversation-entry'>
        <p> Testing place holder</p>
        <Reply/>
      </article>
    )
  }
}

export default Conversation;
