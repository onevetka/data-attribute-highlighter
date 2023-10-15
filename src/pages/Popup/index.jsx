import React from 'react';
import { render } from 'react-dom';
import styles from './style.module.scss';
import './index.css';
import { AttributeList } from '../../feature/attributeList/ui/fragments/AttributeList';

render(
  <div className={styles.app}>
    <AttributeList />
  </div>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
