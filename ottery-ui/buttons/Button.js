


const styles = StyleSheet.create({
    button: {
        borderWidth: (props) => props.border, // React Native uses borderWidth for borders
        borderColor: (props)=>props.colors.primary.dark, // Specify the border color
        backgroundColor: (props)=>props.colors.primary.main,
        color: (props)=>props.colors.primary.contrastText,
        borderRadius: rad.default, // Use the desired radius value
        minHeight: clickable.minHeight,
        width: '100%',
        maxWidth: (props) => props.width || clickable.maxWidth,
        textTransform: 'uppercase',
    },
});

export function Button({
    color=colors.primary,
    radius=rad.default,
    type=BUTTON_TYPES.filled,
    children,
    width,
    height=clickable.minHeight,
    onClick,
    state="default"
}) {
    <Butt styles={styles.button}>
        {children}
    </Butt>
}