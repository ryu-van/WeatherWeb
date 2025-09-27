import React from "react";
import "./SettingDialog.css";
const SettingDialog = ({ open, onClose }) => {
  if (!open) return false;
  return (
      <div className="setting-dialog">
        <div className="dialog-header">
          <h3>Setting</h3>
          <button className="close-btn">
            <img src="/src/assets/icons8-close-50.png" onClick={onClose} />
          </button>
        </div>
        <div className="dialog-row">
          <label htmlFor="language-select">Language:</label>
          <select id="language-select" name="language">
            <option value="en">English</option>
            <option value="es">Vietnamese</option>
          </select>
        </div>
        <div className="dialog-row">
          <label htmlFor="theme-select">Theme:</label>
          <select id="theme-select" name="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
  );
};
export default SettingDialog;
