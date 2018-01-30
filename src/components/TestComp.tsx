import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

export interface ITest {
  visible: boolean
}

class TestComp extends Component<ITest, any> {
  render(props: ITest) {
    return <div>
      {props.visible ? 'i am visible' : 'i am not visible'}
    </div>
  }
}

export default connect(['visible'])(TestComp)
