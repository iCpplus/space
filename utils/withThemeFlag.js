import React from 'react';

/**
 * Theme subscription HOC, ported from the original `src/utils/withThemeFlag.js`.
 * The actual theme logic lives in `utils/themeOper.js` and is bootstrapped from
 * `pages/_document.js`.
 */
export default function withThemeFlag(BaseComponent) {
    class InjectTheme extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                theme: null,
            };
        }

        componentDidMount() {
            if (typeof window === 'undefined' || !window.__subOnThemeChange) return;
            this.setState({ theme: window.__theme });
            window.__subOnThemeChange(BaseComponent.name, () => {
                this.setState({ theme: window.__theme });
            });
        }

        componentWillUnmount() {
            if (typeof window === 'undefined' || !window.__unsubOnThemeChange) return;
            window.__unsubOnThemeChange(BaseComponent.name);
        }

        render() {
            const { theme } = this.state;
            const isLightTheme = theme == null ? null : theme === 'light';

            return <BaseComponent {...this.props} isLightTheme={isLightTheme} />;
        }
    }

    return InjectTheme;
}
