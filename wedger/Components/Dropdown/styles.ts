import { makeStyles } from '@rneui/themed';

const useStyles = makeStyles(() => ({
  dropdown: { borderRadius: 15 },
  container: { flexShrink: 1, padding: 0, margin: 0 },
  dropdownContainer: {
    backgroundColor: '#ECECEC',
    borderTopWidth: 0,
  },
  labelStyle: { paddingLeft: 5 },
}));

export default useStyles;
