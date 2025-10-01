import React, { useState } from "react";
import "./SettingDialog.css";
import { X } from "lucide-react";
const SettingDialog = ({ open, onClose, unit, chooseUnit }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  if (!open) return null;
  
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    window.location.reload(); 
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="setting-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>{language === 'vi' ? 'Cài đặt' : 'Settings'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X/>
          </button>
        </div>
        <div className="dialog-row">
          <label htmlFor="language-select">{language === 'vi' ? 'Ngôn ngữ' : 'Language'}:</label>
          <select id="language-select" name="language" value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
          </select>
        </div>
        <div className="dialog-row">
          <label htmlFor="theme-select">{language === 'vi' ? 'Nhiệt độ' : 'Temperature'}:</label>
          <select id="theme-select" value={unit} onChange={(e)=> chooseUnit(e.target.value)} name="theme">
            <option value="C">{language === 'vi' ? 'Độ C (°C)' : 'Celsius (°C)'}</option>
            <option value="F">{language === 'vi' ? 'Độ F (°F)' : 'Fahrenheit (°F)'}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default SettingDialog;
