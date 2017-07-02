import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
			<div className="load-more" ref="wrapper">
				{
					this.props.isLoadingMore
					? <span>加载中...</span>
					: <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
				}
			</div>
    )
  }
	loadMoreHandle() {
		// 执行传输过来的 loadMoreFn
		this.props.loadMoreFn()
	}
}

export default LoadMore