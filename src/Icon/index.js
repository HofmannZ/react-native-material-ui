/* eslint-disable import/no-unresolved, import/extensions */
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import React, { PureComponent, PropTypes } from 'react';
/* eslint-enable import/no-unresolved, import/extensions */

const propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    size: PropTypes.number,
    color: PropTypes.string,
};
const defaultProps = {
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { icon } = context.uiTheme;

    const local = {};

    return {
        icon: [
            icon.icon,
            local.icon,
            props.style.icon,
        ],
    };
}

class Icon extends PureComponent {
    render() {
        const { name, size, color } = this.props;
        const { palette, spacing } = this.context.uiTheme;

        const styles = getStyles(this.props, this.context);

        const iconColor = color || palette.secondaryTextColor;
        const iconSize = size || spacing.iconSize;

        return (
            <VectorIcon
                name={name}
                size={iconSize}
                color={iconColor}
                style={styles}
            />
        );
    }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
Icon.contextTypes = contextTypes;

export default Icon;
