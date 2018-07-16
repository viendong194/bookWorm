import React, { Component } from 'react'
import {Message} from 'semantic-ui-react'

export default class ConfirmEmailMessage extends Component {
  render() {
    return (
      <Message info>
        <Message.Header>please! verify your email</Message.Header>
      </Message>
    )
  }
}
