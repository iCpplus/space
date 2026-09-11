import React, { useEffect, useState } from 'react';

import { formatMessage } from 'utils/i18n';
import { getSimpleTheme, setSimpleTheme } from 'utils/simpleTheme';
import { getThemeBackground, setThemeBackground } from 'utils/themeBackground';

/**
 * Theme settings, rendered on its own page (`/setting/`).
 *
 * The list style is a two-option segmented control instead of a bare toggle: a
 * switch alone never says which side is "on", which made it impossible to tell
 * whether the compact ("极简风") list was active.
 *
 * The three preset backgrounds the old inline popup offered have been removed.
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

    const onSelectStyle = (enabled) => {
        if (enabled === simple) return;
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
    const tListStyle = formatMessage('tListStyle');
    const tListStyleDesc = formatMessage('tListStyleDesc');
    const tSimpleOption = formatMessage('tSimpleOption');
    const tSimpleOptionDesc = formatMessage('tSimpleOptionDesc');
    const tCardOption = formatMessage('tCardOption');
    const tCardOptionDesc = formatMessage('tCardOptionDesc');
    const tCurrentStyle = formatMessage(
        'tfCurrentStyle',
        simple ? tSimpleOption : tCardOption,
    );
    const tCustomBackground = formatMessage('tCustomBackground');
    const tCustomBackgroundDesc = formatMessage('tCustomBackgroundDesc');
    const tBackgroundPlaceholder = formatMessage('tBackgroundPlaceholder');
    const tConfirm = formatMessage('tConfirm');
    const tClear = formatMessage('tClear');
    const tSaved = formatMessage('tSaved');

    return (
        <div className="setting-page">
            <section className="setting-card">
                <h2>{tListStyle}</h2>
                <p className="setting-hint">{tListStyleDesc}</p>
                <div className="setting-options" role="radiogroup" aria-label={tListStyle}>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={simple}
                        className={`setting-option${simple ? ' setting-option-active' : ''}`}
                        onClick={() => onSelectStyle(true)}
                    >
                        <span className="setting-option-title">
                            {tSimpleOption}
                            <span className="setting-option-mark" aria-hidden="true">
                                {simple ? '✓' : ''}
                            </span>
                        </span>
                        <span className="setting-option-desc">{tSimpleOptionDesc}</span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={!simple}
                        className={`setting-option${simple ? '' : ' setting-option-active'}`}
                        onClick={() => onSelectStyle(false)}
                    >
                        <span className="setting-option-title">
                            {tCardOption}
                            <span className="setting-option-mark" aria-hidden="true">
                                {simple ? '' : '✓'}
                            </span>
                        </span>
                        <span className="setting-option-desc">{tCardOptionDesc}</span>
                    </button>
                </div>
                <p className="setting-current">{tCurrentStyle}</p>
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
