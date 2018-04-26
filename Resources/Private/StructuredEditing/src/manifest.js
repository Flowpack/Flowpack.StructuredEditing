import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import manifest from '@neos-project/neos-ui-extensibility';
import {selectors} from '@neos-project/neos-ui-redux-store';
import {DropDown, Icon} from '@neos-project/react-ui-components';
import {withDragDropContext} from '@neos-project/neos-ui-decorators';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import EditorEnvelope from '@neos-project/neos-ui-editors';

@withDragDropContext
@connect($transform({
    currentlyEditedPropertyName: selectors.UI.ContentCanvas.currentlyEditedPropertyName,
    getNodeByContextPath: selectors.CR.Nodes.nodeByContextPath,
    focusedNodePath: selectors.CR.Nodes.focusedNodePathSelector
}))
class InlineEditorEnvelope extends PureComponent {
    state = {
        isOpen: false
    }
    static childContextTypes = {
        store: PropTypes.object.isRequired,
        globalRegistry: PropTypes.object.isRequired,
        configuration: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired
    };
    getChildContext() {
        const {configuration, globalRegistry, routes, store} = this.props;
        return {configuration, globalRegistry, routes, store};
    }
    handleToggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
    render() {
        const {contextPath, fusionPath, propertyName, persistChange, editorOptions, getNodeByContextPath, focusedNodePath} = this.props;
        const node = getNodeByContextPath(contextPath);
        const nodeTypeName = $get('nodeType', node);
        const nodeType = this.props.nodeTypesRegistry.getNodeType(nodeTypeName);
        const icon = $get('icon', editorOptions) || 'pencil';
        const value = $get(['properties', propertyName], node);
        return (
            <div style={{display: 'inline-block'}}>
                <DropDown.Stateless isOpen={this.state.isOpen} padded={true} onToggle={this.handleToggle} onClose={() => null}>
                    <DropDown.Header className="enveloper_dropdown_header">
                        <style>{'\
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
                        '}</style>
                        <Icon className="enveloper_dropdown_icon" icon={icon} />
                    </DropDown.Header>
                    <DropDown.Contents className="enveloper_dropdown_contents" scrollable={false}>
                        <div>
                            <EditorEnvelope
                                identifier={propertyName}
                                label={$get('label', editorOptions) || $get(['properties', propertyName, 'ui', 'label'], nodeType) || ''}
                                editor={$get('editor', editorOptions)}
                                value={value && value.toJS ? value.toJS() : value}
                                hooks={null}
                                options={editorOptions}
                                commit={value => {
                                    persistChange({
                                        type: 'Neos.Neos.Ui:Property',
                                        subject: contextPath,
                                        payload: {
                                            propertyName,
                                            value,
                                            nodeDomAddress: {
                                                contextPath,
                                                fusionPath
                                            }
                                        }
                                    });
                                }}
                                renderSecondaryInspector={() => null}
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
        const fusionPath = node.getAttribute('data-__neos-fusion-path');
        if (fusionPath && node.getAttribute('data-__neos-node-contextpath') === contextPath) {
            return fusionPath;
        }
        return findParentFusionPath(node.parentNode, contextPath);
    }
    return null;
};

manifest('Flowpack.StructuredEditing:EditorEnvelope', {}, (globalRegistry, {routes, configuration, store}) => {
    const inlineEditorRegistry = globalRegistry.get('inlineEditors');
    const nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');
    inlineEditorRegistry.set('Flowpack.StructuredEditing/EditorEnvelope', {
        bootstrap: () => null,
        createInlineEditor: config => {
            const domNode = config.propertyDomNode;
            const fusionPath = findParentFusionPath(domNode, config.contextPath);
            ReactDOM.render(
                (<InlineEditorEnvelope
                    globalRegistry={globalRegistry}
                    routes={routes}
                    configuration={configuration}
                    store={store}
                    fusionPath={fusionPath}
                    nodeTypesRegistry={nodeTypesRegistry}
                    {...config}
                />), domNode);
        },
        ToolbarComponent: () => null
    });
});
