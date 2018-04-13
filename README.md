# Structured Inline Editing for Neos CMS

Allows to reuse inspector editors inline. Hint: put all content-related properties inline and leave only metadata properties in the inspector.

![Demo](https://raw.githubusercontent.com/flowpack/Flowpack.StructuredEditing/master/structured.gif)

Getting started:

1. `composer require 'flowpack/structured-editing@dev'`
2. Configure your nodetype properties to be inline editable like this:

```
'Some.Node:Type'
  properties:
    date:
      type: DateTime
      defaultValue: now
      ui:
        label: Date
        reloadIfChanged: true
        inspector:
          group: news
          editorOptions:
            format: 'd-m-Y H:i'
        inline:
          editor: 'Flowpack.StructuredEditing/EditorEnvelope'
          editorOptions:
            format: 'd-m-Y H:i'
            editor: 'Neos.Neos/Inspector/Editors/DateTimeEditor'
```

3. Render an editable annotation for this field, using usual `ContentElementEditable` annotation, which will be turned into the pencil edit icon:

```
prototype(Some.Node:Type) < prototype(Neos.Fusion:Array) {
 dateEditable = ContentElementEditable {
	 property = 'date'
 }
 date = ${Date.format(node.properties.date, 'd-m-Y')}
 @process.contentElementWrapping = ContentElementWrapping
}
```

**The concept behind this package will be merged back into the core once it matures, for now let's try it out in practice!**
