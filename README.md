# Structured Inline Editing for Neos CMS

Allows to reuse inspector editors inline. Hint: put all content-related properties inline and leave only metadata properties in the inspector.

![Demo](https://raw.githubusercontent.com/flowpack/Flowpack.StructuredEditing/master/structured.gif)

Getting started:

1. `composer require flowpack/structuredediting`
2. Configure your nodetype properties to be inline editable like this:

```yaml
'Some.Node:Type'
  properties:
    date:
      type: DateTime
      defaultValue: now
      ui:
        label: Date
        reloadIfChanged: true
        inline:
          editor: 'Flowpack.StructuredEditing/EditorEnvelope'
          editorOptions:
            format: 'd-m-Y H:i'
            editor: 'Neos.Neos/Inspector/Editors/DateTimeEditor'
```

3. Render an editable annotation for this field, using usual `ContentElementEditable` annotation, which will be turned into the pencil edit icon:

```
prototype(Some.Node:Type) < prototype(Neos.Neos:ContentComponent) {
  dateEditable = Neos.Neos:ContentElementEditable {
    property = 'date'
  }
  date = ${q(node).property('date')}

  renderer = afx`
    {props.dateEditable}
    {Date.format(props.date, 'd-m-Y')}
  `
}
```

**The concept behind this package will be merged back into the core once it matures, for now let's try it out in practice!**
