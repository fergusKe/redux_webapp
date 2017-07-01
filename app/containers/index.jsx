import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import { CITYNAME } from '../config/localStoreKey.js'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      initDone: false
    }
  }
  render() {
    return (
      <div>
        {
          this.state.initDone
          ? this.props.children
          : <div>加載中...</div>
        }
      </div>
    )
  }
  componentDidMount() {
    // 获取位置信息
    let cityName = LocalStore.getItem(CITYNAME)
    if (cityName == null) {
      cityName = '北京'
    }

    // 更改状态
    this.setState({
      initDone: true
    })
  }
}

export default App