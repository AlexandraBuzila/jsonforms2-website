import React from 'react'
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { JsonForms } from "@jsonforms/react";
import { Provider } from "react-redux";
import Radium from 'radium';
import {UiSchemaElementsCode} from "./listings/uischema";
import Demo from "../../common/Demo";
import commonStyles from "../../common/styles";
import PropHeader from "../../common/PropHeader";
import MarkdownElement from "../../common/MarkdownElement";
import {createJsonFormsStore} from "../../common/store";
import ApiLink from "../../common/ApiLink";

const styles = () => ({
  code: commonStyles.code,
  display1: commonStyles.display1,
  headline: commonStyles.headline,
  link: commonStyles.link,
  caption: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-1em',
    marginBottom: '0.5em'
  }
});

const RadiumLink = Radium(Link);

const Controls = ({ classes }) => {
  const store = createJsonFormsStore({
    data: UiSchemaElementsCode.controls.data,
    schema: UiSchemaElementsCode.controls.schema,
    uischema: UiSchemaElementsCode.controls.uischema,
  });

  return (
    <div>
      <Typography
        variant='display1'
        className={classes.display1}
      >
        Controls
      </Typography>
      <p>
        Controls represent the basic building blocks for creating forms.
      </p>
      <p>
        A control is usually displaying the value of one property from the data in an UI element such as an input field.
        How a control is rendered depends on the type of the property as defined in the JSON Schema,
        e.g. a property of type <code>boolean</code> is rendered as a Checkbox by default.
        Controls are of
        type <ApiLink link='/api/core/interfaces/scopable.html'>Scopable</ApiLink> and
        therefore have a <code>scope</code> property.
      </p>

      <PropHeader title='scope' type='string' />
      <p>
        The mandatory <code>scope</code> property, which expects a&nbsp;
        <a href="https://spacetelescope.github.io/understanding-json-schema/structuring.html#reuse"
           className={classes.link}>
          JSON schema reference
        </a>&nbsp;, defines to which property of the data the control should be bound to.
      </p>
      <p>
        For instance, let us suppose we want to create a control for the <code>name</code> property in this schema:
      </p>
      <MarkdownElement
        dir="ltr"
        className={classes.code}
        text={`\`\`\`json\n${JSON.stringify(UiSchemaElementsCode.controls.schema, null, 2)}\n\`\`\``}
      />
      <Typography variant='caption' className={classes.caption}>
        JSON schema with a name property
      </Typography>

      <p>
        The corresponding UI Schema needs to set the <code>type</code> of the UI Schema Element
        to <code>Control</code> and set the <code>scope</code> to point to
        the <code>name</code> property from the JSON schema as follows:
      </p>
      <MarkdownElement
        dir="ltr"
        className={classes.code}
        text={`\`\`\`json\n${JSON.stringify(UiSchemaElementsCode.controls.uischema, null, 2)}\n\`\`\``}
      />
      <Typography variant='caption' className={classes.caption}>
        UI schema for binding a control against the name property
      </Typography>

      <p>
        JSON Forms will render the following form from this UI Schema:
      </p>

      <Provider store={store} >
        <Demo
          js={() => {
            return (
              <JsonForms
                schema={UiSchemaElementsCode.controls.schema}
                uischema={UiSchemaElementsCode.controls.uischema}
              />
            )
          }}
          schema={UiSchemaElementsCode.controls.schema}
          uischema={UiSchemaElementsCode.controls.uischema}
        />
      </Provider>

      <p>
        JSON Forms ships with a default renderer set which consists of renderers for all primitive types as well as
        for arrays. Furthermore JSON Forms allows controls to be replaced or new controls to be added for newly
        invented UI Schema Elements. For documentation on these so called <em>Custom Renderers</em> please see the section
        about <RadiumLink to={'/docs/custom-renderers'} className={classes.link}>Custom renderers</RadiumLink>.
      </p>
    </div>
  );
};

export default withStyles(styles)(Controls);
