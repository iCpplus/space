import React, { useEffect, useState } from 'react';

import { formatMessage } from 'utils/i18n';
import { getSimpleTheme, setSimpleTheme } from 'utils/simpleTheme';
import { getThemeBackground, setThemeBackground } from 'utils/themeBackground';

import Toggle from '../Toggle';

/**
 * Theme settings, rendered on its own page (`/setting/`).
 *
 * Only two options are left: the compact ("极简风") article list and an optional
 * custom background image. The three preset backgrounds the old inline popup
 * offered have been removed.
 */
const SettingForm = function () {
    const [simple, setSimple] = useState(true);
    const [background, setBackground] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setSimple(getSimpleTheme());
        setBackground(getThemeBackground());
    }, []);

    useEffect(() => {
        if (!saved) return undefined;
        const timer = setTimeout(() => setSaved(false), 2000);
        return () => clearTimeout(timer);
    }, [saved]);

    const onSimpleChange = (event) => {
        const enabled = event.target.checked;
        setSimple(enabled);
        setSimpleTheme(enabled);
        setSaved(true);
    };

    const onApplyBackground = () => {
        setThemeBackground(background.trim());
        setSaved(true);
    };

    const onClearBackground = () => {
        setBackground('');
        setThemeBackground('');
        setSaved(true);
    };

    // `formatMessage` is a hook (it reads the language context), so every message
    // is resolved unconditionally: calling one inside a conditional branch would
    // change the hook order between renders.
    const tSimpleTheme = formatMessage('tSimpleTheme');
    const tSimpleThemeDesc = formatMessage('tSimpleThemeDesc');
    const tCustomBackground = formatMessage('tCustomBackground');
    const tCustomBackgroundDesc = formatMessage('tCustomBackgroundDesc');
    const tBackgroundPlaceholder = formatMessage('tBackgroundPlaceholder');
    const tConfirm = formatMessage('tConfirm');
    const tClear = formatMessage('tClear');
    const tSaved = formatMessage('tSaved');

    return (
        <div className="setting-page">
            <section className="setting-card">
                <div className="setting-card-head">
                    <h2>{tSimpleTheme}</h2>
                    <Toggle
                        checked={simple}
                        aria-label={tSimpleTheme}
                        onChange={onSimpleChange}
                        icons={{
                            checked: <span className="setting-toggle-icon">≡</span>,
                            unchecked: <span className="setting-toggle-icon">▦</span>,
                        }}
                    />
                </div>
                <p className="setting-hint">{tSimpleThemeDesc}</p>
            </section>

            <section className="setting-card">
                <h2>{tCustomBackground}</h2>
                <p className="setting-hint">{tCustomBackgroundDesc}</p>
                <div className="setting-row">
                    <input
                        type="text"
                        className="setting-input"
                        value={background}
                        placeholder={tBackgroundPlaceholder}
                        onChange={(event) => setBackground(event.target.value)}
                    />
                    <button type="button" className="setting-primary" onClick={onApplyBackground}>
                        {tConfirm}
                    </button>
                    <button type="button" className="setting-ghost" onClick={onClearBackground}>
                        {tClear}
                    </button>
                </div>
                {saved && <p className="setting-saved">{tSaved}</p>}
            </section>
        </div>
    );
};

export default SettingForm;
