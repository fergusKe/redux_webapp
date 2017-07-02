import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import { CITYNAME } from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo' 

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
    this.props.userInfoActions.update({
      cityName
    })
    
    this.setState({
      initDone: true
    })
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)