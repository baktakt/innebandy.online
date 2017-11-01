import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import CSSModules from 'react-css-modules'
import styles from './TagBox.css'

class TagBox extends Component {

  constructor(props) {
    super(props);
    this.state = { src: props.src, alt: props.alt, tags: []}
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  
  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }
  
  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });
    console.log(this.state.tags);
  }
  
  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;
  
    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
  
    // re-render
    this.setState({ tags: tags });
  }

  render() {
    return (
      <div>
        <ReactTags
          classNames={{
            tags: styles.ReactTags__tags ,
            tagInput: styles.ReactTags__tagInput,
            tagInputField: styles.ReactTags__tagInputField,
            selected: styles.ReactTags__selected,
            tag: styles.ReactTags__tag,
            remove: styles.ReactTags__remove,
            suggestions: styles.ReactTags__suggestions,
            activeSuggestion: styles.ReactTags__activeSuggestion
          }}
          tags = {this.state.tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          suggestions={['röd','grön','blå','svart','passning','anfall']}
        />
      </div>
    );
  }
}

export default CSSModules(TagBox, styles)