import React, { Component } from "react";

import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    term: ''
  }

  onLabelChange = (event) => {
    const {onSearch = () => {}} = this.props
    this.setState({
      term: event.target.value
    })

    onSearch(event.target.value)
  }

  render () {
    return(
      <input type="text"
             className="form-control search-input"
             placeholder="Try to search smthing here"
             value={this.state.term}
             onChange={this.onLabelChange}
      />
    )
  }
}

