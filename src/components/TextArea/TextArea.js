import React from 'react';
import classes from './TextArea.module.css';
import bsStyles from '../../assets/bootstrap.module.css';

/**
 * The Text Area component
 *
 * @param object props Component props.
 */
const TextArea = (props) => {
  const className = [
    classes.TextArea,
    bsStyles['py-3']
  ];

  if (props.monospace) {
    className.push(bsStyles['text-monospace']);
  }

  return(
    <div className={className.join(' ')}>
      <textarea className={bsStyles['form-control']} onInput={props.change} defaultValue={props.value} readOnly={props.readonly} placeholder={props.placeholder}></textarea>
    </div>
  );
}

export default TextArea;
