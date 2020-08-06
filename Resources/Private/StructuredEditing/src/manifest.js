import React, { PureComponent, useState } from "react";
import ReactDOM from "react-dom";
import manifest from "@neos-project/neos-ui-extensibility";
import { selectors } from "@neos-project/neos-ui-redux-store";
import { DropDown, Icon } from "@neos-project/react-ui-components";
import { connect } from "react-redux";
import { $transform, $get } from "plow-js";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { EditorEnvelope } from "@neos-project/neos-ui-editors";
import { NeosContext } from "@neos-project/neos-ui-decorators";
import SecondaryInspector from "./SecondaryInspector/index";

let renderSecondaryInspector = () => {};

const InlineSecondaryInspector = () => {
  const [state, setState] = useState({
    secondaryInspectorName: undefined,
    secondaryInspectorComponent: undefined,
  });
  const closeSecondaryInspector = () => {
    setState({
      secondaryInspectorName: undefined,
      secondaryInspectorComponent: undefined,
    });
  };
  renderSecondaryInspector = (
    secondaryInspectorName,
    secondaryInspectorComponentFactory
  ) => {
    if (state.secondaryInspectorName === secondaryInspectorName) {
      // We toggle the secondary inspector if it is rendered a second time; so that's why we hide it here.
      closeSecondaryInspector();
    } else {
      let secondaryInspectorComponent = null;
      if (secondaryInspectorComponentFactory) {
        // Hint: we directly resolve the factory function here, to ensure the object is not re-created on every render but stays the same for its whole lifetime.
        secondaryInspectorComponent = secondaryInspectorComponentFactory();
      }
      setState({
        secondaryInspectorName,
        secondaryInspectorComponent,
      });
    }
  };
  return state.secondaryInspectorComponent ? (
    <SecondaryInspector onClose={closeSecondaryInspector}>
      {state.secondaryInspectorComponent}
    </SecondaryInspector>
  ) : null;
};

@connect(
  $transform({
    currentlyEditedPropertyName:
      selectors.UI.ContentCanvas.currentlyEditedPropertyName,
    getNodeByContextPath: selectors.CR.Nodes.nodeByContextPath,
    focusedNodePath: selectors.CR.Nodes.focusedNodePathSelector,
  })
)
class InlineEditorEnvelope extends PureComponent {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const {
      contextPath,
      fusionPath,
      propertyName,
      persistChange,
      editorOptions,
      getNodeByContextPath,
    } = this.props;
    const node = getNodeByContextPath(contextPath);
    const nodeTypeName = $get("nodeType", node);
    const nodeType = this.props.nodeTypesRegistry.getNodeType(nodeTypeName);
    const icon = $get("icon", editorOptions) || "pencil";
    const value = $get(["properties", propertyName], node);
    return (
      <div style={{ display: "inline-block" }}>
        <DropDown.Stateless
          isOpen={this.state.isOpen}
          padded={true}
          onToggle={this.handleToggle}
          onClose={() => null}
        >
          <DropDown.Header className="enveloper_dropdown_header">
            <style>
              {
                "\
                        .enveloper_dropdown_header{\
                            position: relative;\
                            width: 30px;\
                            height: 30px;\
                            padding: 0;\
                        }\
                        .enveloper_dropdown_icon{\
                            position: absolute;\
                            top: 8px;\
                            left: 8px;\
                        }\
                        .enveloper_dropdown_contents{\
                            width: 320px;\
                            background-color: #272727;\
                        }\
                        .enveloper_dropdown_header svg:nth-child(3) {\
                            display: none;\
                        }\
                        "
              }
            </style>
            <Icon className="enveloper_dropdown_icon" icon={icon} />
          </DropDown.Header>
          <DropDown.Contents
            className="enveloper_dropdown_contents"
            scrollable={false}
          >
            <div>
              <EditorEnvelope
                identifier={propertyName}
                label={
                  $get("label", editorOptions) ||
                  $get(["properties", propertyName, "ui", "label"], nodeType) ||
                  ""
                }
                editor={$get("editor", editorOptions)}
                value={value && value.toJS ? value.toJS() : value}
                hooks={null}
                options={editorOptions}
                commit={(value) => {
                  persistChange({
                    type: "Neos.Neos.Ui:Property",
                    subject: contextPath,
                    payload: {
                      propertyName,
                      value,
                      nodeDomAddress: {
                        contextPath,
                        fusionPath,
                      },
                    },
                  });
                }}
                renderSecondaryInspector={renderSecondaryInspector}
              />
            </div>
          </DropDown.Contents>
        </DropDown.Stateless>
      </div>
    );
  }
}

const findParentFusionPath = (node, contextPath) => {
  if (node) {
    const fusionPath = node.getAttribute("data-__neos-fusion-path");
    if (
      fusionPath &&
      node.getAttribute("data-__neos-node-contextpath") === contextPath
    ) {
      return fusionPath;
    }
    return findParentFusionPath(node.parentNode, contextPath);
  }
  return null;
};

manifest(
  "Flowpack.StructuredEditing:EditorEnvelope",
  {},
  (globalRegistry, { routes, configuration, store }) => {
    const containerRegistry = globalRegistry.get("containers");
    containerRegistry.set(
      "Modals/InlineSecondaryInspector",
      InlineSecondaryInspector
    );
    const inlineEditorRegistry = globalRegistry.get("inlineEditors");
    const nodeTypesRegistry = globalRegistry.get(
      "@neos-project/neos-ui-contentrepository"
    );
    inlineEditorRegistry.set("Flowpack.StructuredEditing/EditorEnvelope", {
      bootstrap: () => null,
      createInlineEditor: (config) => {
        const domNode = config.propertyDomNode;
        const guestWindow = domNode.ownerDocument.defaultView;
        const fusionPath = findParentFusionPath(domNode, config.contextPath);
        ReactDOM.render(
          <Provider store={store}>
            <NeosContext.Provider
              value={{ configuration, globalRegistry, routes }}
            >
              <DndProvider backend={HTML5Backend} context={guestWindow}>
                <InlineEditorEnvelope
                  globalRegistry={globalRegistry}
                  routes={routes}
                  configuration={configuration}
                  store={store}
                  fusionPath={fusionPath}
                  nodeTypesRegistry={nodeTypesRegistry}
                  {...config}
                />
              </DndProvider>
            </NeosContext.Provider>
          </Provider>,
          domNode
        );
      },
      ToolbarComponent: () => null,
    });
  }
);
