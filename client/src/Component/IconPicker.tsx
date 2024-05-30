// IconPicker.js
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const IconPicker = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const iconList = Object.keys(Icons)
    .filter(key => key !== 'fas' && key !== 'prefix')
    .map(icon => Icons[icon]);

  const filteredIcons = iconList.filter(icon =>
    icon.iconName.includes(searchTerm)
  );

  return (
    <div className="icon-picker">
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="icon-list">
        {filteredIcons.map(icon => (
          <FontAwesomeIcon
            key={icon.iconName}
            icon={icon}
            onClick={() => onSelect(icon)}
            style={{ cursor: 'pointer', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default IconPicker;
