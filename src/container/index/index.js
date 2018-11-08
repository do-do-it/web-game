import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import { List } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
import './index.less'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '游戏大厅',
      listData: [
        {
          id: 1,
          name: '俄罗斯方块1',
          brief: '基于dom实现',
          link: '/tetris1/'
        },
        {
          id: 2,
          name: '俄罗斯方块22',
          brief: '基于canvas实现',
          link: '/tetris2/'
        }
      ]
    }
  }
  render() {
    const listData = this.state.listData
    return (
      <List renderHeader={() => this.state.title} className='list'>
        {
          listData.map(item => (
            <a href={item.link} key={item.id}>
              <Item arrow="horizontal">{item.name}
                <Brief>{item.brief}</Brief>
              </Item>
            </a>
          ))
        }
      </List>
    )
  }
}

ReactDom.render(<Home />, document.getElementById('app'))
