import React from 'react';
import { render } from 'react-dom';
import styles from './style.module.scss';
import './index.css';
import Attributes from '../../feature/attributeList/ui/fragments/Attributes';

render(
  <div className={styles.app}>
    <Attributes />
  </div>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
