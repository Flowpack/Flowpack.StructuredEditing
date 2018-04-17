import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import manifest from '@neos-project/neos-ui-extensibility';
import {selectors} from '@neos-project/neos-ui-redux-store';
import {DropDown} from '@neos-project/react-ui-components';
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
        const value = $get(['properties', propertyName], getNodeByContextPath(contextPath));
        return (
            <div style={{display: 'inline-block'}}>
                <DropDown.Stateless isOpen={this.state.isOpen} padded={true} onToggle={this.handleToggle} onClose={() => null}>
                    <DropDown.Header className="enveloper_dropdown_header">
                        <style>{'\
                        .enveloper_dropdown_header{\
                            width: 30px;\
                            height: 30px;\
                            padding: 8px;\
                        }\
                        .enveloper_dropdown_contents{\
                            width: 320px;\
                            background-color: #272727;\
                        }\
                        .enveloper_dropdown_header i {\
                            display: none;\
                        }\
                        '}</style>
                        <svg style={{backgroundColor: '#323232', position: 'absolute', fill: 'white', width: '14px', height: '14px'}} width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z" /></svg>
                    </DropDown.Header>
                    <DropDown.Contents className="enveloper_dropdown_contents" scrollable={false}>
                        <div>
                            <EditorEnvelope
                                identifier={propertyName}
                                label={$get('label', editorOptions)}
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
                    {...config}
                />), domNode);
        },
        ToolbarComponent: () => null
    });
});
