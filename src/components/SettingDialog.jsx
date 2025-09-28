import React from "react";
import "./SettingDialog.css";

const SettingDialog = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="setting-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>Settings</h3>
          <button className="close-btn" onClick={onClose}>
            <img src="/src/assets/icons8-close-50.png" alt="Close" />
          </button>
        </div>
        <div className="dialog-row">
          <label htmlFor="language-select">Language:</label>
          <select id="language-select" name="language">
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
          </select>
        </div>
        <div className="dialog-row">
          <label htmlFor="theme-select">Temperature:</label>
          <select id="theme-select" name="theme">
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SettingDialog;
