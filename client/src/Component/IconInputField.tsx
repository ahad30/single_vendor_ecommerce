// // IconInputField.js
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import IconPicker from './IconPicker';

// const IconInputField = () => {
//   const [showPicker, setShowPicker] = useState(false);
//   const [selectedIcon, setSelectedIcon] = useState(null);

//   const handleIconSelect = icon:Re => {
//     setSelectedIcon(icon);
//     setShowPicker(false);
//     // onIconSelect(icon);
//   };

//   return (
//     <div className="icon-input-field">
//       <div>
//         <input
//           type="text"
//           onFocus={() => setShowPicker(true)}
//           placeholder="Click to select an icon"
//           readOnly
//           value={selectedIcon ? selectedIcon.iconName : ''}
//         />
//         {selectedIcon && <FontAwesomeIcon icon={selectedIcon} />}
//       </div>
//       {showPicker && <IconPicker onSelect={handleIconSelect} />}
//     </div>
//   );
// };

// export default IconInputField;
