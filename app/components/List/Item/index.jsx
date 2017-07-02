import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
		const data = this.props.data
    return (
      <div>
				{
					data.title
				}
			</div>
    )
  }
}

export default List