import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [], // 存储数据
      hasMore: false, // 记录当前状态下，是否还有更多数据，这个需要后端返回。true 即还有，false 即没了 
      isLoadingMore: false, // 记录当前状态下，是否正在加载中。true 即正在加载中，false 即不是加载中状态 
      page: 1 // 记录下一页的页码，首页的页码是 0
    }
  }
  render() {
    return (
      <div>
        <h2 className="home-list-title">猜你喜欢</h2>
        {
          this.state.data.length
          ? <ListComponent data={this.state.data} />
          : <div>加載中...</div>
        }
        { 
          this.state.hasMore 
          ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
          : ''
        }
      </div>
    )
  }
  componentDidMount() {
    // 获取首页数据
    this.loadFirstPageData()
  }
  // 获取首页数据
  loadFirstPageData() {
    const cityName = this.props.cityName
    const result = getListData(cityName, 0)
    this.resultHandle(result)
  }
  // 加载更多数据
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })

    const cityName = this.props.cityName
    const page = this.state.page // 下一页的页码
    const result = getListData(cityName, page)
    this.resultHandle(result)

    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }
  // 处理数据
  resultHandle(result) {
    result.then(res => {
      return res.json()
    }).then(json => {
      const hasMore = json.hasMore
      const data = json.data
      
      this.setState({
        hasMore,
        data: this.state.data.concat(data)
      })
    })
  }
}

export default List