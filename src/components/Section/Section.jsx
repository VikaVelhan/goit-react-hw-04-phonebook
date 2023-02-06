import React from 'react';
import PropTypes from 'prop-types';
import css from './Section.module.css';

const Section = ({ title }) => (
  <section className={css.section}>
    <h2 className={css.title}>{title}</h2>
  </section>
);

export default Section;

Section.propTypes = {
  title: PropTypes.string.isRequired,
};
