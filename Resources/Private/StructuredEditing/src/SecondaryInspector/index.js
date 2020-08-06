import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { $get } from "plow-js";

import { selectors } from "@neos-project/neos-ui-redux-store";

import { Icon, Button } from "@neos-project/react-ui-components";

@connect((state) => {
  const isDirty = selectors.UI.Inspector.isDirty(state);
  const shouldPromptToHandleUnappliedChanges = selectors.UI.Inspector.shouldPromptToHandleUnappliedChanges(
    state
  );
  const unappliedChangesOverlayIsVisible =
    isDirty && !shouldPromptToHandleUnappliedChanges;

  return {
    isFringeLeft: $get("ui.leftSideBar.isHidden", state),
    isFringeRight: $get("ui.rightSideBar.isHidden", state),
    isFullScreen: $get("ui.fullScreen.isFullScreen", state),
    unappliedChangesOverlayIsVisible,
  };
})
export default class SecondaryInspector extends PureComponent {
  static propTypes = {
    isFringeLeft: PropTypes.bool.isRequired,
    isFringeRight: PropTypes.bool.isRequired,
    unappliedChangesOverlayIsVisible: PropTypes.bool.isRequired,

    // Interaction related propTypes.
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const {
      onClose,
      children,
      isFringeLeft,
      isFringeRight,
      unappliedChangesOverlayIsVisible,
    } = this.props;
    const style = {
      position: "absolute",
      top: 82,
      right: isFringeRight ? 0 : 320,
      left: isFringeLeft ? 0 : 320,
      bottom: 0,
      background: "#222",
      height: "calc(100% - 82px)",
      border: "1px solid #222",
      transition: ".25s ease left, .25s ease right",
      willChange: "left, right",
      zIndex: unappliedChangesOverlayIsVisible ? 2 : 1,
    };

    return (
      <div style={style}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 40,
            height: 40,
            padding: 0,
            fontSize: 18,
            borderRightWidth: 0,
            borderTopWidth: 0,
            zIndex: 2,
          }}
        >
          <Button style="clean" onClick={onClose}>
            <Icon icon="times" />
          </Button>
        </div>
        {children}
      </div>
    );
  }
}
