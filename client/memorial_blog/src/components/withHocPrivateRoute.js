import { withRouter } from "dva/router";
import { Component } from "react";
import { getLogicStatus } from "../utils/logic";

export default function withHocPrivateRoute(WrappedComponent, hocProps) {
  if (!WrappedComponent) {
    throw new Error("缺少组件参数");
    // eslint-disable-next-line no-unreachable
    return false;
  }

  return withRouter(
    class extends Component {
      // eslint-disable-next-line no-useless-constructor
      constructor(props) {
        super(props);
      }
      UNSAFE_componentWillMount() {
     
        let isAuthenticated = getLogicStatus();
         
        this.setState({
          isAuthenticated,
        });

        if (!isAuthenticated) {
          const { history } = this.props;
          history.replace("/login");
        }
      }

      render() {
        return this.state.isAuthenticated ? (
          <WrappedComponent {...this.props} />
        ) : (
          "请重新登录"
        );
      }
    }
  );
}
