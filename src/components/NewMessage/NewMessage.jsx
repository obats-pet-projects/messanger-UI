import React, { Component } from 'react';
import { Formik } from '../../../public/node_modules/formik/dist';
import NewMessageSchema from '../../utils/NewMessageUtils';

class NewMessage extends Component {
  state = {
    title: '',
    description: ''
  };

  handleMsgChange = evt => {
    this.setState({
      title: evt.target.value
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <div>
        <form action="">
          <fieldset>
            <p className="">
              <input
                type="text"
                value={title}
                onChange={this.handleMsgChange}
              />
              <textarea value={description} />
            </p>
          </fieldset>
          <p>{title}</p>
        </form>
      </div>
    );
  }
}

export default NewMessage;
