import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import RippleFeedback from '../RippleFeedback';
import Icon from '../Icon';


const propTypes = {
    /**
    * Will be rendered above the label as a content of the action.
    */
    icon: PropTypes.string.isRequired,
    /**
    * Will be rendered under the icon as a content of the action.
    */
    label: PropTypes.string,
    /**
    * True if the action is active (for now it'll be highlight by primary color)
    */
    active: PropTypes.bool.isRequired,
    /**
    * Callback for on press event.
    */
    onPress: PropTypes.func,
    /**
    * Inline style of bottom navigation
    */
    style: PropTypes.shape({
        container: View.propTypes.style,
        active: Text.propTypes.style,
        disabled: Text.propTypes.style,
    }),

};
const defaultProps = {
    active: false,
    disabled: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { bottomNavigationAction, palette } = context.uiTheme;

    const local = {};

    if (props.active) {
        local.container = { paddingTop: 6 };
        local.icon = { color: palette.primaryColor };
        local.label = { color: palette.primaryColor, fontSize: 14 };
    }

    if (!props.label) {
        local.container = { paddingTop: 16, paddingBottom: 16 };
    }

    return {
        container: [
            bottomNavigationAction.container,
            local.container,
            props.style.container,
        ],
        icon: [
            bottomNavigationAction.icon,
            local.icon,
            props.style.icon,
        ],
        label: [
            bottomNavigationAction.label,
            local.label,
            props.style.label,
        ],
    };
}


class BottomNavigationAction extends PureComponent {
    render() {
        const { icon, label, onPress } = this.props;

        const styles = getStyles(this.props, this.context);
        const color = StyleSheet.flatten(styles.icon).color;

        return (
            <RippleFeedback onPress={onPress}>
                <View style={styles.container}>
                    <Icon name={icon} style={styles.icon} color={color} />
                    <Text style={styles.label}>{label}</Text>
                </View>
            </RippleFeedback>
        );
    }
}

BottomNavigationAction.propTypes = propTypes;
BottomNavigationAction.defaultProps = defaultProps;
BottomNavigationAction.contextTypes = contextTypes;

export default BottomNavigationAction;
