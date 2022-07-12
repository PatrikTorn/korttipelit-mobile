import * as userActions from "./userActions";
import * as gameActions from "./gameActions";
import * as commonActions from "./commonActions";
import * as notificationActions from "./notificationActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...userActions,
      ...commonActions,
      ...gameActions,
      ...notificationActions,
    },
    dispatch
  );

export const mapStateToProps = (state, props) => state;
export const Connect = connect(mapStateToProps, mapDispatchToProps);
