import React from 'react';
const SettingDialog = () => {
    return (
        <div className="setting-dialog">
            <h5>Setting</h5>
            <div className="language-setting">
                <label htmlFor="language-select">Language:</label>
                <select id="language-select" name="language">
                    <option value="en">English</option>
                    <option value="es">Viet Nam</option>
                </select>
            </div>
            <div className="theme-setting">
                <label htmlFor="theme-select">Theme:</label>
                <select id="theme-select" name="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
        
    );
}
export default SettingDialog;