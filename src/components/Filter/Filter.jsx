import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={css.filterForm}>
    <label className={css.contactLabel}>
      Find contacts by name
      <input
        className={css.contactFilter}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
